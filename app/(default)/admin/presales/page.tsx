"use client";

import WelcomeBanner from "../../welcome-banner";
import { useEffect, useState, useRef } from "react";
import {
  fetchpresales,
  createpresale,
  updatepresale,
  deletepresale,
  uploadImage,
} from "@/app/actions/presale";
import { PresaleDataTable, PresaleData } from "@/app/lib/definitions";
import PresalesTable from "./presales-table";
import ModalBasic from "@/components/modal-basic";
import { toast } from "react-toastify";
import { error } from "console";

function PresalesContent() {
  const [presaleCreated, setPresaleCreated] = useState(0);
  const [presaleDeleted, setPresaleDeleted] = useState(0);
  const [presaleUpdated, setPresaleUpdated] = useState(0);
  const [presales, setPresales] = useState<PresaleDataTable[]>([]);
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
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchpresales();
      if (!success && message == "Error al cargar preventas") {
        toast.error(message);
      }
      if (success) {
        const presalesData: PresaleDataTable[] = message as PresaleDataTable[];
        setPresales(presalesData);
      }
    }
    fetchData();
  }, [presaleCreated, presaleDeleted, presaleUpdated]);

  async function handleCreatePresale() {
    try {
      if (!inputFileRef.current?.files) {
        throw new Error("Selecciona una imagen");
      }

      const image = inputFileRef.current.files[0];
      const formData = new FormData();
      formData.append("image", image);

      const result = await uploadImage(formData);

      if (!result.success && result.message == "Error al subir imagen") {
        throw new Error(result.message);
      }

      if (result.success) {
        const imageName = (
          result.message as { imageName: string; imageUrl: string }
        ).imageName;
        const imageUrl = (
          result.message as { imageName: string; imageUrl: string }
        ).imageUrl;
        const presaleData: PresaleData = {
          title,
          description,
          imagename: imageName,
          imageurl: imageUrl,
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
        };

        const { success, message } = await createpresale(presaleData);
        if (!success && message == "Error al crear preventa") {
          throw new Error(message);
        }
        if (success) {
          toast.success(message);
          setModalOpen(false);
          setPresaleCreated(presaleCreated + 1);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }

  async function handleDeletePresale(id: string) {
    const { success, message } = await deletepresale(id);
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success(message);
      setPresaleDeleted(presaleDeleted + 1);
    }
  }

  async function handleUpdatePresale(id: string, presaleData: PresaleData) {
    try {
      const { success, message } = await updatepresale(id, presaleData);
      if (!success) {
        throw new Error(message);
      }
      if (success) {
        toast.success(message);
        setPresaleUpdated(presaleUpdated + 1);
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="flex justify-end items-center mb-5">
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Create invoice button */}
          <button
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={() => setModalOpen(true)}
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Crear Preventa</span>
            <ModalBasic
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              title="Nueva Preventa"
            >
              {/* Modal content */}
              <div className="px-5 py-4">
                <div className="text-sm">
                  <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                    Crear Nueva Preventa 🙌
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
                    <input
                      id="image"
                      name="image"
                      ref={inputFileRef}
                      type="file"
                    />
                  </div>
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
                      onClick={handleCreatePresale}
                    >
                      Crear Preventa
                    </button>
                  </div>
                </div>
              </div>
            </ModalBasic>
          </button>
        </div>
      </div>
      {/* Table */}
      <PresalesTable
        presales={presales}
        onDeletePresale={handleDeletePresale}
        onUpdatePresale={handleUpdatePresale}
      />
    </div>
  );
}

export default function PresalesAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Preventas"
        subtitle="Gestiona las preventas:"
      />
      <PresalesContent />
    </div>
  );
}
