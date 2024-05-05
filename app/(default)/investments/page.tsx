"use client";

import WelcomeBanner from "../welcome-banner";
import { useEffect, useState } from "react";
import {
  fetchuserinvestments,
  getusertotalamount,
} from "@/app/actions/investment";
import { InvestmentDataTable } from "@/app/lib/definitions";
import InvestmentsTable from "./investments-table";
import { toast } from "react-toastify";

function InvestmentsContent() {
  const [investments, setInvestments] = useState<InvestmentDataTable[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    async function fetchDataInvestments() {
      const { success, message } = await fetchuserinvestments();
      if (!success && message == "Error al cargar inversiones") {
        toast.error(message);
      }
      if (success) {
        const investmentsData: InvestmentDataTable[] =
          message as InvestmentDataTable[];
        setInvestments(investmentsData);
      }
    }
    async function fetchDataTotalAmount() {
      const { success, message } = await getusertotalamount();
      if (!success && message == "Error al cargar cantidad total") {
        toast.error(message);
      }
      if (success) {
        const amount = message as number;
        setTotalAmount(amount);
      }
    }
  }, []);

  return <InvestmentsTable investments={investments} totalAmount={totalAmount} />;
}

export default function Investments() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Tus Inversiones 💸"
        subtitle="Estas son todas tus inversiones:"
      />
      <InvestmentsContent />
    </div>
  );
}
