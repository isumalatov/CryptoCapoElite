"use client";

import { useState } from "react";
import Link from "next/link";
import { createhelp } from "@/app/actions/help";
import { toast } from "react-toastify";

export default function HelpPanel() {
  const [help, setHelp] = useState<string>("");

  async function handleSaveChanges() {
    try {
      const helpData = {
        help,
      };
      const { success, message } = await createhelp(helpData);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">
            ¿Necesitas Ayuda?
          </h2>
          <div className="text-sm">
            ¡Si tienes alguna pregunta o necesitas ayuda, no dudes en
            preguntarnos! Te contestaremos lo antes posible mediante correo,
            telegram o discord.
          </div>
        </div>

        {/* Tell us in words */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-5">
            Escribenos tu pregunta
          </h3>
          {/* Form */}
          <label className="sr-only" htmlFor="help">
            Escribenos tu pregunta
          </label>
          <textarea
            id="help"
            className="form-textarea w-full focus:border-slate-300"
            rows={4}
            placeholder="En CryptoCapoElite, al acceder a…"
            value={help}
            onChange={(e) => setHelp(e.target.value)}
          ></textarea>
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
              Enviar Pregunta
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
