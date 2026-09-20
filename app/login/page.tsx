import { redirect } from "next/navigation";
import { hanaAppUrl } from "@/lib/hana-app";

/** Login siswa dilakukan di aplikasi Raftel, bukan di landing. */
export default function LoginPage() {
  redirect(`${hanaAppUrl()}/`);
}
