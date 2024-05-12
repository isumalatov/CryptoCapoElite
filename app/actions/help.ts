"use server";

import dbConnect from "@/app/lib/dbConnect";
import Help from "@/models/Help";
import { getSession } from "@/app/lib/session";
import { HelpData, HelpDataCreate } from "@/app/lib/definitions";

export async function fetchhelps() {
  try {
    await dbConnect();
    const helps = await Help.find({});
    if (!helps) {
      return {
        success: false,
        message: "Error al cargar preguntas",
      };
    }
    const helpsData: HelpData[] = helps.map((h) => ({
      id: h._id.toString(),
      user: { id: h.user.id, name: h.user.name },
      help: h.help,
    }));
    return { success: true, message: helpsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar preguntas" };
  }
}

export async function createhelp(helpData: HelpDataCreate) {
  try {
    await dbConnect();
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Error al enviar pregunta",
      };
    }
    const help = new Help({
      user: { id: session.userId, name: session.name },
      help: helpData.help,
    });
    await help.save();
    return { success: true, message: "Pregunta enviada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al enviar pregunta" };
  }
}

export async function deletehelp(id: string) {
  try {
    await dbConnect();
    const help = await Help.findById({ _id: id });
    if (!help) {
      return { success: false, message: "Error al eliminar pregunta" };
    }
    await Help.deleteOne({ _id: id });
    return { success: true, message: "Pregunta eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar pregunta" };
  }
}
