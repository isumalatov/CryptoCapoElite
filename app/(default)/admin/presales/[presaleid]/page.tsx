"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../../../welcome-banner";
import {
  fetchpresaleinvestments,
  createinvestment,
  deleteinvestment,
  updateinvestment,
} from "@/app/actions/investment";
import { InvestmentData, InvestmentDataCreate } from "@/app/lib/definitions";
import PresaleInvestmentsTable from "./presale-investments-table";
import ModalBasic from "@/components/modal-basic";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import { toast } from "react-toastify";

function PresaleInvestmentsContent({ id }: { id: string }) {
  const [idUser, setIdUser] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [txid, setTxid] = useState("");
  const [wallet, setWallet] = useState("");
  const [state, setState] = useState("");
  const [investmentCreated, setInvestmentCreated] = useState(0);
  const [investmentDeleted, setInvestmentDeleted] = useState(0);
  const [investmentUpdated, setInvestmentUpdated] = useState(0);
  const [investments, setInvestments] = useState<InvestmentData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchInvestmentsData() {
    try {
      const { success, message } = await fetchpresaleinvestments(id);
      if (success) {
        const investmentsData: InvestmentData[] = message as InvestmentData[];
        setInvestments(investmentsData);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchInvestmentsData();
  }, [investmentCreated, investmentDeleted, investmentUpdated]);

  useEffect(() => {
    fetchInvestmentsData();
  }, []);

  async function handleCreateInvestment() {
    try {
      const investmentData: InvestmentDataCreate = {
        idUser: idUser,
        idPresale: id,
        amount: amount,
        txid: txid,
        wallet: wallet,
        state: state,
      };
      const { success, message } = await createinvestment(investmentData);
      if (success) {
        toast.success(message);
        setModalOpen(false);
        setInvestmentCreated(investmentCreated + 1);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteInvestment(id: string) {
    try {
      const { success, message } = await deleteinvestment(id);
      if (success) {
        toast.success(message);
        setInvestmentDeleted(investmentDeleted + 1);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateInvestment(
    id: string,
    investmentData: InvestmentDataCreate
  ) {
    try {
      const { success, message } = await updateinvestment(id, investmentData);
      if (success) {
        toast.success(message);
        setInvestmentUpdated(investmentUpdated + 1);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const onGetExporInvestments = async (
    title?: string,
    worksheetname?: string
  ) => {
    try {
      if (investments && Array.isArray(investments)) {
        const dataToExport = investments.map((investment: InvestmentData) => ({
          id: investment.id,
          idUser: investment.user.id,
          userName: investment.user.name,
          amount: investment.amount,
          tokens: investment.tokens,
          txid: investment.txid,
          wallet: investment.wallet,
          state: investment.state,
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

  const onGetExporInvestmentsStateAccepted = async (
    title?: string,
    worksheetname?: string
  ) => {
    try {
      if (investments && Array.isArray(investments)) {
        const dataToExport = investments
          .filter(
            (investment: InvestmentData) => investment.state === "Aceptado"
          )
          .map((investment: InvestmentData) => ({
            id: investment.id,
            idUser: investment.user.id,
            userName: investment.user.name,
            amount: investment.amount,
            tokens: investment.tokens,
            txid: investment.txid,
            wallet: investment.wallet,
            state: investment.state,
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
                      htmlFor="txid"
                    >
                      TXID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="txid"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={txid}
                      onChange={(e) => setTxid(e.target.value)}
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
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="state"
                    >
                      Estado
                    </label>
                    <select
                      id="state"
                      className="form-select w-full px-2 py-1"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Selecciona un estado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aceptado">Aceptado</option>
                      <option value="Denegado">Denegado</option>
                    </select>
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
                    onClick={handleCreateInvestment}
                  >
                    Crear Inversion
                  </button>
                </div>
              </div>
            </ModalBasic>
          </button>
          <button
            onClick={() => onGetExporInvestments("Inversiones", "Inversiones")}
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <DownloadIcon />
            Descargar Inversiones
          </button>
          <button
            onClick={() =>
              onGetExporInvestmentsStateAccepted(
                "Inversiones Aceptadas",
                "Inversiones Aceptadas"
              )
            }
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <DownloadIcon />
            Descargar Inversiones Aceptadas
          </button>
        </div>
      </div>
      {/* Table */}
      <PresaleInvestmentsTable
        id={id}
        investments={investments}
        onDeleteInvestment={handleDeleteInvestment}
        onUpdateInvestment={handleUpdateInvestment}
      />
    </div>
  );
}

export default function PresaleInvestmentsAdmin({
  params,
  searchParams,
}: {
  params: { presaleid: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const presaleid = params.presaleid;
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Inversiones"
        subtitle="Gestiona las inversiones de esta preventa:"
      />
      <PresaleInvestmentsContent id={presaleid} />
    </div>
  );
}
