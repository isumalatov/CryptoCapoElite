"use server";

import dbConnect from "@/app/lib/dbConnect";
import Notice from "@/models/Notice";
import { NoticeData, NoticeDataCreate } from "@/app/lib/definitions";

export async function fetchnotices() {
  try {
    await dbConnect();
    const notices = await Notice.find({});
    if (!notices) {
      return { success: false, message: "Error al cargar noticias" };
    }
    const noticesData: NoticeData[] = notices.map((n) => ({
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

export async function createnotice(noticeData: NoticeDataCreate) {
  try {
    await dbConnect();
    if (
      !noticeData.title ||
      !noticeData.content ||
      noticeData.title.trim() === "" ||
      noticeData.content.trim() === ""
    ) {
      return { success: false, message: "Error al crear noticia" };
    }
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
    const notice = await Notice.findById({ _id: id });
    if (!notice) {
      return { success: false, message: "Error al eliminar noticia" };
    }
    await Notice.deleteOne({ _id: id });
    return { success: true, message: "Noticia eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar noticia" };
  }
}

export async function updatenotice(id: string, noticeData: NoticeDataCreate) {
  try {
    await dbConnect();
    if (
      !noticeData.title ||
      !noticeData.content ||
      noticeData.title.trim() === "" ||
      noticeData.content.trim() === ""
    ) {
      return { success: false, message: "Error al actualizar noticia" };
    }
    const notice = await Notice.findById({ _id: id });
    if (!notice) {
      return { success: false, message: "Error al actualizar noticia" };
    }
    await Notice.updateOne({ _id: id }, noticeData);
    return { success: true, message: "Noticia actualizada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar noticia" };
  }
}
