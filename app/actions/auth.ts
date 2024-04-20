"use server";

import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    allowemail: formData.get("allowemail"),
  };
  console.log("signup", rawFormData);
  redirect("/");
}

export async function signin(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    name: formData.get("password"),
  };
  console.log("signin", rawFormData);
  redirect("/");
}

export async function logout() {
  redirect("/signin");
}
