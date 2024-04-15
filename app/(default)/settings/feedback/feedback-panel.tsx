import Link from 'next/link'

export default function FeedbackPanel() {
  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">Danos tu opinión</h2>
          <div className="text-sm">¡Ayudanos a mejorar CryptoCapoElite con tu opinion!</div>
        </div>

        {/* Rate */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-6">¿Que puntuación general le das a la plataforma?</h3>
          <div className="w-full max-w-xl">
            <div className="relative">
              <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
              <ul className="relative flex justify-between w-full">
                <li className="flex">
                  <button className="w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500">
                    <span className="sr-only">1</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500">
                    <span className="sr-only">2</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-indigo-500">
                    <span className="sr-only">3</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500">
                    <span className="sr-only">4</span>
                  </button>
                </li>
                <li className="flex">
                  <button className="w-3 h-3 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500">
                    <span className="sr-only">5</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-full flex justify-between text-sm text-slate-500 dark:text-slate-400 italic mt-3">
              <div>1</div>
              <div>5</div>
            </div>
          </div>
        </section>

        {/* Tell us in words */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-5">Escribe tu opinión</h3>
          {/* Form */}
          <label className="sr-only" htmlFor="feedback">Escribe tu opinión</label>
          <textarea id="feedback" className="form-textarea w-full focus:border-slate-300" rows={4} placeholder="CryptoCapoElite me parece…"></textarea>
        </section>
      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <Link className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" href="/">Cancelar</Link>
            <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" href="/">Guardar Cambios</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}