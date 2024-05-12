"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../welcome-banner";
import {
  fetchuserinvestments,
  getusertotalamount,
} from "@/app/actions/investment";
import { InvestmentData } from "@/app/lib/definitions";
import InvestmentsTable from "./investments-table";
import { toast } from "react-toastify";

function InvestmentsContent() {
  const [investments, setInvestments] = useState<InvestmentData[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    async function fetchDataInvestments() {
      try {
        const { success, message } = await fetchuserinvestments();
        if (success) {
          const investmentsData: InvestmentData[] = message as InvestmentData[];
          setInvestments(investmentsData);
        }
        if (!success) {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchDataTotalAmount() {
      try {
        const { success, message } = await getusertotalamount();
        if (success) {
          const amount = message as number;
          setTotalAmount(amount);
        }
        if (!success) {
          toast.error(message as string);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDataInvestments();
    fetchDataTotalAmount();
  }, []);

  return (
    <InvestmentsTable investments={investments} totalAmount={totalAmount} />
  );
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
