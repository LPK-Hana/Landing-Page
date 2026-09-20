export function hanaAppUrl(): string {
  return (process.env.NEXT_PUBLIC_HANA_APP_URL || "http://localhost:3000").replace(/\/$/, "");
}
