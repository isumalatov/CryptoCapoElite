"use server";

import dbConnect from "@/app/lib/dbConnect";
import Presale from "@/models/Presale";
import { PresaleDataTable, PresaleData } from "@/app/lib/definitions";

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
