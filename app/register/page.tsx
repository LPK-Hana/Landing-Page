import { AuthCard } from "@/components/AuthCard";

export const metadata = {
  title: "Daftar",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; info?: string; sent?: string; email?: string }>;
}) {
  const { error, info, sent, email } = await searchParams;
  return (
    <AuthCard
      mode="register"
      error={error}
      info={info}
      sent={sent === "1"}
      email={email}
    />
  );
}
