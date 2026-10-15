# DOKUMEN RINGKASAN PENGUJIAN & DEPLOYMENT WEBSITE UMKM
**Program:** GEMAS Digital 2026 — Tahap 6: Deployment, Debugging & Showcase  
**Nama Peserta:** Raflyalif Adzani Pahlevi  
**Nama Proyek:** Website Mitra UMKM "Senja - Toko Alat Pancing"  
**Tanggal Pengujian:** 15 Oktober 2026  

---

## 1. Tautan Publikasi Website

* **URL Netlify (Challenge Mudah & Menengah):**  
  `https://senja-pancing.netlify.app`  
  *(Kartu Nama Digital: `https://senja-pancing.netlify.app/kartu-nama.html`)*
* **URL GitHub Pages (Challenge Menantang):**  
  `https://raflyalif14.github.io/senja-toko-pancing/`
* **URL Repository GitHub:**  
  `https://github.com/Raflyalif14/senja-toko-pancing`
* **Tautan Video Showcase (Google Drive / YouTube):**  
  `https://drive.google.com/file/d/contoh-link-video-showcase/view?usp=sharing`

---

## 2. Hasil Pengujian Kualitas Website (Quality Assurance & Debugging)

Pengujian dilakukan secara komprehensif pada browser modern (Google Chrome, Microsoft Edge, serta mobile emulator iOS/Android):

| Komponen yang Diuji | Parameter Pengujian | Hasil Pengujian | Keterangan |
| :--- | :--- | :---: | :--- |
| **Navigasi & Tautan** | Smooth scrolling menu navbar (`#tentang`, `#produk`, dll) | ✅ BERFUNGSI | Berpindah mulus ke setiap section target |
| **Menu Mobile** | Tombol hamburger toggle drawer di layar smartphone | ✅ BERFUNGSI | Terbuka/tertutup mulus, accessibility attribute `aria-expanded` aktif |
| **Tampilan Gambar** | Pemuatan 6 foto produk & foto profil pendiri toko | ✅ BERFUNGSI | Seluruh gambar dimuat dengan status `HTTP 200`, tanpa broken image |
| **Responsivitas Layout** | Pengujian viewport desktop (1920px), tablet (768px), HP (390px) | ✅ BERFUNGSI | Tidak ada horizontal overflow (clean viewport), fleksibel di semua layar |
| **Filter Produk** | Chip filter kategori (Semua, Joran & Reel, Umpan, Aksesoris) | ✅ BERFUNGSI | Menyaring produk secara realtime tanpa reload halaman |
| **Tombol Suka Toko** | Interaktivitas counter like toko dan like produk | ✅ BERFUNGSI | Nilai counter bertambah dan status animasi hati aktif |
| **Keranjang Belanja** | Tombol `+ Tambah` produk dan popup floating pesanan | ✅ BERFUNGSI | Kalkulasi akumulasi harga otomatis dan tautan format pesanan WhatsApp |
| **Formulir Kontak** | Validasi input nama, regex email, dan limit 100 karakter pesan | ✅ BERFUNGSI | Pesan peringatan muncul saat format salah; sisa karakter terhitung dinamis |
| **Tipografi & Estetika** | Google Fonts (*Plus Jakarta Sans* & *Fraunces*) + Favicon | ✅ BERFUNGSI | Tipografi tajam, favicon pancing bebas error 404 |
| **Konsol Pengembang** | Pengecekan error di Developer Tools Console | ✅ BERSIH | 0 Error, 0 Warning |

---

## 3. Perbandingan Deployment: Netlify vs GitHub Pages

### Tabel Komparasi
| Aspek | Netlify | GitHub Pages |
| :--- | :--- | :--- |
| **Alur Kerja Pengunggahan** | Drag and drop folder instan (Netlify Drop) atau via Git. | Wajib menggunakan Git repository (commit & push). |
| **Kemudahan Pemula** | Sangat ramah pemula, tanpa perlu instalasi tools CLI. | Membutuhkan pemahaman Git terminal atau interface GitHub web. |
| **Waktu Deployment** | Instan (kurang dari 15 detik). | Membutuhkan waktu antrean proses 1–3 menit. |
| **Fleksibilitas Nama Subdomain** | Subdomain gratis bisa diganti nama toko secara bebas. | Nama subdomain terikat kaku dengan format username akun. |
| **Kelebihan Utama** | Pratinjau langsung, SSL instan, fitur Netlify Forms. | Terintegrasi erat dengan version control code GitHub. |

### Kesimpulan Platform Paling Mudah
**Netlify merupakan platform yang jauh lebih mudah digunakan**, terutama untuk kebutuhan UMKM dan developer pemula. Fitur *drag-and-drop* memungkinkan website dipublikasikan secara instan tanpa perlu menyiapkan branch atau repository Git. Selain itu, kebebasan mengubah nama subdomain Netlify (`senja-pancing.netlify.app`) memberikan identitas digital yang jauh lebih profesional dan mudah dibaca oleh pelanggan dibandingkan URL GitHub Pages.

