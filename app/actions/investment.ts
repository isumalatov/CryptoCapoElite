"use server";

import dbConnect from "@/app/lib/dbConnect";
import Investment from "@/models/Investment";
import { InvestmentDataTable, InvestmentData } from "@/app/lib/definitions";
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
      idUser: i.idUser._id.toString(),
      idPresale: i.idPresale._id.toString(),
      amount: i.amount,
      tokens: i.tokens,
      txid: i.txid,
      wallet: i.wallet,
      state: i.state,
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
      idUser: i.idUser._id.toString(),
      idPresale: i.idPresale._id.toString(),
      amount: i.amount,
      tokens: i.tokens,
      txid: i.txid,
      wallet: i.wallet,
      state: i.state,
    }));
    return { success: true, message: investmentsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar inversiones" };
  }
}

export async function createinvestment(investmentData: InvestmentData) {
  try {
    await dbConnect();
    const investment = new Investment(investmentData);
    await investment.save();
    return { success: true, message: "Inversión creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear inversión" };
  }
}

export async function deleteinvestment(id: string) {
  try {
    await dbConnect();
    const investment = await Investment.findById(id);
    if (!investment) {
      return { success: false, message: "Inversión no encontrada" };
    }
    await Investment.deleteOne({ _id: id });
    return { success: true, message: "Inversión eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar inversión" };
  }
}

export async function updateinvestment(
  id: string,
  investmentData: InvestmentData
) {
  try {
    await dbConnect();
    const investment = await Investment.findById(id);
    if (!investment) {
      return { success: false, message: "Inversión no encontrada" };
    }
    await Investment.updateOne({ _id: id }, investmentData);
    return { success: true, message: "Inversión actualizada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar inversión" };
  }
}

export async function getusertotalamount() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al cargar cantidad total",
      };
    }
    const investments = await Investment.find({ "user.id": session.userId });
    if (!investments) {
      return {
        success: false,
        message: "Error al cargar cantidad total",
      };
    }
    const totalAmount = investments.reduce((acc, i) => acc + i.amount, 0);
    return { success: true, message: totalAmount };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar cantidad total" };
  }
}
