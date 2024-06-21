import { useState, useRef } from "react";
import { PresaleData, PresaleDataCreate } from "@/app/lib/definitions";
import { deleteImage, uploadImage } from "@/app/actions/presale";
import ModalBasic from "@/components/modal-basic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

export default function PresalesTableItem({
  presale,
  onDelete,
  onUpdate,
}: {
  presale: PresaleData;
  onDelete: (id: string) => void;
  onUpdate: (id: string, presaleData: PresaleDataCreate) => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [wallet, setWallet] = useState("");
  const [imagename, setImageName] = useState("");
  const [imageurl, setImageUrl] = useState("");
  const [state, setState] = useState("");
  const [round, setRound] = useState("");
  const [price, setPrice] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [vesting, setVesting] = useState("");
  const [tokenstandard, setTokenStandard] = useState("");
  const [fees, setFees] = useState("");
  const [url, setUrl] = useState("");
  const [urltelegram, setUrlTelegram] = useState("");
  const [urltwitter, setUrlTwitter] = useState("");
  const [urldocs, setUrlDocs] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function handleDeletePresale(id: string) {
    try {
      const result = await deleteImage(presale.imagename);
      if (result.success) {
        onDelete(id);
      }
      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }

  async function handleUpdatePresale() {
    try {
      if (
        inputFileRef.current?.files &&
        inputFileRef.current.files.length > 0
      ) {
        const image = inputFileRef.current.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const result = await uploadImage(formData);

        if (!result.success && result.message == "Error al subir imagen") {
          throw new Error(result.message);
        }
        if (result.success) {
          const result2 = await deleteImage(imagename);
          if (!result2.success && result2.message == "Error al borrar imagen") {
            throw new Error(result2.message);
          }
          if (result2.success) {
            const newImageName = (
              result.message as { imageName: string; imageUrl: string }
            ).imageName;
            const newImageUrl = (
              result.message as { imageName: string; imageUrl: string }
            ).imageUrl;
            onUpdate(presale.id, {
              title,
              name,
              description,
              wallet,
              imagename: newImageName,
              imageurl: newImageUrl,
              state,
              round,
              price: Number(price),
              min: Number(min),
              max: Number(max),
              vesting,
              tokenstandard,
              fees: Number(fees),
              url,
              urltelegram,
              urltwitter,
              urldocs,
            });
          }
        }
      } else {
        onUpdate(presale.id, {
          title,
          name,
          description,
          wallet,
          imagename,
          imageurl,
          state,
          round,
          price: Number(price),
          min: Number(min),
          max: Number(max),
          vesting,
          tokenstandard,
          fees: Number(fees),
          url,
          urltelegram,
          urltwitter,
          urldocs,
        });
      }
      setModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{presale.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-medium text-sky-500">{presale.state}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <button
            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
            onClick={() => router.push(`/admin/presales/${presale.id}`)}
          >
            <span className="sr-only">Ver</span>
            <svg
              className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 mb-[7px] mr-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
          <button
            className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full"
            onClick={() => {
              setModalOpen(true);
              setTitle(presale.title);
              setName(presale.name);
              setDescription(presale.description);
              setWallet(presale.wallet);
              setImageName(presale.imagename);
              setImageUrl(presale.imageurl);
              setState(presale.state);
              setRound(presale.round);
              setPrice(presale.price.toString());
              setMin(presale.min.toString());
              setMax(presale.max.toString());
              setVesting(presale.vesting);
              setTokenStandard(presale.tokenstandard);
              setFees(presale.fees.toString());
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
                    htmlFor="image"
                  >
                    Imagen <span className="text-rose-500">*</span>
                  </label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {imagename}
                  </p>
                  <input
                    id="image"
                    name="image"
                    ref={inputFileRef}
                    type="file"
                  />
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
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="description"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      className="form-textarea w-full px-2 py-1"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="wallet"
                    >
                      Wallet
                    </label>
                    <input
                      id="wallet"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="state"
                    >
                      Estado
                    </label>
                    <select
                      id="state"
                      className="form-select w-full px-2 py-1"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Selecciona un estado</option>
                      <option value="Participar">Participar</option>
                      <option value="Deal Completado">Deal Completado</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="round"
                    >
                      Ronda
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
                      Vesting
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
                      htmlFor="tokenstandard"
                    >
                      Token Standard
                    </label>
                    <input
                      id="tokenstandard"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={tokenstandard}
                      onChange={(e) => setTokenStandard(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="fees"
                    >
                      Fees <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="fees"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="url"
                    >
                      URL
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
                      URL Telegram
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
                      URL Twitter
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
                      URL Docs
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
