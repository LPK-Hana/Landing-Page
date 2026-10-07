# Media master untuk landing

Aset brand **harus** ada di `public/media/` agar URL `/media/...` terlayani Next dan ikut ter-push ke GitHub.

Sumber lokal (tidak di-push): `zz/bahan-pilih/` di monorepo Raftel.

```powershell
Copy-Item zz\bahan-pilih\Logo-Hana-Karya-Nihongo-Gakkou-Banner-top.png landing-page-Hana\public\media\logo-banner-top.png
Copy-Item zz\bahan-pilih\Logo-Hana-Karya-Career-Center.png landing-page-Hana\public\media\logo-emblem.png
Copy-Item zz\bahan-pilih\RB-Logo-Hana-Karya-Career-Center-Emblem.png landing-page-Hana\public\media\logo-emblem-rb.png
Copy-Item zz\bahan-pilih\background-web-1.jpg landing-page-Hana\public\media\background-web-1.jpg
Copy-Item zz\bahan-pilih\siswa-ke-jepang.png landing-page-Hana\public\media\siswa-ke-jepang.png
```

Lihat juga `design.md` untuk aturan font Apple.
