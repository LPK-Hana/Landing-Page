import { notFound } from "next/navigation";
import { LegacyFrame } from "@/components/LegacyFrame";
import { getPage, listPages } from "@/lib/pages";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return listPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return { title: page.title };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();
  return <LegacyFrame html={page.html} title={page.title} />;
}
