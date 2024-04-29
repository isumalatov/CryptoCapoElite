"use client";

import AuthHeader from "../../auth-header";
import AuthImage from "../../auth-image";
import { signin } from "@/app/actions/auth";
import { useFormState } from "react-dom";


export default function SignIn() {
  const [message, formAction] = useFormState(signin, null);

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                ¡Recupera tu cuenta! ✨
              </h1>
              {/* Form */}
              <form action={formAction}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      className="form-input w-full"
                      type="password"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="repeatpassword"
                    >
                      Repite Contraseña
                    </label>
                    <input
                      id="repeatpassword"
                      name="repeatpassword"
                      className="form-input w-full"
                      type="password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button
                    type="submit"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
