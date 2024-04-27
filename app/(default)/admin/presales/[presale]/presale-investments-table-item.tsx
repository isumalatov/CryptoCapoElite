import { InvestmentDataTable, InvestmentData } from "@/app/lib/definitions";
import ModalBasic from "@/components/modal-basic";
import { useState } from "react";

export default function PresaleInvestmentsTableItem({
  id,
  investment,
  onDelete,
  onUpdate,
}: {
  id: string;
  investment: InvestmentDataTable;
  onDelete: (id: string) => void;
  onUpdate: (id: string, investmentData: InvestmentData) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState("");
  const [presale, setPresale] = useState(id);
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [wallet, setWallet] = useState("");
  const [state, setState] = useState("");

  async function handleDeleteInvestment(id: string) {
    onDelete(id);
  }

  async function handleUpdateInvestment() {
    onUpdate(investment.id, { user, presale, amount, txid, wallet, state });
    setModalOpen(false);
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{investment.user}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <button
            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
            onClick={() => {
              setModalOpen(true);
              setUser(investment.user);
              setPresale(investment.presale);
              setAmount(investment.amount);
              setTxid(investment.txid);
              setWallet(investment.wallet);
              setState(investment.state);
            }}
          >
            <span className="sr-only">Editar</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
            </svg>
          </button>
          <button
            className="text-rose-500 hover:text-rose-600 rounded-full"
            onClick={() => handleDeleteInvestment(investment.id)}
          >
            <span className="sr-only">Borrar</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
            </svg>
          </button>
          <ModalBasic
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title="Editar Inversion"
          >
            {/* Modal content */}
            <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Editar Inversion 🙌
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="user"
                  >
                    Usuario <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="user"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    required
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="presale"
                  >
                    Preventa <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="presale"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    required
                    value={presale}
                    onChange={(e) => setPresale(e.target.value)}
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
                    type="text"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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
                  onClick={handleUpdateInvestment}
                >
                  Editar Inversion
                </button>
              </div>
            </div>
          </ModalBasic>
        </div>
      </td>
    </tr>
  );
}
