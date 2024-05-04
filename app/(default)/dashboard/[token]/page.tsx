"use client";

import WelcomeBanner from "../../welcome-banner";
import PresaleInfo from "@/components/presale-info";
import { fetchpresale } from "@/app/actions/presale";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { PresaleData } from "@/app/lib/definitions";

export default function Presale({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const token = params.token;
  const [presale, setPresale] = useState<PresaleData>();
  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchpresale(token);
      if (!success && message == "Preventa no encontrada") {
        toast.error(message);
      }
      if (success) {
        const presaleData: PresaleData = message as PresaleData;
        setPresale(presaleData);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Ayuda"
        subtitle="Gestiona las peticiones de ayuda de los usuarios:"
      />
      {presale && (
        <>
          <PresaleInfo presale={presale} />
        </>
      )}
    </div>
  );
}
