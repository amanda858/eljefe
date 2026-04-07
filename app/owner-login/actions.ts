"use server";

import { redirect } from "next/navigation";
import { setOwnerSession, validateOwnerCredentials } from "@/lib/auth";

export async function loginOwner(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const redirectTo = String(formData.get("redirectTo") ?? "/dashboard");

    if (!validateOwnerCredentials(email, password)) {
        redirect(`/owner-login?error=invalid&redirectTo=${encodeURIComponent(redirectTo)}`);
    }

    await setOwnerSession(email);
    redirect(redirectTo.startsWith("/") ? redirectTo : "/dashboard");
}