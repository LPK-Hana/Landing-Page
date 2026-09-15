import fs from "fs";
import path from "path";

export type PageRecord = {
  slug: string[];
  title: string;
  file: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");
const MANIFEST_PATH = path.join(process.cwd(), "content", "manifest.json");

export function listPages(): PageRecord[] {
  if (!fs.existsSync(MANIFEST_PATH)) return [{ slug: [], title: "Beranda", file: "index.html" }];
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as PageRecord[];
}

export function getPage(slug?: string[]) {
  const key = (slug ?? []).join("/");
  const pages = listPages();
  const record = pages.find((page) => page.slug.join("/") === key);
  if (!record) return null;

  const filePath = path.join(CONTENT_DIR, record.file);
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, "utf8");
  return { ...record, html };
}
