"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../../welcome-banner";
import { fetchhelps, deletehelp } from "@/app/actions/help";
import { HelpData } from "@/app/lib/definitions";
import HelpsTable from "./helps-table";
import { toast } from "react-toastify";

function HelpsContent() {
  const [helps, setHelps] = useState<HelpData[]>([]);
  const [noticeDeleted, setNoticeDeleted] = useState(0);

  async function fetchData() {
    try {
      const { success, message } = await fetchhelps();
      if (success) {
        const helpsData: HelpData[] = message as HelpData[];
        setHelps(helpsData);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [noticeDeleted]);

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDeleteHelp(id: string) {
    try {
      const { success, message } = await deletehelp(id);
      if (success) {
        toast.success(message);
        setNoticeDeleted(noticeDeleted + 1);
      }
      if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Table */}
      <HelpsTable helps={helps} onDeleteHelp={handleDeleteHelp} />
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
