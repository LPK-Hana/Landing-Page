import { redirect } from "next/navigation";
import { hanaAppUrl } from "@/lib/hana-app";

/** Login siswa dilakukan di sistem, bukan di landing Hana. */
export default function LoginPage() {
  redirect(`${hanaAppUrl()}/`);
}
