"use server";

import { EmailTemplate } from "../../components/email-template";
import { Resend } from "resend";
import * as React from "react";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendemail(email: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: email });
    if (!user) {
      return { success: false, message: "Email no registrado" };
    }
    const token = Math.random().toString(36).slice(-8);
    await User.updateOne({ _id: user._id }, { resetpasswordtoken: token });

    const { data, error } = await resend.emails.send({
      from: "CryptoCapoElite <cryptocapoelite@resend.dev>",
      to: [email],
      subject: "Restablecer Contraseña",
      react: EmailTemplate({
        link: `https://cryptocapoelite.com/new-password/${token}`,
      }) as React.ReactElement,
    });
    if (error) {
      return { success: false, message: "Error al enviar email" };
    }
    return { success: true, message: "Email enviado correctamente" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al enviar email" };
  }
}
