"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import Referral from "@/models/Referral";
import { getSession } from "../lib/session";
import { UserDataTable } from "@/app/lib/definitions";
import { ReferralData } from "@/app/lib/definitions";

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

export async function createreferral(referralData: ReferralData) {
  try {
    const referral = new Referral({
      user: referralData.user,
      amount: referralData.amount,
    });
    await referral.save();
    return { success: true, message: "Referido creado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear el referido" };
  }
}