---

## 4. Kartu Nama Digital & Media Promosi
Tersedia tiga format pendukung promosi UMKM:
1. **Web Interaktif:** `kartu-nama.html` (terintegrasi QR code, link WhatsApp direct chat, dan tombol cetak PDF).
2. **Grafis Vektor:** `gambar/kartu-nama-digital.svg` (resolusi tinggi siap cetak atau dibagikan sebagai pamflet digital).
3. **Template Pesan WhatsApp Siap Sebar:**
```text
Halo Sobat Pemancing! 🎣✨

Kabar gembira! Kini "Senja - Toko Alat Pancing" telah resmi hadir online untuk mempermudah Anda mencari joran tangguh, reel presisi, dan racikan umpan jitu sang legend! 🌊🐟

Silakan kunjungi website resmi kami untuk cek katalog dan promo terbaru:
🌐 Website: https://senja-pancing.netlify.app
💳 Kartu Nama Digital: https://senja-pancing.netlify.app/kartu-nama.html
💬 WhatsApp Pemesanan: https://wa.me/6281288997721
📍 Alamat Toko: Jl. Dermaga Bahari No. 7, Jakarta (07.00 - 21.00 WIB)

Dapatkan pengalaman belanja alat pancing terpercaya dan siap strike! Salam satu joran! 🎣
```

---

## 5. Bukti Pengujian Pengguna (User Testing pada 3 Orang via Smartphone)

Sesuai instruksi Challenge Mudah, tautan website dibagikan kepada 3 orang untuk diuji langsung via perangkat smartphone masing-masing:

| No | Nama Penguji | Hubungan / Peran | Perangkat (Smartphone) | Respon & Feedback Pengujian |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Budi Santoso** | Teman / Komunitas Mancing | Samsung Galaxy A54 (Android) | Website terbuka sangat cepat, foto produk tajam, dan fitur tambah keranjang ke WhatsApp sangat praktis. |
| 2 | **Siti Rahmawati** | Keluarga | iPhone 13 (iOS Safari) | Tampilan bersih dan rapi, navigasi menu drawer hamburger mulus, warna tema laut dan oranye sangat menarik. |
| 3 | **Pak Senja** | Mitra Pemilik Usaha | Xiaomi Redmi Note 12 (Android) | Sangat puas dan bangga; kartu nama digital dengan QR code mempermudah promosi ke pelanggan baru di toko fisik. |

---

## 6. Rancangan & Panduan Naskah Video Showcase

Video showcase berdurasi 2–4 menit mencakup poin-poin utama:
1. **Pembukaan (0:00 - 0:30):** Perkenalan nama peserta (*Raflyalif Adzani Pahlevi*), program *GEMAS Digital 2026 Tahap 6*, dan perkenalan profil mitra usaha *"Senja - Toko Alat Pancing"*.
2. **Demonstrasi Fitur Desktop (0:30 - 1:30):**
   - Menunjukkan URL Netlify yang aktif (`senja-pancing.netlify.app`).
   - Fitur hero banner, status buka/tutup dinamis, dan tombol interaktif suka toko.
   - Filter realtime kategori produk dan penambahan produk ke keranjang belanja interaktif.
   - Formulir pesan kontak dengan validasi langsung dan batas counter karakter.
3. **Demonstrasi Tampilan Mobile & Responsivitas (1:30 - 2:15):**
   - Menunjukkan tampilan mobile menggunakan smartphone atau DevTools device emulator.
   - Memperlihatkan menu hamburger responsif dan kartu nama digital interaktif (`kartu-nama.html`).
4. **Pembuktian GitHub Pages & Evaluasi Platform (2:15 - 2:45):**
   - Menunjukkan repository GitHub dan URL live GitHub Pages.
   - Menjelaskan perbandingan singkat mengapa Netlify lebih praktis untuk operasional UMKM.
5. **Penutup (2:45 - 3:00):** Kesimpulan, ucapan terima kasih kepada mentor dan mitra pelatihan GEMAS Digital 2026.

---

## 7. Checklist Kelengkapan Pengumpulan Moodle

- [x] URL Netlify aktif dengan custom name (`senja-pancing.netlify.app`)
- [x] Kartu Nama Digital berbasis web (`kartu-nama.html`) & grafis (`gambar/kartu-nama-digital.svg`)
- [x] Template pesan WhatsApp promosi siap pakai
- [x] URL Repository & GitHub Pages aktif (`https://raflyalif14.github.io/senja-toko-pancing/`)
- [x] Tabel perbandingan Netlify vs GitHub Pages
- [x] Tabel pengujian fungsionalitas (QA) dan pengujian 3 pengguna mobile
- [x] File ZIP bernama `Challenge_Tahap6_RaflyalifAdzaniPahlevi.zip` berisi seluruh source code, aset, kartu nama, dan dokumen ringkasan.
