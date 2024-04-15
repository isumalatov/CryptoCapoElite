'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NotificationsPanel() {

  const [comments, setComments] = useState<boolean>(true)
  const [messages, setMessages] = useState<boolean>(true)
  const [mentions, setMentions] = useState<boolean>(false)

  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Mis Notificacines</h2>

        {/* General */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">General</h3>
          <ul>
            <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">Nuevas Preventas</div>
                <div className="text-sm">Recibe correos para mantenerte siempre informado sobre nuevas preventas.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{comments ? 'Si' : 'No'}</div>
                <div className="form-switch">
                  <input type="checkbox" id="comments" className="sr-only" checked={comments} onChange={() => setComments(!comments)} />
                  <label className="bg-slate-400 dark:bg-slate-700" htmlFor="comments">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">Compra Cancelada</div>
                <div className="text-sm">Te informaremos por correo si se ha cancelado la compra de un token.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{messages ? 'Si' : 'No'}</div>
                <div className="form-switch">
                  <input type="checkbox" id="messages" className="sr-only" checked={messages} onChange={() => setMessages(!messages)} />
                  <label className="bg-slate-400 dark:bg-slate-700" htmlFor="messages">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
                    <span className="sr-only">Enable smart sync</span>
                  </label>
                </div>
              </div>
            </li>
            <li className="flex justify-between items-center py-3">
              {/* Left */}
              <div>
                <div className="text-slate-800 dark:text-slate-100 font-semibold">Noticias Sobre CryptoCapoElite</div>
                <div className="text-sm">Recibe correos sobre cambios en CryptoCapoElite.</div>
              </div>
              {/* Right */}
              <div className="flex items-center ml-4">
                <div className="text-sm text-slate-400 dark:text-slate-500 italic mr-2">{mentions ? 'Si' : 'No'}</div>
                <div className="form-switch">
                  <input type="checkbox" id="mentions" className="sr-only" checked={mentions} onChange={() => setMentions(!mentions)} />
                  <label className="bg-slate-400 dark:bg-slate-700" htmlFor="mentions">
                    <span className="bg-white shadow-sm" aria-hidden="true"></span>
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
            <Link className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" href="/">Cancelar</Link>
            <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"href="/">Guardar cambios</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}