"use server";

import dbConnect from "@/app/lib/dbConnect";
import Help from "@/models/Help";
import { HelpDataTable } from "@/app/lib/definitions";

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
    const helpsData: HelpDataTable[] = helps.map((h) => ({
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

export async function deletehelp(id: string) {
  try {
    await dbConnect();
    const help = await Help.findById(id);
    if (!help) {
      return { success: false, message: "Pregunta no encontrada" };
    }
    await Help.deleteOne({ _id: id });
    return { success: true, message: "Pregunta eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar pregunta" };
  }
}
