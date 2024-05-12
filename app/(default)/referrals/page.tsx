"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../welcome-banner";
import { getid } from "@/app/actions/auth";
import { fetchreferredusers } from "@/app/actions/referral";
import { userId, UserData } from "@/app/lib/definitions";
import ReferralsTable from "./referrals-table";
import { toast } from "react-toastify";

function ReferralsContent() {
  const [users, setUsers] = useState<UserData[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await fetchreferredusers();
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
    fetchData();
  }, []);
  return <ReferralsTable users={users} />;
}

export default function Referrals() {
  const [id, setId] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const { success, message } = await getid();
        if (success) {
          const { id } = message as userId;
          setId(id);
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
        title="Tus Referidos 🚀"
        subtitle={`Estos es tu link de referido: https://crypto-capo-elite.vercel.app/signup/${id}`}
      />
      <ReferralsContent />
    </div>
  );
}
