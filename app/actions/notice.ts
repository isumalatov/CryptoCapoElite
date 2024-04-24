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
    if (notices.length === 0) {
      return { success: false, message: "No hay noticias" };
    }
    const noticesData: NoticeDataTable[] = notices.map((n) => ({
      id: n._id,
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
