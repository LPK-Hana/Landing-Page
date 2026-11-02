import { menu, site, slogan } from "./content";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer>
      <div className="ticker">
        <div className="ticker-track">
          {Array.from({ length: 2 }, (_, copy) => (
            <p key={copy}>
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index}>Build for the Real.</span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <div className="footer-mark">
        <Wordmark height={280} />
      </div>
      <div className="footer-row">
        <a className="footer-brand" href={`${site}/`}>
          MIROOM
        </a>
        <nav>
          {menu.map((item) => (
            <a key={item.en} href={item.href}>
              <span>{item.en}</span>
              <small>{item.ja}</small>
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-meta">
        <p>© Miroom, Inc.</p>
        <a href={`${site}/policy`}>Privacy Policy</a>
      </div>
    </footer>
  );
}

export function Marquee() {
  return (
    <div className="ticker light hana-fasilitas-line">
      <p>{slogan}</p>
    </div>
  );
}
