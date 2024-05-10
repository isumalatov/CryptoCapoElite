"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { UserDataTable, UserData, UserDataUpdate } from "@/app/lib/definitions";
import { getSession } from "../lib/session";
import bcrypt from "bcryptjs";

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

export async function fetchuser(id: string) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      return { success: false, message: "Error al cargar usuario" };
    }
    const userData: UserDataTable = {
      id: user._id.toString(),
      admin: user.admin,
      name: user.name,
      email: user.email,
      discord: user.discord,
      telegram: user.telegram,
      allowemailprev: user.allowemailprev,
      allowemailcancel: user.allowemailcancel,
      allowemailnew: user.allowemailnew,
    };
    return { success: true, message: userData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar usuario" };
  }
}

export async function createuser(userData: UserData) {
  try {
    await dbConnect();
    userData.password = await bcrypt.hash(userData.password, 10);
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

export async function updateuser(id: string, userData: UserDataUpdate) {
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
