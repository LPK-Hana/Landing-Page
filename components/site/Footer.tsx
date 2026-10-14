import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer" id="kontak">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Image
            src={site.media.logoEmblem}
            alt={site.name}
            width={96}
            height={96}
            className="site-footer__emblem"
          />
          <div>
            <p className="site-footer__name">{site.name}</p>
            <p className="site-footer__tagline">{site.tagline}</p>
            <p className="site-footer__jp">{site.sloganJp}</p>
          </div>
        </div>

        <div className="site-footer__cols">
          <div>
            <h3>Navigasi</h3>
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Kontak</h3>
            <ul>
              <li>
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Nilai kami</h3>
            <p className="site-footer__values">{site.values.join(" · ")}</p>
          </div>
        </div>

        <div className="site-footer__map">
          <div>
            <h3>Lokasi</h3>
            <p>{site.maps.name}</p>
            <a href={site.maps.url} target="_blank" rel="noopener noreferrer">
              Buka di Google Maps
            </a>
          </div>
          <iframe
            title={`Peta ${site.maps.name}`}
            src={`https://maps.google.com/maps?q=${site.maps.lat},${site.maps.lng}&z=16&hl=id&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="site-footer__bar">
        <p>© {new Date().getFullYear()} {site.shortName}. All rights reserved.</p>
        <a href={site.cta.masuk()}>Portal Siswa</a>
      </div>
    </footer>
  );
}
