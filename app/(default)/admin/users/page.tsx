"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../../welcome-banner";
import {
  fetchusers,
  createuser,
  updateuser,
  deleteuser,
} from "@/app/actions/user";
import {
  UserData,
  UserDataCreate,
  UserDataUpdate,
} from "@/app/lib/definitions";
import UsersTable from "./users-table";
import ModalBasic from "@/components/modal-basic";
import { toast } from "react-toastify";

function UsersContent() {
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [allowemailprev, setAllowEmailPrev] = useState(false);
  const [allowemailcancel, setAllowEmailCancel] = useState(false);
  const [allowemailnew, setAllowEmailNew] = useState(false);
  const [userId, setUserId] = useState("");
  const [userCreated, setUserCreated] = useState(0);
  const [userDeleted, setUserDeleted] = useState(0);
  const [userUpdated, setUserUpdated] = useState(0);
  const [users, setUsers] = useState<UserData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  async function fetchData() {
    try {
      const { success, message } = await fetchusers();
      if (success) {
        const usersData: UserData[] = message as UserData[];
        setUsers(usersData);
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
  }, [userCreated, userDeleted, userUpdated]);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreateUser() {
    try {
      const userData: UserDataCreate = {
        admin: admin,
        name: name,
        email: email,
        password: password,
        discord: discord,
        telegram: telegram,
        allowemailprev: allowemailprev,
        allowemailcancel: allowemailcancel,
        allowemailnew: allowemailnew,
        idUser: userId,
      };
      const { success, message } = await createuser(userData);
      if (success) {
        toast.success(message);
        setUserCreated(userCreated + 1);
        setModalOpen(false);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateUser(id: string, userDataUpdate: UserDataUpdate) {
    try {
      const { success, message } = await updateuser(id, userDataUpdate);
      if (success) {
        toast.success(message);
        setUserUpdated(userUpdated + 1);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteUser(id: string) {
    try {
      const { success, message } = await deleteuser(id);
      if (success) {
        toast.success(message);
        setUserDeleted(userDeleted + 1);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
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
            <span className="hidden xs:block ml-2">Crear Usuario</span>
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
                      htmlFor="password"
                    >
                      Contraseña <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="password"
                      className="form-input w-full px-2 py-1"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      onClick={handleCreateUser}
                    >
                      Crear Usuario
                    </button>
                  </div>
                </div>
              </div>
            </ModalBasic>
          </button>
        </div>
      </div>
      {/* Table */}
      <UsersTable
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default function UsersAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Usuarios"
        subtitle="Gestiona los usuarios de la plataforma:"
      />
      <UsersContent />
    </div>
  );
}
