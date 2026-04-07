import { redirect } from "next/navigation";

export default async function OwnerLoginPage() {
    redirect("/dashboard");
}