import Link from "next/link";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

/** URL lama WordPress — tidak lagi dilayani sebagai HTML dump. */
export default async function LegacySlugFallback({ params }: PageProps) {
  const { slug } = await params;
  const path = `/${(slug ?? []).join("/")}`;

  return (
    <div className="fallback-page">
      <h1>Halaman dipindahkan</h1>
      <p>
        Konten lama di <code>{path}</code> sedang diganti ke situs Hana Karya yang baru.
      </p>
      <Link href="/" className="btn btn--primary">
        Kembali ke beranda {site.shortName}
      </Link>
    </div>
  );
}
