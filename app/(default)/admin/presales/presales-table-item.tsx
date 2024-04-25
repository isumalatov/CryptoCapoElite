import { PresaleDataTable, PresaleData } from "@/app/lib/definitions";
import ModalBasic from "@/components/modal-basic";
import { useState } from "react";

export default function NoticesTableItem({
  presale,
  onDelete,
  onUpdate,
}: {
  presale: PresaleDataTable;
  onDelete: (id: string) => void;
  onUpdate: (id: string, presaleData: PresaleData) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [round, setRound] = useState("");
  const [price, setPrice] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [vesting, setVesting] = useState("");
  const [url, setUrl] = useState("");
  const [urltelegram, setUrlTelegram] = useState("");
  const [urltwitter, setUrlTwitter] = useState("");
  const [urldocs, setUrlDocs] = useState("");

  function handleDeletePresale(id: string) {
    onDelete(id);
  }

  function handleUpdatePresale() {
    onUpdate(presale.id, {
      title,
      description,
      state,
      round,
      price,
      min,
      max,
      vesting,
      url,
      urltelegram,
      urltwitter,
      urldocs,
    });
    setModalOpen(false);
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{presale.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <button
            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
            onClick={() => {
              setModalOpen(true);
              setTitle(presale.title);
              setDescription(presale.description);
              setState(presale.state);
              setRound(presale.round);
              setPrice(presale.price);
              setMin(presale.min);
              setMax(presale.max);
              setVesting(presale.vesting);
              setUrl(presale.url);
              setUrlTelegram(presale.urltelegram);
              setUrlTwitter(presale.urltwitter);
              setUrlDocs(presale.urldocs);
            }}
          >
            <span className="sr-only">Editar</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
            </svg>
          </button>
          <button
            className="text-rose-500 hover:text-rose-600 rounded-full"
            onClick={() => handleDeletePresale(presale.id)}
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
            title="Editar Preventa"
          >
            {/* Modal content */}
            <div className="px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                  Editar Preventa 🙌
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="title"
                  >
                    Titulo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="title"
                    className="form-input w-full px-2 py-1"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="description"
                  >
                    Descripción <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    className="form-textarea w-full px-2 py-1"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="state"
                    >
                      Estado <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="state"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="round"
                    >
                      Ronda <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="round"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={round}
                      onChange={(e) => setRound(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="price"
                    >
                      Precio <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="price"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="min"
                    >
                      Minimo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="min"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="max"
                    >
                      Maximo <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="max"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="vesting"
                    >
                      Vesting <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="vesting"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={vesting}
                      onChange={(e) => setVesting(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="url"
                    >
                      URL <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="url"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="urltelegram"
                    >
                      URL Telegram <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="urltelegram"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={urltelegram}
                      onChange={(e) => setUrlTelegram(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="urltwitter"
                    >
                      URL Twitter <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="urltwitter"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={urltwitter}
                      onChange={(e) => setUrlTwitter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="urldocs"
                    >
                      URL Docs <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="urldocs"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={urldocs}
                      onChange={(e) => setUrlDocs(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={handleUpdatePresale}
                >
                  Editar Preventa
                </button>
              </div>
            </div>
          </ModalBasic>
        </div>
      </td>
    </tr>
  );
}