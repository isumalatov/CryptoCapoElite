"use client";

import WelcomeBanner from "../welcome-banner";
import { getid } from "@/app/actions/auth";
import { useEffect, useState } from "react";
import { userId } from "@/app/lib/definitions";
import { fetchreferredusers } from "@/app/actions/referral";
import { toast } from "react-toastify";
import { UserDataTable } from "@/app/lib/definitions";
import ReferralsTable from "./referrals-table";

function ReferralsContent() {
  const [users, setUsers] = useState<UserDataTable[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { success, message } = await fetchreferredusers();
      if (!success && message == "Error al cargar datos de los usuarios") {
        toast.error(message);
      }
      if (success) {
        const usersData: UserDataTable[] = message as UserDataTable[];
        setUsers(usersData);
      }
    }
    fetchData();
  }, []);
  return <ReferralsTable users={users} />;
}

export default function Referrals() {
  const [id, setId] = useState("");
  useEffect(() => {
    async function fetchData() {
      const { success, message } = await getid();
      if (success) {
        const { id } = message as userId;
        setId(id);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="Tus Referidos 🚀"
        subtitle={`Estos es tu link de referido: https://crypto-capo-elite.vercel.app/signup/${id}`}
      />
      <ReferralsContent />
    </div>
  );
}
