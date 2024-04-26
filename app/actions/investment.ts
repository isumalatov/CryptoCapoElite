"use server";

import dbConnect from "@/app/lib/dbConnect";
import Investment from "@/models/Investment";
import { InvestmentDataTable } from "@/app/lib/definitions";
import { getSession } from "../lib/session";

export async function fetchpresaleinvestments(id: string) {
  try {
    await dbConnect();
    const investments = await Investment.find({ "presale.id": id });
    if (!investments) {
      return {
        success: false,
        message: "Error al cargar inversiones",
      };
    }
    const investmentsData: InvestmentDataTable[] = investments.map((i) => ({
      id: i._id.toString(),
      user: i.user.name,
      presale: i.presale.title,
      amount: i.amount,
      txid: i.txid,
      wallet: i.wallet,
      status: i.status,
    }));
    return { success: true, message: investmentsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar inversiones" };
  }
}

export async function fetchuserinvestments() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al cargar inversiones",
      };
    }
    const investments = await Investment.find({ "user.id": session.userId });
    if (!investments) {
      return {
        success: false,
        message: "Error al cargar inversiones",
      };
    }
    const investmentsData: InvestmentDataTable[] = investments.map((i) => ({
      id: i._id.toString(),
      user: i.user.name,
      presale: i.presale.title,
      amount: i.amount,
      txid: i.txid,
      wallet: i.wallet,
      status: i.status,
    }));
    return { success: true, message: investmentsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar inversiones" };
  }
}
