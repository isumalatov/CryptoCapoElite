"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../../welcome-banner";
import {
  fetchreferrals,
  createreferral,
  updatereferral,
  deletereferral,
} from "@/app/actions/referral";
import { ReferralData, ReferralDataCreate } from "@/app/lib/definitions";
import PayReferralsTable from "./pay-referrals-table";
import ModalBasic from "@/components/modal-basic";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import { toast } from "react-toastify";
import { set } from "mongoose";

function PayReferralsContent() {
  const [idUser, setIdUser] = useState("");
  const [amount, setAmount] = useState(0);
  const [wallet, setWallet] = useState("");
  const [referralCreated, setReferralCreated] = useState(0);
  const [referralUpdated, setReferralUpdated] = useState(0);
  const [referralDeleted, setReferralDeleted] = useState(0);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function fetchData() {
    try {
      const { success, message } = await fetchreferrals();
      if (success) {
        const referralsData: ReferralData[] = message as ReferralData[];
        setReferrals(referralsData);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [referralCreated, referralUpdated, referralDeleted]);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreateReferral() {
    try {
      const referralData: ReferralDataCreate = {
        idUser: idUser,
        amount: amount,
        wallet: wallet,
      };
      const { success, message } = await createreferral(referralData);
      if (success) {
        toast.success(message);
        setReferralCreated(referralCreated + 1);
        setModalOpen(false);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateReferral(
    id: string,
    referralData: ReferralDataCreate
  ) {
    try {
      const { success, message } = await updatereferral(id, referralData);
      if (success) {
        toast.success(message);
        setReferralUpdated(referralUpdated + 1);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al actualizar referido");
    }
  }

  async function handleDeleteReferral(id: string) {
    try {
      const { success, message } = await deletereferral(id);
      if (success) {
        toast.success(message);
        setReferralDeleted(referralDeleted + 1);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onGetExportPayReferrals = async (
    title?: string,
    worksheetname?: string
  ) => {
    try {
      if (referrals && Array.isArray(referrals)) {
        const dataToExport = referrals.map((referral: ReferralData) => ({
          ID: referral.id,
          idUser: referral.id,
          nameUser: referral.user.name,
          Cantidad: referral.amount,
          Wallet: referral.wallet,
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        toast.error("No hay datos para exportar");
      }
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="flex justify-end items-center mb-5">
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Create invoice button */}
          <button
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={() => setModalOpen(true)}
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Crear Inversion</span>
            <ModalBasic
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              title="Nueva Inversion"
            >
              {/* Modal content */}
              <div className="px-5 py-4">
                <div className="text-sm">
                  <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                    Crear Nueva Inversion 🙌
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="user"
                    >
                      ID Usuario <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="user"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={idUser}
                      onChange={(e) => setIdUser(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="amount"
                    >
                      Cantidad <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="amount"
                      className="form-input w-full px-2 py-1"
                      type="number"
                      required
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="wallet"
                    >
                      Wallet <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="wallet"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap justify-end space-x-2">
                  <button
                    className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={handleCreateReferral}
                  >
                    Crear Referido
                  </button>
                </div>
              </div>
            </ModalBasic>
          </button>
          <button
            onClick={() => onGetExportPayReferrals("Referidos", "Referidos")}
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <DownloadIcon />
            Descargar Pagos Referidos
          </button>
        </div>
      </div>
      {/* Table */}
      <PayReferralsTable
        referrals={referrals}
        onDeleteReferral={handleDeleteReferral}
        onUpdateReferral={handleUpdateReferral}
      />
    </div>
  );
}

export default function PayReferralsAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Referidos"
        subtitle="Gestiona los Referidos a pagar:"
      />
      <PayReferralsContent />
    </div>
  );
}
