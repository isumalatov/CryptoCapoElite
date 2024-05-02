"use client";

import AuthHeader from "../auth-header";
import AuthImage from "../auth-image";
import { useState } from "react";
import { sendemail } from "@/app/actions/email";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  async function handleSendEmail() {
    const { success, message } = await sendemail(email);
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success("¡Email enviado correctamente!");
    }
  }

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                Restablece tu contraseña ✨
              </h1>
              {/* Form */}
              <div>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                    onClick={handleSendEmail}
                  >
                    Enviar link de restablecimiento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
