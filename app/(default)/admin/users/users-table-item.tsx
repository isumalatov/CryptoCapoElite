import { useState } from "react";
import { UserData, UserDataUpdate } from "@/app/lib/definitions";
import ModalBasic from "@/components/modal-basic";

export default function NoticesTableItem({
  user,
  onDelete,
  onUpdate,
}: {
  user: UserData;
  onDelete: (id: string) => void;
  onUpdate: (id: string, userDataUpdate: UserDataUpdate) => void;
}) {
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [allowemailprev, setAllowEmailPrev] = useState(false);
  const [allowemailcancel, setAllowEmailCancel] = useState(false);
  const [allowemailnew, setAllowEmailNew] = useState(false);
  const [userId, setUserId] = useState("");
  const [referralwallet, setReferralWallet] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleDeleteUser(id: string) {
    onDelete(id);
  }

  function handleUpdateUser() {
    onUpdate(user.id, {
      admin,
      name,
      email,
      discord,
      telegram,
      allowemailprev,
      allowemailcancel,
      allowemailnew,
      idUser: userId,
      referralwallet,
    });
    setModalOpen(false);
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{user.id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{user.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">
          {user.telegram ? user.telegram : "Sin establecer"}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <button
            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
            onClick={() => {
              setModalOpen(true);
              setAdmin(user.admin);
              setName(user.name);
              setEmail(user.email);
              setDiscord(user.discord);
              setTelegram(user.telegram);
              setAllowEmailPrev(user.allowemailprev);
              setAllowEmailCancel(user.allowemailcancel);
              setAllowEmailNew(user.allowemailnew);
              setUserId(user.referral.id);
            }}
          >
            <span className="sr-only">Editar</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
            </svg>
          </button>
          <button
            className="text-rose-500 hover:text-rose-600 rounded-full"
            onClick={() => handleDeleteUser(user.id)}
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
            title="Nuevo Usuario"
          >
            {/* Modal content */}
            <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Crear Nueva Usuario 🙌
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="admin"
                  >
                    Administrador
                  </label>
                  <div className="form-switch">
                    <input
                      type="checkbox"
                      id="admin"
                      className="sr-only"
                      checked={admin}
                      onChange={() => setAdmin(!admin)}
                    />
                    <label
                      className="bg-slate-400 dark:bg-slate-700"
                      htmlFor="admin"
                    >
                      <span
                        className="bg-white shadow-sm"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Enable smart sync</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Nombre <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    className="form-input w-full px-2 py-1"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="discord"
                  >
                    Discord
                  </label>
                  <input
                    id="discord"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="telegram"
                  >
                    Telegram
                  </label>
                  <input
                    id="telegram"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                  />
                </div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="allowemailprev"
                >
                  Notificaciones de Preventa
                </label>
                <div className="form-switch">
                  <input
                    type="checkbox"
                    id="allowemailprev"
                    className="sr-only"
                    checked={allowemailprev}
                    onChange={() => setAllowEmailPrev(!allowemailprev)}
                  />
                  <label
                    className="bg-slate-400 dark:bg-slate-700"
                    htmlFor="allowemailprev"
                  >
                    <span
                      className="bg-white shadow-sm"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="allowemailcancel"
                  >
                    Notificaciones de Cancelación
                  </label>
                  <div className="form-switch">
                    <input
                      type="checkbox"
                      id="allowemailcancel"
                      className="sr-only"
                      checked={allowemailcancel}
                      onChange={() => setAllowEmailCancel(!allowemailcancel)}
                    />
                    <label
                      className="bg-slate-400 dark:bg-slate-700"
                      htmlFor="allowemailcancel"
                    >
                      <span
                        className="bg-white shadow-sm"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Enable smart sync</span>
                    </label>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="allowemailnew"
                    >
                      Notificaciones de Nueva Preventa
                    </label>
                    <div className="form-switch">
                      <input
                        type="checkbox"
                        id="allowemailnew"
                        className="sr-only"
                        checked={allowemailnew}
                        onChange={() => setAllowEmailNew(!allowemailnew)}
                      />
                      <label
                        className="bg-slate-400 dark:bg-slate-700"
                        htmlFor="allowemailnew"
                      >
                        <span
                          className="bg-white shadow-sm"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Enable smart sync</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="userId"
                    >
                      ID Usuario Referido
                    </label>
                    <input
                      id="userId"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="referralwallet"
                    >
                      Billetera de referido
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="referralwallet"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={referralwallet}
                      onChange={(e) => setReferralWallet(e.target.value)}
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
                    onClick={handleUpdateUser}
                  >
                    Editar Usuario
                  </button>
                </div>
              </div>
            </div>
          </ModalBasic>
        </div>
      </td>
    </tr>
  );
}
