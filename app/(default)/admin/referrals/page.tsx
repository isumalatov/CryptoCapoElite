"use client";

import WelcomeBanner from "../../welcome-banner";
import { useEffect, useState } from "react";
import { ReferralDataTable, ReferralDataCreate } from "@/app/lib/definitions";
import {
  fetchreferrals,
  createreferral,
  updatereferral,
  deletereferral,
} from "@/app/actions/referral";
import ModalBasic from "@/components/modal-basic";
import { toast } from "react-toastify";
import ReferralsTable from "./referrals-table";

function ReferralsContent() {
  const [referrals, setReferrals] = useState<ReferralDataTable[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [referralCreated, setReferralCreated] = useState(0);
  const [referralUpdated, setReferralUpdated] = useState(0);
  const [referralDeleted, setReferralDeleted] = useState(0);
  const [idUser, setIdUser] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchreferrals();
      if (!success && message == "Error al cargar datos de los referidos") {
        toast.error(message);
        return;
      }
      if (success) {
        const referralsData: ReferralDataTable[] =
          message as ReferralDataTable[];
        setReferrals(referralsData);
      }
    }
    fetchData();
  }, [referralCreated, referralUpdated, referralDeleted]);

  async function handleCreateReferral() {
    try {
      const referralData: ReferralDataCreate = {
        idUser: idUser,
        amount: amount,
      };
      const { success, message } = await createreferral(referralData);
      if (!success && message == "Error al crear referido") {
        throw new Error(message);
      }
      if (success) {
        toast.success("Referido creado");
        setModalOpen(false);
        setReferralCreated(referralCreated + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al crear referido");
    }
  }

  async function handleUpdateReferral(
    id: string,
    referralData: ReferralDataCreate
  ) {
    try {
      const { success, message } = await updatereferral(id, referralData);
      if (!success && message == "Error al actualizar referido") {
        throw new Error(message);
      }
      if (success) {
        toast.success("Referido actualizado");
        setReferralUpdated(referralUpdated + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al actualizar referido");
    }
  }

  async function handleDeleteReferral(id: string) {
    try {
      const { success, message } = await deletereferral(id);
      if (!success && message == "Error al eliminar referido") {
        throw new Error(message);
      }
      if (success) {
        toast.success("Referido eliminado");
        setReferralDeleted(referralDeleted + 1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al eliminar referido");
    }
  }
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
        </div>
      </div>
      {/* Table */}
      <ReferralsTable
        referrals={referrals}
        onDeleteReferral={handleDeleteReferral}
        onUpdateReferral={handleUpdateReferral}
      />
    </div>
  );
}

export default function ReferralsAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Referidos"
        subtitle="Gestiona los Referidos a pagar"
      />
      <ReferralsContent />
    </div>
  );
}
