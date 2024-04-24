"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchnotifications, changenotifications } from "@/app/actions/account";
import { NotificationFormData } from "@/app/lib/definitions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationsPanel() {
  const [allowemailprev, setAllowEmailPrev] = useState<boolean>(true);
  const [allowemailcancel, setAllowEmailCancel] = useState<boolean>(true);
  const [allowemailnew, setAllowEmailNew] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchnotifications();
      if (!success && message === "Error al cargar notificaciones") {
        toast.error("Error al cargar notificaciones");
      }
      if (success) {
        const { allowemailprev, allowemailcancel, allowemailnew } =
          message as NotificationFormData;
        setAllowEmailPrev(allowemailprev);
        setAllowEmailCancel(allowemailcancel);
        setAllowEmailNew(allowemailnew);
      }
    }
    fetchData();
  }, []);

  async function handleSaveChanges() {
    const notificationData = {
      allowemailprev,
      allowemailcancel,
      allowemailnew,
    };
    const { success, message } = await changenotifications(notificationData);
    if (!success && message === "Error al modificar notificaciones") {
      toast.error("Error al modificar notificaciones");
    }
    if (success) {
      toast.success("Notificaciones actualizadas");
    }
  }

  return (
    <div className="grow">
      <ToastContainer />
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">
          Mis Notificaciones
        </h2>

        {/* General */}
        <section>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">
                  Nuevas Preventas
                </div>
                <div className="text-sm">
                  Recibe notificationes para mantenerte siempre informado sobre
                  nuevas preventas.
                </div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">
                  {allowemailprev ? "Si" : "No"}
                </div>
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
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">
                  Compra Cancelada
                </div>
                <div className="text-sm">
                  Te informaremos si se ha cancelado la compra de un token.
                </div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">
                  {allowemailcancel ? "Si" : "No"}
                </div>
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
              </div>
            </li>
            <li className="flex justify-between items-center py-3">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">
                  Noticias Sobre CryptoCapoElite
                </div>
                <div className="text-sm">
                  Recibe notificationes sobre cambios en CryptoCapoElite.
                </div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">
                  {allowemailnew ? "Si" : "No"}
                </div>
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
            </li>
          </ul>
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
