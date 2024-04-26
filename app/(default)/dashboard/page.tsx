"use client";

import WelcomeBanner from "../welcome-banner";
import PresaleCard from "@/components/presale-card";
import { fetchpresales } from "@/app/actions/presale";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { PresaleDataTable } from "@/app/lib/definitions";

export default function Dashboard() {
  const [presales, setPresales] = useState<PresaleDataTable[]>([]);
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
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="¡Bienvenido a CryptoCapoElite! 👋"
        subtitle="Estas son todas las preventas disponibles:"
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto flex flex-wrap justify-center gap-24">
        {presales.map((presale) => (
          <PresaleCard presale={presale} />
        ))}
      </div>
    </div>
  );
}
