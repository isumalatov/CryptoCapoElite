"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { createSession, deleteSession, getSession } from "../lib/session";
import bcrypt from "bcryptjs";

export async function signup(prevState: any, formData: FormData) {
  try {
    await dbConnect();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const repeatpassword = formData.get("repeatpassword") as string;
    const allowemail = formData.get("allowemail") === "on";

    if (
      !email ||
      email.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !password ||
      password.trim() === "" ||
      !repeatpassword ||
      repeatpassword.trim() === ""
    ) {
      return { success: false, message: "Rellena todos los campos" };
    }

    // Comprobar si la contraseña tiene entre 8 y 20 caracteres
    if (password.length < 8 || password.length > 20) {
      return {
        success: false,
        message: "La contraseña debe tener entre 8 y 20 caracteres",
      };
    }

    // Comprobar si el nombre no supera los 20 caracteres
    if (name.length > 20) {
      return {
        success: false,
        message: "El nombre no puede superar los 20 caracteres",
      };
    }

    if (password !== repeatpassword) {
      return { success: false, message: "Las contraseñas no coinciden" };
    }

    // comprobar si el email ya está registrado
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return { success: false, message: "El email ya está registrado" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      admin: false,
      email: email,
      name: name,
      password: hashedPassword,
      allowemailprev: allowemail,
      allowemailcancel: allowemail,
      allowemailnew: allowemail,
      discord: "",
      telegram: "",
    });
    await user.save();
    await createSession(user._id);
    return { success: true, message: "Cuenta creada correctamente" };
  } catch (error) {
    // Handle the error here
    console.error(error);
    return { success: false, message: "Error al crear la cuenta" };
  }
}

export async function signin(prevState: any, formData: FormData) {
  try {
    await dbConnect();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return { success: false, message: "Rellena todos los campos" };
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return { success: false, message: "Email o contraseña incorrectos" };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { success: false, message: "Email o contraseña incorrectos" };
    }
    await createSession(user._id);
    return { success: true, message: "Inicio de sesión correcto" };
  } catch (error) {
    // Handle the error here
    console.error(error);
    return { success: false, message: "Error al iniciar sesión" };
  }
}

export async function userisadmin() {
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

    return { success: true, message: user.admin };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al cargar datos del usuario" };
  }
}

export async function logout() {
  try {
    deleteSession();
  } catch (error) {
    console.error(error);
  }
}
