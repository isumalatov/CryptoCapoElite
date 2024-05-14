"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { getSession } from "../lib/session";
import { ProfileFormData, NotificationFormData } from "@/app/lib/definitions";

export async function changeprofile(profileData: ProfileFormData) {
  try {
    await dbConnect();
    if (
      !profileData.name ||
      !profileData.email ||
      profileData.name.trim() === "" ||
      profileData.email.trim() === ""
    ) {
      return {
        success: false,
        message: "Error al modificar datos del usuario",
      };
    }
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al modificar datos del usuario",
      };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return {
        success: false,
        message: "Error al modificar datos del usuario",
      };
    }
    await User.updateOne({ _id: session.userId }, profileData);
    return { success: true, message: "Perfil actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al modificar datos del usuario" };
  }
}

export async function fetchnotifications() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar notificaciones" };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return { success: false, message: "Error al cargar notificaciones" };
    }
    const userNotifications: NotificationFormData = {
      allowemailprev: user.allowemailprev,
      allowemailcancel: user.allowemailcancel,
      allowemailnew: user.allowemailnew,
    };
    return { success: true, message: userNotifications };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar notificaciones" };
  }
}

export async function changenotifications(
  notificationData: NotificationFormData
) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al modificar notificaciones",
      };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return {
        success: false,
        message: "Error al modificar notificaciones",
      };
    }
    await User.updateOne({ _id: session.userId }, notificationData);
    return { success: true, message: "Notificaciones actualizadas" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al modificar notificaciones" };
  }
}

export async function getreferralwallet() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar wallet de referidos" };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return { success: false, message: "Error al cargar wallet de referidos" };
    }
    const referralwallet = {
      referralwallet: user.referralwallet,
    };
    return { success: true, message: referralwallet };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar wallet de referidos" };
  }
}
