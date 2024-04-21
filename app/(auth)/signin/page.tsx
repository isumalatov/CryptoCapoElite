"use client";

import Link from "next/link";
import AuthHeader from "../auth-header";
import AuthImage from "../auth-image";
import { signin } from "@/app/actions/auth";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [message, formAction] = useFormState(signin, null);
  useEffect(() => {
    if (message?.success === false) {
      toast.error(message.message);
    } else if (message?.success === true) {
      router.push("/dashboard");
    }
  }, [message]);

  return (
    <main className="bg-white dark:bg-slate-900">
      <ToastContainer />
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                ¡Bienvenido! ✨
              </h1>
              {/* Form */}
              <form action={formAction}>
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
                      name="email"
                      className="form-input w-full"
                      type="email"
                    />
                  </div>
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
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      href="/reset-password"
                    >
                      ¿Contraseña olvidada?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  ¿No tienes cuenta?{" "}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    href="/signup"
                  >
                    Registrarse
                  </Link>
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
