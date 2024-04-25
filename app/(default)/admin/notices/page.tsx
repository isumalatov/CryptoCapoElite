"use client";

import WelcomeBanner from "../../welcome-banner";
import { useEffect, useState } from "react";
import {
  fetchnotices,
  createnotice,
  deletenotice,
  updatenotice,
} from "@/app/actions/notice";
import { NoticeDataTable, NoticeData } from "@/app/lib/definitions";
import NoticesTable from "./notices-table";
import ModalBasic from "@/components/modal-basic";
import { toast } from "react-toastify";

function NoticesContent() {
  const [noticeCreated, setNoticeCreated] = useState(0);
  const [noticeDeleted, setNoticeDeleted] = useState(0);
  const [noticeUpdated, setNoticeUpdated] = useState(0);
  const [notices, setNotices] = useState<NoticeDataTable[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchnotices();
      if (!success && message == "Error al cargar noticias") {
        toast.error(message);
      }
      if (success) {
        const noticesData: NoticeDataTable[] = message as NoticeDataTable[];
        setNotices(noticesData);
      }
    }
    fetchData();
  }, [noticeCreated, noticeDeleted, noticeUpdated]);

  async function handleCreateNotice() {
    const noticeData: NoticeData = {
      title: title,
      content: content,
    };
    const { success, message } = await createnotice(noticeData);
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success(message);
      setModalOpen(false);
      setNoticeCreated(noticeCreated + 1);
    }
  }

  async function handleDeleteNotice(id: string) {
    const { success, message } = await deletenotice(id);
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success(message);
      setNoticeDeleted(noticeDeleted + 1);
    }
  }

  async function handleUpdateNotice(id: string, noticeData: NoticeData) {
    const { success, message } = await updatenotice(id, noticeData);
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success(message);
      setNoticeUpdated(noticeUpdated + 1);
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
            <span className="hidden xs:block ml-2">Crear Noticia</span>
            <ModalBasic
              isOpen={modalOpen}
              setIsOpen={setModalOpen}
              title="Nueva Noticia"
            >
              {/* Modal content */}
              <div className="px-5 py-4">
                <div className="text-sm">
                  <div className="font-medium text-slate-800 dark:text-slate-100 mb-3">
                    Crear Nueva Noticia 🙌
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
                      htmlFor="content"
                    >
                      Contenido <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="content"
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                    onClick={handleCreateNotice}
                  >
                    Crear Noticia
                  </button>
                </div>
              </div>
            </ModalBasic>
          </button>
        </div>
      </div>
      {/* Table */}
      <NoticesTable notices={notices} onDeleteNotice={handleDeleteNotice} onUpdateNotice={handleUpdateNotice} />
    </div>
  );
}

export default function NoticesAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Noticias"
        subtitle="Gestiona las noticias a mostrar a los usuarios:"
      />
      <NoticesContent />
    </div>
  );
}
