import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../content/pages");

function rewrite(html) {
  return html
    .replace(/https:\/\/signup\.minori\.co\.id\/register[^"'\s]*/g, "/register")
    .replace(/https:\/\/signup\.minori\.co\.id\/login[^"'\s]*/g, "/login")
    .replace(/https:\/\/signup\.minori\.co\.id\/?/g, "/login");
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    const original = fs.readFileSync(full, "utf8");
    const next = rewrite(original);
    if (next !== original) {
      fs.writeFileSync(full, next);
      console.log("updated", path.relative(root, full));
    }
  }
}

walk(root);
