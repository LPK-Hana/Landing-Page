import { redirect } from "next/navigation";
import { hanaAppUrl } from "@/lib/hana-app";

/** Pendaftaran siswa dilakukan di aplikasi Raftel, bukan di landing. */
export default function RegisterPage() {
  redirect(`${hanaAppUrl()}/register`);
}
