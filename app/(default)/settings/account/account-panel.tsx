"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchuser } from "@/app/actions/user";
import { changeprofile } from "@/app/actions/account";
import { changepassword } from "@/app/actions/auth";
import { ProfileFormData, ChangePasswordFormData } from "@/app/lib/definitions";
import ModalBasic from "@/components/modal-basic";
import { toast } from "react-toastify";

export default function AccountPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [referralwallet, setReferralWallet] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await fetchuser();
        if (success) {
          const { name, email, telegram, discord, referralwallet } =
            message as ProfileFormData;
          setName(name);
          setEmail(email);
          setTelegram(telegram);
          setDiscord(discord);
          setReferralWallet(referralwallet);
        } else {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  async function handleSaveChanges() {
    try {
      const profileData = {
        name,
        email,
        telegram,
        discord,
        referralwallet,
      };
      const { success, message } = await changeprofile(profileData);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleChangePassword() {
    try {
      const passwordData: ChangePasswordFormData = {
        oldpassword,
        password,
        repeatpassword,
      };
      const { success, message } = await changepassword(passwordData);
      if (success) {
        toast.success(message);
        setModalOpen(false);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grow">
      <ModalBasic
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title="Cambiar Contraseña"
      >
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="text-sm">
            <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
              Cambiar Contraseña 🙌
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="oldpassword"
              >
                Antigua Contraseña <span className="text-rose-500">*</span>
              </label>
              <input
                id="oldpassword"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Nueva Contraseña <span className="text-rose-500">*</span>
              </label>
              <input
                id="password"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="repeatpassword"
              >
                Repite Nueva Contraseña <span className="text-rose-500">*</span>
              </label>
              <input
                id="repeatpassword"
                className="form-input w-full px-2 py-1"
                type="text"
                required
                value={repeatpassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
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
              onClick={handleChangePassword}
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </ModalBasic>
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">
          Mi Perfil
        </h2>
        {/* Business Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Información{" "}
          </h2>
          <div className="text-sm">
            Edita la información de tu perfil de usuario.{" "}
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                className="form-input w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="telegram"
              >
                Telegram
              </label>
              <input
                id="telegram"
                className="form-input w-full"
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="discord"
              >
                Discord
              </label>
              <input
                id="discord"
                className="form-input w-full"
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>
          </div>
        </section>
        {/* Email */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Email
          </h2>
          <div className="text-sm">
            Cambia la dirrección email vinculada a la cuenta.
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>
        {/* Referral Wallet */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Billetera de Referido
          </h2>
          <div className="text-sm">
            ¡Cambia la dirreccion de la billetera donde recibirás las
            recompensas por referido!
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="referralwallet">
                Billetera de Referido
              </label>
              <input
                id="referralwallet"
                className="form-input"
                type="text"
                value={referralwallet}
                onChange={(e) => setReferralWallet(e.target.value)}
              />
            </div>
          </div>
        </section>
        {/* Password */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Contraseña
          </h2>
          <div className="text-sm">
            Cambia la contraseña vinculada a la cuenta.
          </div>
          <div className="mt-5">
            <button
              className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500"
              onClick={() => setModalOpen(true)}
            >
              Establecer nueva contraseña
            </button>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <Link
              className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
              href="/"
            >
              Cancelar
            </Link>
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
              onClick={handleSaveChanges}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
