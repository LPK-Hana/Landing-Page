import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.resolve(ROOT, "../landingpage-example/minori_copy/minori.co.id");
const PUBLIC_DIR = path.join(ROOT, "public");
const CONTENT_DIR = path.join(ROOT, "content", "pages");

const SKIP_DIRS = new Set([
  "wp-content",
  "wp-includes",
  "wp-json",
  "cdn-cgi",
  "comments",
  "feed",
  "hts-cache",
]);

const NAV_SCRIPT = `
<script>
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;
    if (/^https?:\\/\\//i.test(href) && href.indexOf(location.host) === -1) return;
    if (href.indexOf("/wp-content/") === 0 || href.indexOf("/wp-includes/") === 0) return;
    e.preventDefault();
    var url = href;
    if (/^https?:\\/\\//i.test(href)) {
      try { url = new URL(href).pathname + new URL(href).search + new URL(href).hash; } catch (err) {}
    }
    window.top.location.assign(url);
  }, true);
})();
</script>
`;

function decodeCfEmail(encoded) {
  const key = parseInt(encoded.slice(0, 2), 16);
  let email = "";
  for (let i = 2; i < encoded.length; i += 2) {
    email += String.fromCharCode(parseInt(encoded.slice(i, i + 2), 16) ^ key);
  }
  return email;
}

function walkIndexHtml(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walkIndexHtml(full, acc);
    } else if (entry.name === "index.html") {
      acc.push(full);
    }
  }
  return acc;
}

function copyAssets(from, to) {
  fs.cpSync(from, to, {
    recursive: true,
    filter: (source) => {
      const stat = fs.statSync(source);
      if (stat.isDirectory()) return true;
      return !source.toLowerCase().endsWith(".html");
    },
  });
}

function rewriteHtml(html, currentSlug) {
  html = html.replace(/<!-- Mirrored from[\s\S]*?-->/g, "");
  html = html.replace(/<!-- Added by HTTrack[\s\S]*?<!-- \/Added by HTTrack -->/g, "");
  html = html.replace(/<script data-cfasync="false" src="[^"]*email-decode[^"]*"><\/script>/g, "");
  html = html.replace(/<script>\(function\(\)\{function c\(\)\{[\s\S]*?<\/script>/g, "");
  html = html.replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon[\s\S]*?<\/script>/g, "");

  html = html.replace(
    /<a[^>]*class="__cf_email__"[^>]*data-cfemail="([a-f0-9]+)"[^>]*>[\s\S]*?<\/a>/gi,
    (_, hex) => {
      const email = decodeCfEmail(hex);
      return `<a href="mailto:${email}">${email}</a>`;
    },
  );

  html = html.replace(/https?:\/\/minori\.co\.id\//g, "/");
  html = html.replace(/http:\/\/https:\/\/minori\.co\.id\//g, "/");
  html = html.replace(/https?:\/\/minori\.co\.id/g, "");
  html = html.replace(/(^|["'\s(,])(?:(?:\.\.\/)+)?wp-content\//g, "$1/wp-content/");
  html = html.replace(/(^|["'\s(,])(?:(?:\.\.\/)+)?wp-includes\//g, "$1/wp-includes/");
  html = html.replace(/\/\/wp-content\//g, "/wp-content/");
  html = html.replace(/\/\/wp-includes\//g, "/wp-includes/");

  html = html.replace(/\s(href|src|action)=["']([^"']+)["']/gi, (match, attr, value) => {
    const next = rewriteHref(value, currentSlug);
    return ` ${attr}="${next}"`;
  });

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${NAV_SCRIPT}</body>`);
  } else {
    html += NAV_SCRIPT;
  }

  return html;
}

function rewriteHref(value, currentSlug) {
  if (
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("#") ||
    value.startsWith("data:") ||
    value.startsWith("javascript:")
  ) {
    return value;
  }

  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return value;
  if (value.startsWith("/wp-content/") || value.startsWith("/wp-includes/")) return value;

  const hashIndex = value.indexOf("#");
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
  let pathname = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  pathname = pathname.split("?")[0];

  if (!pathname || pathname === "/") return `/${hash}`;

  if (pathname.startsWith("/")) {
    pathname = pathname.replace(/\/index\.html$/, "").replace(/\.html$/, "");
    return `${pathname || "/"}${hash}`;
  }

  const base = currentSlug ? currentSlug.split("/") : [];
  const parts = [...base];
  const segments = pathname.split("/");
  for (const segment of segments) {
    if (!segment || segment === ".") continue;
    if (segment === "..") {
      parts.pop();
      continue;
    }
    parts.push(segment);
  }

  let joined = parts.join("/");
  joined = joined.replace(/\/index\.html$/, "").replace(/index\.html$/, "");
  if (joined.endsWith(".html")) joined = joined.slice(0, -5);
  joined = joined.replace(/\/+$/, "");
  return `/${joined}${hash}`;
}

function titleOf(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : "minori.co.id";
}

function relativeSlug(filePath) {
  const rel = path.relative(SOURCE, path.dirname(filePath)).replace(/\\/g, "/");
  return rel === "." ? "" : rel;
}

if (!fs.existsSync(SOURCE)) {
  console.error("Source not found:", SOURCE);
  process.exit(1);
}

fs.rmSync(path.join(PUBLIC_DIR, "wp-content"), { recursive: true, force: true });
fs.rmSync(path.join(PUBLIC_DIR, "wp-includes"), { recursive: true, force: true });
fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.mkdirSync(CONTENT_DIR, { recursive: true });

console.log("Copying wp-content...");
copyAssets(path.join(SOURCE, "wp-content"), path.join(PUBLIC_DIR, "wp-content"));
console.log("Copying wp-includes...");
copyAssets(path.join(SOURCE, "wp-includes"), path.join(PUBLIC_DIR, "wp-includes"));

const faviconSrc = path.join(SOURCE, "wp-content/uploads/2024/12/Desain-tanpa-judul-19.png");
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, path.join(PUBLIC_DIR, "favicon.png"));
}

const files = walkIndexHtml(SOURCE);
const manifest = [];

for (const file of files) {
  const slug = relativeSlug(file);
  const html = rewriteHtml(fs.readFileSync(file, "utf8"), slug);
  const outRel = slug ? path.join(slug, "index.html") : "index.html";
  const outPath = path.join(CONTENT_DIR, outRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
  manifest.push({
    slug: slug ? slug.split("/") : [],
    title: titleOf(html),
    file: outRel.replace(/\\/g, "/"),
  });
  console.log("page", slug || "/");
}

fs.writeFileSync(
  path.join(ROOT, "content", "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(`Done. ${manifest.length} pages, assets in public/.`);
