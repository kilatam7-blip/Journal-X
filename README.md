# Minimalist Adventure Blog Mockup

Website landing page untuk blog petualangan dan travel dengan gaya minimal, elegan, dan modern. Proyek ini dibangun menggunakan React + Vite + TypeScript + Tailwind CSS.

## Fitur

- Layout landing page yang modern dan responsif
- Hero section dengan visual eksplorasi alam
- Kategori perjalanan dan petualangan
- Daftar artikel paling populer
- Section toko/gear recommendations
- Library artikel dan newsletter signup
- Mobile navigation, search modal, cart drawer, dan article reader
- Styling dark premium dengan nuansa outdoor

## Teknologi yang Digunakan

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- clsx dan tailwind-merge

## Struktur Proyek

```bash
.
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── content.ts
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   ├── context/
│   └── utils/
└── README.md
```

## Persiapan

Pastikan Node.js sudah terinstal di komputer Anda.

## Cara Menjalankan

1. Clone atau masuk ke folder proyek
2. Install dependencies:

```bash
npm install
```

3. Jalankan development server:

```bash
npm run dev
```

4. Buka browser pada URL berikut:

```bash
http://localhost:5173/
```

## Build untuk Produksi

Untuk membuat build produksi:

```bash
npm run build
```

Setelah build selesai, hasilnya akan dibuat di folder `dist`.

## Preview Produksi

```bash
npm run preview
```

## Catatan

Proyek ini merupakan mockup UI website blog petualangan dan bersifat tampilan front-end. Jika Anda ingin, project ini bisa dikembangkan lebih lanjut dengan fitur seperti:

- CMS atau content management
- Integrasi backend/API
- Login dan autentikasi
- Checkout dan cart real
- Artikel dinamis dari database

## Lisensi

Proyek ini dibuat untuk kebutuhan mockup/presentasi frontend dan dapat dikembangkan lebih lanjut sesuai kebutuhan.
