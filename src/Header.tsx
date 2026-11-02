import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { menu } from "./content";

export function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!lenis || !open) return;
    lenis.stop();
    return () => lenis.start();
  }, [lenis, open]);

  return (
    <>
      <header className="site-header">
        <a href="https://about.miroom.com/" className={`brand ${open ? "brand-solid" : ""}`}>
          MIROOM
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={open ? "burger open" : "burger"} />
        </button>
      </header>
      <div className={open ? "menu open" : "menu"}>
        <nav>
          {menu.map((item) => (
            <a key={item.en} href={item.href}>
              <span>{item.en}</span>
              <small>{item.ja}</small>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
