"use server";

import dbConnect from "@/app/lib/dbConnect";
import Investment from "@/models/Investment";
import {
  InvestmentDataTable,
  InvestmentDataCreate,
  InvestmentDataCreateUser,
  PresaleData,
  ProfileFormData,
} from "@/app/lib/definitions";
import { getSession } from "../lib/session";
import { fetchprofileid } from "./account";
import { fetchpresaleid } from "./presale";

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
      user: { id: i.user.id, name: i.user.name },
      presale: { id: i.presale.id, name: i.presale.name },
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
      user: { id: i.user.id, name: i.user.name },
      presale: { id: i.presale.id, name: i.presale.name },
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

export async function createinvestment(investmentData: InvestmentDataCreate) {
  try {
    await dbConnect();
    const profile = await fetchprofileid(investmentData.idUser);
    if (!(profile as { success: boolean; message: ProfileFormData }).success)
      return { success: false, message: "Error al crear inversión" };
    const presale = await fetchpresaleid(investmentData.idPresale);
    if (!(presale as { success: boolean; message: PresaleData }).success)
      return { success: false, message: "Error al crear inversión" };
    const investment = new Investment({
      user: {
        id: investmentData.idUser,
        name: (profile as { success: boolean; message: ProfileFormData })
          .message.name,
      },
      presale: {
        id: investmentData.idPresale,
        name: (presale as { success: boolean; message: PresaleData }).message
          .name,
      },
      amount:
        investmentData.amount *
        (1 -
          (presale as { success: boolean; message: PresaleData }).message.fees /
            100),
      tokens:
        (investmentData.amount *
          (1 -
            (presale as { success: boolean; message: PresaleData }).message
              .fees /
              100)) /
        (presale as { success: boolean; message: PresaleData }).message.price,
      txid: investmentData.txid,
      wallet: investmentData.wallet,
      state: investmentData.state,
    });
    await investment.save();
    return { success: true, message: "Inversión creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear inversión" };
  }
}

export async function createinvestmentuser(
  investmentData: InvestmentDataCreateUser
) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al crear inversión" };
    }
    const profile = await fetchprofileid(session.userId as string);
    if (!(profile as { success: boolean; message: ProfileFormData }).success)
      return { success: false, message: "Error al crear inversión" };
    const presale = await fetchpresaleid(investmentData.idPresale);
    if (!(presale as { success: boolean; message: PresaleData }).success)
      return { success: false, message: "Error al crear inversión" };
    const investment = new Investment({
      user: {
        id: session.userId as string,
        name: (profile as { success: boolean; message: ProfileFormData })
          .message.name,
      },
      presale: {
        id: investmentData.idPresale,
        name: (presale as { success: boolean; message: PresaleData }).message
          .name,
      },
      amount:
        investmentData.amount *
        (1 -
          (presale as { success: boolean; message: PresaleData }).message.fees /
            100),
      tokens:
        (investmentData.amount *
          (1 -
            (presale as { success: boolean; message: PresaleData }).message
              .fees /
              100)) /
        (presale as { success: boolean; message: PresaleData }).message.price,
      txid: investmentData.txid,
      wallet: investmentData.wallet,
      state: "Pendiente",
    });
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
  investmentData: InvestmentDataCreate
) {
  try {
    await dbConnect();
    const investment = await Investment.findById(id);
    if (!investment) {
      return { success: false, message: "Inversión no encontrada" };
    }
    const profile = await fetchprofileid(investmentData.idUser);
    if (!(profile as { success: boolean; message: ProfileFormData }).success)
      return { success: false, message: "Error al crear inversión" };
    const presale = await fetchpresaleid(investmentData.idPresale);
    if (!(presale as { success: boolean; message: PresaleData }).success)
      return { success: false, message: "Error al crear inversión" };
    await Investment.updateOne(
      { _id: id },
      {
        user: {
          id: investmentData.idUser,
          name: (profile as { success: boolean; message: ProfileFormData })
            .message.name,
        },
        presale: {
          id: investmentData.idPresale,
          name: (presale as { success: boolean; message: PresaleData }).message
            .name,
        },
        amount:
          investmentData.amount *
          (1 -
            (presale as { success: boolean; message: PresaleData }).message
              .fees /
              100),
        tokens:
          (investmentData.amount *
            (1 -
              (presale as { success: boolean; message: PresaleData }).message
                .fees /
                100)) /
          (presale as { success: boolean; message: PresaleData }).message.price,
        txid: investmentData.txid,
        wallet: investmentData.wallet,
        state: investmentData.state,
      }
    );
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
