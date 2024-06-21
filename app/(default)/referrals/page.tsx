"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../welcome-banner";
import FintechIntro from "../fintech-intro";
import { fetchreferredusersuser, getusertotalamount } from "@/app/actions/referral";
import { UserData } from "@/app/lib/definitions";
import ReferralsTable from "./referrals-table";
import { toast } from "react-toastify";

function ReferralsContent() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    async function fetchDataUsers() {
      try {
        const { success, message } = await fetchreferredusersuser();
        if (success) {
          const usersData: UserData[] = message as UserData[];
          setUsers(usersData);
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
    fetchDataUsers();
    fetchDataTotalAmount();
  }, []);
  return <ReferralsTable users={users} totalAmount={totalAmount} />;
}

export default function Referrals() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="Tus Referidos 🚀"
        subtitle="¡Obten dinero cada vez que algun amigo tuyo realice una compra!"
      />
      <FintechIntro />
      <ReferralsContent />
    </div>
  );
}
