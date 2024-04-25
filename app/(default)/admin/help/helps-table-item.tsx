import { HelpDataTable } from "@/app/lib/definitions";
import ModalBasic from "@/components/modal-basic";
import { useState } from "react";

export default function HelpsTableItem({
  help,
  onDelete,
}: {
  help: HelpDataTable;
  onDelete: (id: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleDeleteNotice(id: string) {
    onDelete(id);
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{help.user}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <button
            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <span className="sr-only">Ver</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M16 20c.3 0 .5-.1.7-.3l5.7-5.7-1.4-1.4-4 4V8h-2v8.6l-4-4L9.6 14l5.7 5.7c.2.2.4.3.7.3zM9 22h14v2H9z" />
            </svg>
          </button>
          <button
            className="text-rose-500 hover:text-rose-600 rounded-full"
            onClick={() => handleDeleteNotice(help.id)}
          >
            <span className="sr-only">Borrar</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
              <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
            </svg>
          </button>
          <ModalBasic
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title="Ver Pregunta"
          >
            {/* Modal content */}
            <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Ver Pregunta 🙌
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="block text-sm font-medium mb-1">Usuario</p>
                  <p className="font-medium text-sky-500">{help.user}</p>
                </div>
                <div>
                  <p className="block text-sm font-medium mb-1">Pregunta</p>
                  <div style={{ wordWrap: "break-word", width: "30em" }}>
                    <p className="font-medium text-sky-500">{help.help}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Visto
                </button>
              </div>
            </div>
          </ModalBasic>
        </div>
      </td>
    </tr>
  );
}
