"use client";

import Link from "next/link";
import AuthHeader from "../../auth-header";
import AuthImage from "../../auth-image";
import { signupreferral } from "@/app/actions/auth";
import { useState } from "react";
import { SignUpReferralFormData } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp({
  params,
  searchParams,
}: {
  params: { userid: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [allowemail, setAllowEmail] = useState(false);

  async function handleSignUpReferral() {
    try {
      const signupreferralData: SignUpReferralFormData = {
        email,
        name,
        password,
        repeatpassword,
        allowemail,
        idUser: params.userid,
      };
      const { success, message } = await signupreferral(signupreferralData);
      if (!success) {
        toast.error(message);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error((error as Error).message);
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
                ¡Crea tu cuenta! ✨
              </h1>
              {/* Form */}
              <form action={handleSignUpReferral}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      className="form-input w-full"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="repeatpassword"
                    >
                      Repetir Contraseña
                    </label>
                    <input
                      id="repeatpassword"
                      name="repeatpassword"
                      className="form-input w-full"
                      type="password"
                      value={repeatpassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        id="allowemail"
                        name="allowemail"
                        checked={allowemail}
                        onChange={(e) => setAllowEmail(e.target.checked)}
                      />
                      <span className="text-sm ml-2">
                        Avisame de novedades por correo
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                  >
                    Registrarse
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    href="/signin"
                  >
                    Iniciar Sesión
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
