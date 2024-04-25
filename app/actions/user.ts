"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { UserDataTable, UserData } from "@/app/lib/definitions";
import { getSession } from "../lib/session";

export async function fetchusers() {
  try {
    await dbConnect();
    const users = await User.find({});
    if (!users) {
      return { success: false, message: "Error al cargar usuarios" };
    }
    const usersData: UserDataTable[] = users.map((n) => ({
      id: n._id.toString(),
      admin: n.admin,
      name: n.name,
      email: n.email,
      discord: n.discord,
      telegram: n.telegram,
      allowemailprev: n.allowemailprev,
      allowemailcancel: n.allowemailcancel,
      allowemailnew: n.allowemailnew,
    }));
    return { success: true, message: usersData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar usuarios" };
  }
}

export async function createuser(userData: UserData) {
  try {
    await dbConnect();
    const user = new User(userData);
    await user.save();
    return { success: true, message: "Usuario creado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear usuario" };
  }
}

export async function deleteuser(id: string) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    const session = await getSession();
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    if (session.userId === id) {
      return { success: false, message: "No puedes eliminarte a ti mismo" };
    }
    await User.deleteOne({
      _id: id,
    });
    return { success: true, message: "Usuario eliminado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar usuario" };
  }
}

export async function updateuser(id: string, userData: UserData) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    const session = await getSession();
    if (!user) {
      return { success: false, message: "Usuario no encontrado" };
    }
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    if (session.userId === id) {
      return { success: false, message: "No puedes actualizarte a ti mismo" };
    }
    await User.updateOne({ _id: id }, userData);
    return { success: true, message: "Usuario actualizado" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar usuario" };
  }
}