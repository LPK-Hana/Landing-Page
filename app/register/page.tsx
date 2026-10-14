import { redirect } from "next/navigation";
import { hanaAppUrl } from "@/lib/hana-app";

/** Pendaftaran siswa dilakukan di sistem, bukan di landing Hana. */
export default function RegisterPage() {
  redirect(`${hanaAppUrl()}/register`);
}
