"use client";

import { useState } from "react";
import Link from "next/link";
import { createfeedback } from "@/app/actions/account";
import { FeedbackFormData } from "@/app/lib/definitions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackPanel() {
  const [score, setScore] = useState<number>(5);
  const [opinion, setOpinion] = useState<string>("");

  async function handleSaveChanges() {
    const feedbackData = {
      score,
      opinion,
    };
    const { success, message } = await createfeedback(feedbackData);
    if (!success && message === "Error al enviar feedback") {
      toast.error("Error al enviar feedback");
    }
    if (success) {
      toast.success("Feedback enviado");
    }
  }

  return (
    <div className="grow">
      <ToastContainer />
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">
            Danos tu opinión
          </h2>
          <div className="text-sm">
            ¡Ayudanos a mejorar CryptoCapoElite con tu opinion!
          </div>
        </div>

        {/* Rate */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-6">
            ¿Que puntuación general le das a la plataforma?
          </h3>
          <div className="w-full max-w-xl">
            <div className="relative">
              <div
                className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200 dark:bg-slate-700"
                aria-hidden="true"
              ></div>
              <ul className="relative flex justify-between w-full">
                <li className="flex">
                  <button
                    className={`w-3 h-3 rounded-full ${
                      score === 1
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500"
                    }`}
                    onClick={() => setScore(1)}
                  >
                    <span className="sr-only">1</span>
                  </button>
                </li>
                <li className="flex">
                  <button
                    className={`w-3 h-3 rounded-full ${
                      score === 2
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500"
                    }`}
                    onClick={() => setScore(2)}
                  >
                    <span className="sr-only">2</span>
                  </button>
                </li>
                <li className="flex">
                  <button
                    className={`w-3 h-3 rounded-full ${
                      score === 3
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500"
                    }`}
                    onClick={() => setScore(3)}
                  >
                    <span className="sr-only">3</span>
                  </button>
                </li>
                <li className="flex">
                  <button
                    className={`w-3 h-3 rounded-full ${
                      score === 4
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500"
                    }`}
                    onClick={() => setScore(4)}
                  >
                    <span className="sr-only">4</span>
                  </button>
                </li>
                <li className="flex">
                  <button
                    className={`w-3 h-3 rounded-full ${
                      score === 5
                        ? "bg-indigo-500 border-indigo-500"
                        : "bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500"
                    }`}
                    onClick={() => setScore(5)}
                  >
                    <span className="sr-only">5</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-full flex justify-between text-sm text-slate-500 dark:text-slate-400 italic mt-3">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </div>
        </section>

        {/* Tell us in words */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-5">
            Escribe tu opinión
          </h3>
          {/* Form */}
          <label className="sr-only" htmlFor="feedback">
            Escribe tu opinión
          </label>
          <textarea
            id="feedback"
            className="form-textarea w-full focus:border-slate-300"
            rows={4}
            placeholder="CryptoCapoElite me parece…"
            value={opinion}
            onChange={(e) => setOpinion(e.target.value)}
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
              Enviar FeedBack
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
