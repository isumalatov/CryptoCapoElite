"use server";

import dbConnect from "@/app/lib/dbConnect";
import Notice from "@/models/Notice";
import { NoticeDataTable, NoticeData } from "@/app/lib/definitions";

export async function fetchnotices() {
  try {
    await dbConnect();
    const notices = await Notice.find({});
    if (!notices) {
      return { success: false, message: "Error al cargar noticias" };
    }
    const noticesData: NoticeDataTable[] = notices.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      content: n.content,
    }));
    return { success: true, message: noticesData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar noticias" };
  }
}

export async function createnotice(noticeData: NoticeData) {
  try {
    await dbConnect();
    const notice = new Notice(noticeData);
    await notice.save();
    return { success: true, message: "Noticia creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear noticia" };
  }
}

export async function deletenotice(id: string) {
  try {
    await dbConnect();
    const notice = await Notice.findById(id);
    if (!notice) {
      return { success: false, message: "Noticia no encontrada" };
    }
    await Notice.deleteOne({ _id: id });
    return { success: true, message: "Noticia eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar noticia" };
  }
}

export async function updatenotice(id: string, noticeData: NoticeData) {
  try {
    await dbConnect();
    const notice = await Notice.findById(id);
    if (!notice) {
      return { success: false, message: "Noticia no encontrada" };
    }
    await Notice.updateOne({ _id: id }, noticeData);
    return { success: true, message: "Noticia actualizada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar noticia" };
  }
}
