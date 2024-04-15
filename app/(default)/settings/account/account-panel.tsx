'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AccountImage from '@/public/images/user-avatar-80.png'

export default function AccountPanel() {

  const [sync, setSync] = useState<boolean>(false)

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Mi cuenta</h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <Image className="w-20 h-20 rounded-full" src={AccountImage} width={80} height={80} alt="User upload" />
            </div>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Change</button>
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Perfil </h2>
          <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
              <input id="name" className="form-input w-full" type="text" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">Telegram</label>
              <input id="business-id" className="form-input w-full" type="text" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">Discord</label>
              <input id="location" className="form-input w-full" type="text" />
            </div>
          </div>
        </section>
        {/* Email */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Email</h2>
          <div className="text-sm">Cambia la dirrección email vinculada a la cuenta.</div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" className="form-input" type="email" />
            </div>
            <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">Cambiar</button>
          </div>
        </section>
        {/* Password */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Contraseña</h2>
          <div className="text-sm">Cambia la contraseña vinculada a la cuenta.</div>
          <div className="mt-5">
            <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500">Establecer nueva contraseña</button>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <Link className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" href="/">Cancelar</Link>
            <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" href="/">Guardar cambios</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}