"use client";

import WelcomeBanner from "../../welcome-banner";
import { useEffect, useState } from "react";
import { fetchhelps, deletehelp } from "@/app/actions/help";
import { HelpDataTable } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import HelpsTable from "./helps-table";

function HelpsContent() {
  const [helps, setHelps] = useState<HelpDataTable[]>([]);
  const [noticeDeleted, setNoticeDeleted] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchhelps();
      if (!success && message == "Error al cargar preguntas") {
        toast.error(message);
      }
      if (success) {
        const helpsData: HelpDataTable[] = message as HelpDataTable[];
        setHelps(helpsData);
      }
    }
    fetchData();
  }, [noticeDeleted]);

  async function handleDeleteHelp(id: string) {
    const { success, message } = await deletehelp(id);
    if (!success) {
      toast.error(message);
    }
    if (success) {
      toast.success(message);
      setNoticeDeleted(noticeDeleted + 1);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Table */}
      <HelpsTable
        helps={helps}
        onDeleteHelp={handleDeleteHelp}
      />
    </div>
  );
}
export default function HelpsAdmin() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Ayuda"
        subtitle="Gestiona las peticiones de ayuda de los usuarios:"
      />
      <HelpsContent />
    </div>
  );
}
