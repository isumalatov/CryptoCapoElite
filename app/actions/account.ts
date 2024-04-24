"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import Help from "@/models/Help";
import { getSession } from "../lib/session";
import {
  ProfileFormData,
  NotificationFormData,
  HelpFormData,
} from "@/app/lib/definitions";

export async function fetchprofile() {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    const userProfile = {
      name: user.name,
      email: user.email,
      telegram: user.telegram,
      discord: user.discord,
    };

    return { success: true, message: userProfile };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar datos del usuario" };
  }
}

export async function changeprofile(profileData: ProfileFormData) {
  try {
    await dbConnect();
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
    user.name = profileData.name;
    user.email = profileData.email;
    user.telegram = profileData.telegram;
    user.discord = profileData.discord;
    await user.save();
    return { success: true, message: "Perfil actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar datos del usuario" };
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
    const userNotifications = {
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
    user.allowemailprev = notificationData.allowemailprev;
    user.allowemailcancel = notificationData.allowemailcancel;
    user.allowemailnew = notificationData.allowemailnew;
    await user.save();
    return { success: true, message: "Notificaciones actualizadas" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al modificar notificaciones" };
  }
}

export async function createhelp(helpData: HelpFormData) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al enviar pregunta",
      };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return {
        success: false,
        message: "Error al enviar pregunta",
      };
    }
    const help = new Help({
      user: { id: user._id, name: user.name },
      help: helpData.help,
    });
    await help.save();
    return { success: true, message: "Pregunta enviada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al enviar pregunta" };
  }
}
