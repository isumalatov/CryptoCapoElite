"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import { createSession, deleteSession, getSession } from "@/app/lib/session";
import {
  ChangePasswordFormData,
  SignUpReferralFormData,
} from "@/app/lib/definitions";
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
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return { success: false, message: "El email ya está registrado" };
    }

    // comprobar si el nombre de usuario ya está registrado
    const existingUserByName = await User.findOne({ name: name });

    if (existingUserByName) {
      return {
        success: false,
        message: "El nombre de usuario ya está registrado",
      };
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
      resetpasswordtoken: "",
      referral: { id: "", name: "" },
      referralwallet: "",
    });
    await user.save();
    await createSession(user._id, user.admin, user.name);
    return { success: true, message: "Cuenta creada correctamente" };
  } catch (error) {
    // Handle the error here
    console.error(error);
    return { success: false, message: "Error al crear la cuenta" };
  }
}

export async function signupreferral(
  signupreferralData: SignUpReferralFormData
) {
  try {
    await dbConnect();

    const email = signupreferralData.email;
    const name = signupreferralData.name;
    const password = signupreferralData.password;
    const repeatpassword = signupreferralData.repeatpassword;
    const allowemail = signupreferralData.allowemail;
    const idUser = signupreferralData.idUser;

    const profile = await User.findOne({ _id: idUser });
    if (!profile) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }

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
      resetpasswordtoken: "",
      referral: { id: idUser, name: profile.name },
      referralwallet: "",
    });
    await user.save();
    await createSession(user._id, user.admin, user.name);
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
    await createSession(user._id, user.admin, user.name);
    return { success: true, message: "Inicio de sesión correcto" };
  } catch (error) {
    // Handle the error here
    console.error(error);
    return { success: false, message: "Error al iniciar sesión" };
  }
}

export async function resetpassword(
  token: string,
  password: string,
  repeatpassword: string
) {
  try {
    await dbConnect();
    const user = await User.findOne({ resetpasswordtoken: token });
    if (!user) {
      return { success: false, message: "Token inválido" };
    }
    if (password !== repeatpassword) {
      return { success: false, message: "Las contraseñas no coinciden" };
    }
    if (password.length < 8 || password.length > 20) {
      return {
        success: false,
        message: "La contraseña debe tener entre 8 y 20 caracteres",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: user._id },
      { password: hashedPassword, resetpasswordtoken: "" }
    );
    await createSession(user._id, user.admin, user.name);
    return { success: true, message: "Contraseña restablecida correctamente" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al restablecer la contraseña" };
  }
}

export async function changepassword(
  changepasswordData: ChangePasswordFormData
) {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    const user = await User.findById(session.userId);
    if (!user) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }

    if (
      !(await bcrypt.compare(changepasswordData.oldpassword, user.password))
    ) {
      return { success: false, message: "Contraseña actual incorrecta" };
    }

    if (changepasswordData.password !== changepasswordData.repeatpassword) {
      return { success: false, message: "Las contraseñas no coinciden" };
    }

    if (
      changepasswordData.password.length < 8 ||
      changepasswordData.password.length > 20
    ) {
      return {
        success: false,
        message: "La contraseña debe tener entre 8 y 20 caracteres",
      };
    }

    const hashedPassword = await bcrypt.hash(changepasswordData.password, 10);
    await User.updateOne({ _id: session.userId }, { password: hashedPassword });
    return { success: true, message: "Contraseña actualizada correctamente" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al actualizar la contraseña" };
  }
}

export async function getadmin() {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    const isAdmin = {
      admin: session.admin,
    };
    return { success: true, message: isAdmin };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al cargar datos del usuario" };
  }
}

export async function getid() {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    const id = {
      id: session.userId,
    };
    return { success: true, message: id };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al cargar datos del usuario" };
  }
}

export async function getname() {
  try {
    const session = await getSession();
    if (!session) {
      return { success: false, message: "Error al cargar datos del usuario" };
    }
    const name = {
      name: session.name,
    };
    return { success: true, message: name };
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
