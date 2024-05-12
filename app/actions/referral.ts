"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import Referral from "@/models/Referral";
import { getSession } from "../lib/session";
import { UserDataTable, UserData } from "@/app/lib/definitions";
import { ReferralDataTable, ReferralDataCreate } from "@/app/lib/definitions";
import { fetchprofileid } from "./account";

export async function fetchreferrals() {
  try {
    await dbConnect();
    const referrals = await Referral.find();
    if (!referrals) {
      return {
        success: false,
        message: "Error al cargar datos de los referidos",
      };
    }
    const referralData: ReferralDataTable[] = referrals.map((referral) => {
      return {
        id: referral._id.toString(),
        user: referral.user,
        amount: referral.amount,
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
    const users = await User.find({ _id: session.userId });
    if (!users) {
      return {
        success: false,
        message: "Error al cargar datos de los usuarios",
      };
    }
    const referredUsersData: UserDataTable[] = users.map((user) => {
      return {
        id: user._id.toString(),
        admin: user.admin,
        name: user.name,
        email: user.email,
        discord: user.discord,
        telegram: user.telegram,
        allowemailprev: user.allowemailprev,
        allowemailcancel: user.allowemailcancel,
        allowemailnew: user.allowemailnew,
        referral: { id: user.referral.id, name: user.referral.name },
      };
    });
    return { success: true, message: referredUsersData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar datos de los usuarios" };
  }
}

export async function createreferral(referralData: ReferralDataCreate) {
  try {
    await dbConnect();
    const profile = await fetchprofileid(referralData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al crear inversión" };
    const referral = new Referral({
      user: {
        id: referralData.idUser,
        name: (profile as { success: boolean; message: UserData }).message.name,
      },
      amount: referralData.amount,
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
    const profile = await fetchprofileid(referralData.idUser);
    if (!(profile as { success: boolean; message: UserData }).success)
      return { success: false, message: "Error al crear inversión" };
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
      }
    );
    return { success: true, message: "Referido actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar referido" };
  }
}
