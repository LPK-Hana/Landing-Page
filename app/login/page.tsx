import { AuthCard } from "@/components/AuthCard";

export const metadata = {
  title: "Login",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; info?: string }>;
}) {
  const { error, info } = await searchParams;
  return <AuthCard mode="login" error={error} info={info} />;
}
