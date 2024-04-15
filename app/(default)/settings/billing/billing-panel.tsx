import Link from 'next/link'

export default function BillingPanel() {
  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">Mis Compras</h2>
        </div>

        {/* Invoices */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Recibos</h3>
          {/* Table */}
          <table className="table-auto w-full dark:text-slate-400">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500">
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap">
                <th className="w-full block md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Fecha</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Titulo</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Cantidad</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-right"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm">
              {/* Row */}
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 dark:border-slate-700 py-2 md:py-0">
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-left font-medium text-slate-800 dark:text-slate-100">01/01/2024</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-left">Token</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-left font-medium">$349.00</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-right flex items-center md:justify-end">
                    <span className="block w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" aria-hidden="true"></span>
                    <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">PDF</a>
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap py-2 md:py-0">
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-left font-medium text-slate-800 dark:text-slate-100">01/01/2024</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-left">Token</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-left font-medium">$349.00</div>
                </td>
                <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                  <div className="text-right flex items-center md:justify-end">
                    <span className="block w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" aria-hidden="true"></span>
                    <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">PDF</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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