import dbConnect from "@/app/lib/dbConnect";
import New from "@/models/New";
import { NewData } from "@/app/lib/definitions";

export async function fetchnews() {
  try {
    await dbConnect();
    const news = await New.find();
    if (!news) {
      return { success: false, message: "Error al cargar noticias" };
    }
    if (news.length === 0) {
      return { success: false, message: "No hay noticias" };
    }
    const newsData: NewData[] = news.map((n) => ({
      title: n.title,
      content: n.content,
    }));
    return { success: true, message: newsData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar noticias" };
  }
}

export async function createnew(newData: NewData) {
  try {
    await dbConnect();
    const newNew = new New(newData);
    await newNew.save();
    return { success: true, message: "Noticia creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear noticia" };
  }
}
