"use client";

import { useEffect, useState } from "react";
import WelcomeBanner from "../../../welcome-banner";
import UserReferralsTable from "./user-referrals-table";
import { UserData } from "@/app/lib/definitions";
import { toast } from "react-toastify";
import { fetchreferredusers } from "@/app/actions/referral";

function UserReferralsContent({ id }: { id: string }) {
  const [referrals, setReferrals] = useState<UserData[]>([]);

  async function fetchReferralsData() {
    try {
      const { success, message } = await fetchreferredusers(id);
      if (success) {
        const referralsData: UserData[] = message as UserData[];
        setReferrals(referralsData);
      }
      if (!success) {
        toast.error(message as string);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchReferralsData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Table */}
      <UserReferralsTable id={id} referrals={referrals} />
    </div>
  );
}

export default function UserReferralsAdmin({
  params,
  searchParams,
}: {
  params: { userid: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userid = params.userid;
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <WelcomeBanner
        title="Administración de Referridos de Usuarios"
        subtitle="Gestiona los referidos de este usuario:"
      />
      <UserReferralsContent id={userid} />
    </div>
  );
}
