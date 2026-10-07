# Design system — LPK Hana Karya

## Prinsip
- Elegan, tenang, mirip pengalaman antarmuka Apple (iPhone / macOS).
- Brand Hana Karya (navy + merah) tetap kuat; tipografi dan ruang putih mengikuti bahasa visual Apple.
- Media brand disimpan di `public/media/` (ikut Git). Sumber mentah lokal: `zz/bahan-pilih/` (tidak di-push).

## Font (wajib)

Selalu memakai keluarga font Apple. Jangan ganti ke Inter, Roboto, Manrope, Fraunces, atau Google Fonts lain untuk UI utama.

### Detail Font Apple
- **San Francisco (SF Pro)** — font sans-serif utama untuk antarmuka sistem (UI, body, tombol, navigasi).
- **SF Compact** — khusus konteks padat / layar kecil (mirip Apple Watch); boleh dipakai pada label kecil, chip, atau meta teks sempit.
- **New York** — font serif padanan San Francisco untuk teks bergaya buku (headline display, kutipan, tagline seremonial).

### Stack CSS (web)
Apple tidak mendistribusikan file font SF/New York untuk web umum; di perangkat Apple browser memakai font sistem. Stack di bawah mengarahkan ke SF / New York di Apple, dengan fallback bersih di OS lain:

```css
/* UI / body — SF Pro */
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
  "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Compact — label kecil */
--font-compact: "SF Compact Text", "SF Compact Display", var(--font-sans);

/* Display serif — New York */
--font-serif: "New York", "Iowan Old Style", "Apple Garamond", Baskerville,
  "Times New Roman", serif;

/* Jepang */
--font-jp: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "SF Pro JP",
  "Noto Sans JP", sans-serif;
```

### Pemakaian
| Peran | Font |
|--------|------|
| Navigasi, body, tombol, form | SF Pro (`--font-sans`) |
| Meta / caption padat | SF Compact (`--font-compact`) |
| Headline hero & judul section | New York (`--font-serif`) atau SF Pro Display untuk nada lebih UI |
| Slogan Jepang | `--font-jp` |

## Warna brand
- Navy: `#0B1F4A`
- Merah aksen: `#C8102E`
- Latar: putih / `#F5F5F7` (abu Apple)
- Teks sekunder: `#6E6E73`

## Media
Salin/pindahkan aset dari `zz/bahan-pilih/` ke `public/media/` sebelum commit, karena folder `zz/` tidak masuk GitHub.
