"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { getSession } from "../lib/session";
import { ProfileFormData } from "@/app/lib/definitions";

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
      return { success: false, message: "Error al modificar datos del usuario" };
    }
    const user = await User.findOne({ _id: session.userId });
    if (!user) {
      return { success: false, message: "Error al modificar datos del usuario" };
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
