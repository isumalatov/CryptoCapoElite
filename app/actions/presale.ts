"use server";

import dbConnect from "@/app/lib/dbConnect";
import Presale from "@/models/Presale";
import { PresaleDataTable, PresaleData } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

export async function fetchpresales() {
  try {
    await dbConnect();
    const presales = await Presale.find({});
    if (!presales) {
      return { success: false, message: "Error al cargar preventas" };
    }
    const presalesData: PresaleDataTable[] = presales.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      description: n.description,
      imagename: n.imagename,
      imageurl: n.imageurl,
      state: n.state,
      round: n.round,
      price: n.price,
      min: n.min,
      max: n.max,
      vesting: n.vesting,
      url: n.url,
      urltelegram: n.urltelegram,
      urltwitter: n.urltwitter,
      urldocs: n.urldocs,
    }));
    return { success: true, message: presalesData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar preventas" };
  }
}

export async function createpresale(presaleData: PresaleData) {
  try {
    await dbConnect();
    const presale = new Presale(presaleData);
    await presale.save();
    return { success: true, message: "Preventa creada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al crear preventa" };
  }
}

export async function deletepresale(id: string) {
  try {
    await dbConnect();
    const presale = await Presale.findById(id);
    if (!presale) {
      return { success: false, message: "Preventa no encontrada" };
    }
    await Presale.deleteOne({ _id: id });
    return { success: true, message: "Preventa eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar preventa" };
  }
}

export async function updatepresale(id: string, presaleData: PresaleData) {
  try {
    await dbConnect();
    const presale = await Presale.findById(id);
    if (!presale) {
      return { success: false, message: "Preventa no encontrada" };
    }
    await Presale.updateOne({ _id: id }, presaleData);
    return { success: true, message: "Preventa actualizada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al actualizar preventa" };
  }
}

export async function uploadImage(formData: FormData) {
  try {
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    revalidatePath("/");
    return {
      success: true,
      message: {
        imageName: imageFile.name,
        imageUrl: blob.url,
      },
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al subir imagen" };
  }
}

export async function deleteImage(imageName: string) {
  try {
    await del(imageName);
    revalidatePath("/");
    return { success: true, message: "Imagen eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar imagen" };
  }
}