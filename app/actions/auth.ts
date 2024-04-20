"use server";

import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  console.log("signup", formData);
  await createSession("1");
  redirect("/");
}

export async function signin(formData: FormData) {
  console.log("signin", formData);
  await createSession("1");
  redirect("/");
}

export async function logout() {
  redirect("/signin");
}
