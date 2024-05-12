"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../welcome-banner";
import { fetchpresales } from "@/app/actions/presale";
import { PresaleData } from "@/app/lib/definitions";
import PresaleCard from "@/components/presale-card";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [presales, setPresales] = useState<PresaleData[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await fetchpresales();
        if (success) {
          const presalesData: PresaleData[] = message as PresaleData[];
          setPresales(presalesData);
        }
        if (!success) {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
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
          <PresaleCard key={presale.id} presale={presale} />
        ))}
      </div>
    </div>
  );
}
