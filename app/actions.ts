"use server";

import { redirect } from "next/navigation";
import { clearOwnerSession } from "@/lib/auth";

export async function logoutOwner() {
    await clearOwnerSession();
    redirect("/");
}