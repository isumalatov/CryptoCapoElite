"use client";

import WelcomeBanner from "../welcome-banner";
import { getid } from "@/app/actions/auth";
import { useEffect, useState } from "react";
import { userId } from "@/app/lib/definitions";

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
    </div>
  );
}
