"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import Referral from "@/models/Referral";
import { getSession } from "@/app/lib/session";
import {
  ReferralData,
  ReferralDataCreate,
  UserData,
} from "@/app/lib/definitions";
import { fetchuserid } from "./user";
import mongoose from 'mongoose';

export async function fetchreferrals() {
  try {
    await dbConnect();
    const referrals = await Referral.find({});
    if (!referrals) {
      return {
        success: false,
        message: "Error al cargar datos de los referidos",
      };
    }
    const referralData: ReferralData[] = referrals.map((r) => {
      return {
        id: r._id.toString(),
        user: { id: r.user.id, name: r.user.name },
        investment: { id: r.investment.id },
        amount: r.amount,
        wallet: r.wallet,
        state: r.state,
      };
    });
    return { success: true, message: referralData };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error al cargar datos de los referidos",
    };
  }
}

export async function fetchreferralinvestmentid(idInvestment: string) {
  try {
    await dbConnect();
    const referralId = new mongoose.Types.ObjectId(idInvestment);
    const referral = await Referral.findOne({ "investment.id": referralId });
    if (!referral) {
      return {
        success: false,
        message: "Error al cargar datos del referido",
      };
    }
    const referralData: ReferralData = {
      id: referral._id.toString(),
      user: { id: referral.user.id, name: referral.user.name },
      investment: { id: referral.investment.id },
      amount: referral.amount,
      wallet: referral.wallet,
      state: referral.state,
    };
    return { success: true, message: referralData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar datos del referido" };
  }
}

export async function fetchreferredusers() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al cargar datos de los usuarios",
      };
    }
    const users = await User.find({ "referral.id": session.userId });
    if (!users) {
      return {
        success: false,
        message: "Error al cargar datos de los usuarios",
      };
    }
    const UserData: UserData[] = users.map((u) => {
      return {
        id: u._id.toString(),
        admin: u.admin,
        name: u.name,
        email: u.email,
        password: u.password,
        discord: u.discord,
        telegram: u.telegram,
        allowemailprev: u.allowemailprev,
        allowemailcancel: u.allowemailcancel,
        allowemailnew: u.allowemailnew,
        referral: { id: u.referral.id, name: u.referral.name },
        referralwallet: u.referralwallet,
      };
    });
    return { success: true, message: UserData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar datos de los usuarios" };
  }
}

export async function createreferral(referralData: ReferralDataCreate) {
  try {
    await dbConnect();
    const profile = await fetchuserid(referralData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al crear inversión" };
    const referral = new Referral({
      user: {
        id: referralData.idUser,
        name: (profile as { success: boolean; message: UserData }).message.name,
      },
      investment: { id: referralData.idInvestment },
      amount: referralData.amount,
      wallet: referralData.wallet,
      state: referralData.state,
    });
    await referral.save();
    return { success: true, message: "Referido creado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear el referido" };
  }
}

export async function deletereferral(id: string) {
  try {
    await dbConnect();
    const referral = await Referral.findById({ _id: id });
    if (!referral) {
      return { success: false, message: "Referido no encontrado" };
    }
    await Referral.deleteOne({ _id: id });
    return { success: true, message: "Referido eliminado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar referido" };
  }
}

export async function deletereferralinvestmentid(idInvestment: string) {
  try {
    await dbConnect();
    const referralId = new mongoose.Types.ObjectId(idInvestment);
    const referral = await Referral.findOne({ "investment.id": referralId });
    if (!referral) {
      return { success: false, message: "Referido no encontrado" };
    }
    await Referral.deleteOne({ "investment.id": idInvestment });
    return { success: true, message: "Referido eliminado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar referido" };
  }
}

export async function updatereferral(
  id: string,
  referralData: ReferralDataCreate
) {
  try {
    await dbConnect();
    const profile = await fetchuserid(referralData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al actualizar inversión" };
    const referral = await Referral.findById({ _id: id });
    if (!referral) {
      return { success: false, message: "Referido no encontrado" };
    }
    await Referral.updateOne(
      { _id: id },
      {
        user: {
          id: referralData.idUser,
          name: (profile as { success: boolean; message: UserData }).message
            .name,
        },
        investment: { id: referralData.idInvestment },
        amount: referralData.amount,
        wallet: referralData.wallet,
        state: referralData.state,
      }
    );
    return { success: true, message: "Referido actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar referido" };
  }
}

export async function updatereferralinvestmentid(
  idInvestment: string,
  referralData: ReferralDataCreate
) {
  try {
    await dbConnect();
    const profile = await fetchuserid(referralData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al actualizar inversión" };
    const referralId = new mongoose.Types.ObjectId(idInvestment);
    const referral = await Referral.findOne({ "investment.id": referralId });
    if (!referral) {
      return { success: false, message: "Referido no encontrado" };
    }
    await Referral.updateOne(
      { _id: referral._id.toString() },
      {
        user: {
          id: referralData.idUser,
          name: (profile as { success: boolean; message: UserData }).message
            .name,
        },
        investment: { id: idInvestment },
        amount: referralData.amount,
        wallet: referralData.wallet,
        state: referralData.state,
      }
    );
    return { success: true, message: "Referido actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar referido" };
  }
}

export async function getusertotalamount() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar datos de usuario" };
    }
    const referrals = await Referral.find({ "user.id": session.userId });
    if (!referrals) {
      return { success: false, message: "Error al cargar datos de usuario" };
    }
    const totalAmount = referrals.reduce((acc, r) => acc + r.amount, 0);
    return { success: true, message: totalAmount };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar datos de usuario" };
  }
}
