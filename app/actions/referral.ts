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
        amount: r.amount,
        wallet: r.wallet,
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
      amount: referralData.amount,
      wallet: referralData.wallet,
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
        amount: referralData.amount,
        wallet: referralData.wallet,
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
