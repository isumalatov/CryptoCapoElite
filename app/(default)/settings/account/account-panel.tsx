"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountImage from "@/public/images/user-avatar-80.png";
import { fetchprofile, changeprofile } from "@/app/actions/account";
import { ProfileFormData } from "@/app/lib/definitions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchprofile();
      if (!success && message === "Error al cargar datos del usuario") {
        toast.error("Error al cargar datos del usuario");
      }
      if (success) {
        const { name, email, telegram, discord } = message as ProfileFormData;
        setName(name);
        setEmail(email);
        setTelegram(telegram);
        setDiscord(discord);
      }
    }
    fetchData();
  }, []);

  async function handleSaveChanges() {
    const profileData = {
      name,
      email,
      telegram,
      discord,
    };
    const { success, message } = await changeprofile(profileData);
    if (!success && message === "Error al modificar datos del usuario") {
      toast.error("Error al modificar datos del usuario");
    }
    if (success) {
      toast.success("Perfil actualizado");
    }
  }

  return (
    <div className="grow">
      <ToastContainer />
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
                htmlFor="business-id"
              >
                Telegram
              </label>
              <input
                id="business-id"
                className="form-input w-full"
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>
            <div className="sm:w-1/3">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="location"
              >
                Discord
              </label>
              <input
                id="location"
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
        {/* Password */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Contraseña
          </h2>
          <div className="text-sm">
            Cambia la contraseña vinculada a la cuenta.
          </div>
          <div className="mt-5">
            <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">
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
