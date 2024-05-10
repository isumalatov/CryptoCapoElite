"use server";

import dbConnect from "@/app/lib/dbConnect";
import Presale from "@/models/Presale";
import { PresaleDataTable, PresaleData } from "@/app/lib/definitions";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

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
      name: n.name,
      wallet: n.wallet,
      description: n.description,
      imagename: n.imagename,
      imageurl: n.imageurl,
      state: n.state,
      round: n.round,
      price: n.price,
      min: n.min,
      max: n.max,
      vesting: n.vesting,
      tokenstandard: n.tokenstandard,
      fees: n.fees,
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

export async function fetchpresale(id: string) {
  try {
    await dbConnect();
    const presale = await Presale.findById(id);
    if (!presale) {
      return { success: false, message: "Preventa no encontrada" };
    }
    const presaleData: PresaleData = {
      title: presale.title,
      name: presale.name,
      wallet: presale.wallet,
      description: presale.description,
      imagename: presale.imagename,
      imageurl: presale.imageurl,
      state: presale.state,
      round: presale.round,
      price: presale.price,
      min: presale.min,
      max: presale.max,
      vesting: presale.vesting,
      tokenstandard: presale.tokenstandard,
      fees: presale.fees,
      url: presale.url,
      urltelegram: presale.urltelegram,
      urltwitter: presale.urltwitter,
      urldocs: presale.urldocs,
    };
    return { success: true, message: presaleData };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al cargar preventa" };
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
    const s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
    const s3Bucket = process.env.AWS_BUCKET_NAME as string;
    const imageFile = formData.get("image") as File;
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}.png`;
    const params = {
      Bucket: s3Bucket,
      Key: imageName,
      Body: buffer,
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    revalidatePath("/");
    return {
      success: true,
      message: {
        imageName: imageName,
        imageUrl: `https://${s3Bucket}.s3.amazonaws.com/${imageName}`,
      },
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al subir imagen" };
  }
}

export async function deleteImage(imageName: string) {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
    const s3Bucket = process.env.AWS_BUCKET_NAME as string;
    const params = {
      Bucket: s3Bucket,
      Key: imageName,
    };
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    revalidatePath("/");
    return { success: true, message: "Imagen eliminada" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error al eliminar imagen" };
  }
}
