// ==========================================================
// WEBSITE UMKM - script.js
//
// Yang WAJIB diubah hanya TODO 8 di bawah ini.
// Kalau sudah selesai, coba 3 tantangan: cari tulisan "TANTANGAN".
// ==========================================================

// ✏️ TODO 8: Ganti 4 pengaturan di bawah ini. Hanya bagian ini yang perlu diubah!
const NAMA_USAHA = "Senja";
const NOMOR_WA = "6281288997721";   // awali dengan 62, tanpa tanda + dan tanpa angka 0 di depan
const JAM_BUKA = 7;               // jam buka (0 - 23)
const JAM_TUTUP = 21;             // jam tutup (0 - 23)

// ----------------------------------------------------------
// Kode di bawah ini sudah jadi. Boleh dibaca dan dipelajari :)
// ----------------------------------------------------------

// Tanda untuk CSS bahwa JavaScript berjalan (dipakai animasi scroll)
document.documentElement.classList.add("js");

function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function tulisJam(jam) {
    return String(jam).padStart(2, "0") + ".00";
}

function linkWhatsApp(pesan) {
    return "https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(pesan);
}


// ===== 1. Status buka / tutup =====
const statusBuka = document.querySelector("#status-buka");
const jamSekarang = new Date().getHours();

if (jamSekarang >= JAM_BUKA && jamSekarang < JAM_TUTUP) {
    statusBuka.textContent = "Sedang buka · tutup pukul " + tulisJam(JAM_TUTUP);
    statusBuka.classList.add("buka");
} else {
    statusBuka.textContent = "Sedang tutup · buka pukul " + tulisJam(JAM_BUKA);
    statusBuka.classList.add("tutup");
}

// 🚀 TANTANGAN JS 2 (sedang): Salam sesuai waktu.
// Sekarang salamnya hanya berubah di pagi hari (sebelum jam 11).
// Lanjutkan dengan "else if" supaya ada juga:
//   - "Selamat siang!"  untuk jam 11 sampai 14
//   - "Selamat sore!"   untuk jam 15 sampai 17
//   - "Selamat malam!"  untuk jam 18 ke atas
// Petunjuk: contoh "else if" sudah pernah kamu pakai di Tahap 4.
let salam = "Halo, selamat datang!";

if (jamSekarang < 11) {
    salam = "Selamat pagi!";
} else if (jamSekarang <= 14) {
    salam = "Selamat siang!";
} else if (jamSekarang <= 17) {
    salam = "Selamat sore!";
} else {
    salam = "Selamat malam!";
}

document.querySelector("#salam").textContent = salam;


// ===== 2. Semua tombol WhatsApp memakai nomor dari pengaturan =====
const semuaLinkWa = document.querySelectorAll(".link-wa");

// 🚀 TANTANGAN JS 1 (mudah): Ganti kalimat di dalam tanda kutip dengan kalimatmu sendiri.
// Cara mengecek: tekan tombol "Chat WhatsApp" di halaman, lalu lihat isi chat-nya.
const KALIMAT_PEMBUKA = "saya mau tanya-tanya seputar produk yang tersedia.";

semuaLinkWa.forEach(function(link) {
    link.href = linkWhatsApp("Halo " + NAMA_USAHA + ", " + KALIMAT_PEMBUKA);
});


// ===== 3. Teks berjalan digandakan supaya tidak pernah putus =====
const isiBerjalan = document.querySelector("#teks-berjalan-isi");
const teksBerjalan = isiBerjalan.querySelector("span");

for (let i = 0; i < 7; i++) {
    const salinan = teksBerjalan.cloneNode(true);
    salinan.setAttribute("aria-hidden", "true");
    isiBerjalan.appendChild(salinan);
}


// ===== 4. Menu navigasi di HP (Challenge Menantang) =====
const tombolNav = document.querySelector("#tombol-nav");
const navLinks = document.querySelector("#nav-links");

tombolNav.addEventListener("click", function() {
    const terbuka = navLinks.classList.toggle("terbuka");
    tombolNav.classList.toggle("aktif", terbuka);
    tombolNav.setAttribute("aria-expanded", String(terbuka));
});

// Menutup menu saat salah satu tautan diklik
navLinks.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("terbuka");
        tombolNav.classList.remove("aktif");
        tombolNav.setAttribute("aria-expanded", "false");
    });
});

// Menutup menu saat pengguna mengklik di luar area navigasi
document.addEventListener("click", function(e) {
    if (!tombolNav.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("terbuka")) {
        navLinks.classList.remove("terbuka");
        tombolNav.classList.remove("aktif");
        tombolNav.setAttribute("aria-expanded", "false");
    }
});


// ===== 5. Filter produk =====
const semuaChip = document.querySelectorAll(".chip");
const semuaKartu = document.querySelectorAll(".kartu-produk");

semuaChip.forEach(function(chip) {
    chip.addEventListener("click", function() {
        const pilihan = chip.dataset.filter;

        semuaChip.forEach(function(chipLain) {
            chipLain.classList.remove("aktif");
        });
        chip.classList.add("aktif");

        semuaKartu.forEach(function(kartu) {
            if (pilihan === "semua" || kartu.dataset.kategori === pilihan) {
                kartu.classList.remove("sembunyi");
            } else {
                kartu.classList.add("sembunyi");
            }
        });
    });
});


// ===== 6. Keranjang pesanan + kirim ke WhatsApp =====
const pesanan = new Map();          // nama produk -> { harga, jumlah }
const tombolPerMenu = new Map();    // nama produk -> tombol "+ Tambah" miliknya

const kotakPesanan = document.querySelector("#pesanan");
const panelPesanan = document.querySelector("#pesanan-panel");
const daftarPesanan = document.querySelector("#pesanan-daftar");
const tombolRingkas = document.querySelector("#pesanan-ringkas");
const teksJumlah = document.querySelector("#pesanan-jumlah");
const teksTotal = document.querySelector("#pesanan-total");
const tombolKirim = document.querySelector("#pesanan-kirim");
const catatanPesanan = document.querySelector("#pesanan-catatan");
const tombolAtas = document.querySelector("#tombol-atas");

semuaKartu.forEach(function(kartu) {
    const nama = kartu.querySelector("h3").textContent.trim();
    const harga = Number(kartu.dataset.harga) || 0;
    const tombol = kartu.querySelector(".tombol-tambah");

    // Harga di kartu ditulis otomatis dari data-harga
    kartu.querySelector(".harga").textContent = formatRupiah(harga);
    tombolPerMenu.set(nama, tombol);

    tombol.addEventListener("click", function() {
        ubahPesanan(nama, harga, 1);
        tombol.classList.add("goyang");
    });
    tombol.addEventListener("animationend", function() {
        tombol.classList.remove("goyang");
    });
});

function ubahPesanan(nama, harga, selisih) {
    let item = pesanan.get(nama);

    if (!item) {
        item = { harga: harga, jumlah: 0 };
        pesanan.set(nama, item);
    }
    item.jumlah = item.jumlah + selisih;

    if (item.jumlah <= 0) {
        pesanan.delete(nama);
    }
    tampilkanPesanan();
}

function buatTombolJumlah(teks, label, nama, harga, selisih) {
    const tombol = document.createElement("button");
    tombol.textContent = teks;
    tombol.setAttribute("aria-label", label + " " + nama);
    tombol.addEventListener("click", function() {
        ubahPesanan(nama, harga, selisih);
    });
    return tombol;
}

// 🚀 TANTANGAN JS 3 (sedang): Catatan di keranjang pesanan.
// Sekarang catatan hanya muncul kalau pesanan 5 item atau lebih.
// Tambahkan satu "if" lagi di tempat yang ditandai, supaya kalau pesanan
// 3 item atau lebih muncul kalimat lain, misalnya "Tambah 2 lagi, yuk!".
// Cara mengecek: tekan "+ Tambah" beberapa kali, lalu lihat bagian atas keranjang.
function buatCatatan(totalItem) {
    if (totalItem >= 5) {
        return "Wah, borong nih! Terima kasih banyak.";
    }

    // (tulis "if" barumu di sini)
    if (totalItem >= 3) {
        return "Tambah 2 lagi, yuk!";
    }

    return "";
}

function tampilkanPesanan() {
    let totalItem = 0;
    let totalHarga = 0;
    let pesan = "Halo " + NAMA_USAHA + ", saya mau pesan:\n";

    daftarPesanan.textContent = "";

    pesanan.forEach(function(item, nama) {
        const subtotal = item.harga * item.jumlah;
        totalItem = totalItem + item.jumlah;
        totalHarga = totalHarga + subtotal;
        pesan = pesan + "- " + item.jumlah + "x " + nama + " (" + formatRupiah(subtotal) + ")\n";

        // Satu baris di daftar pesanan
        const baris = document.createElement("li");
        const teks = document.createElement("div");
        const keterangan = document.createElement("small");
        const jumlah = document.createElement("div");
        const angka = document.createElement("span");

        teks.textContent = nama;
        keterangan.textContent = formatRupiah(subtotal);
        teks.appendChild(keterangan);

        jumlah.className = "jumlah";
        angka.textContent = item.jumlah;
        jumlah.appendChild(buatTombolJumlah("−", "Kurangi", nama, item.harga, -1));
        jumlah.appendChild(angka);
        jumlah.appendChild(buatTombolJumlah("+", "Tambah", nama, item.harga, 1));

        baris.appendChild(teks);
        baris.appendChild(jumlah);
        daftarPesanan.appendChild(baris);
    });

    pesan = pesan + "\nTotal: " + formatRupiah(totalHarga) + "\nTerima kasih!";

    teksJumlah.textContent = totalItem + " item · lihat pesanan";
    teksTotal.textContent = formatRupiah(totalHarga);
    tombolKirim.href = linkWhatsApp(pesan);
    catatanPesanan.textContent = buatCatatan(totalItem);

    // Tulisan tombol di kartu ikut berubah
    tombolPerMenu.forEach(function(tombol, nama) {
        const item = pesanan.get(nama);
        if (item) {
            tombol.textContent = "+ Tambah (" + item.jumlah + ")";
            tombol.classList.add("dipilih");
        } else {
            tombol.textContent = "+ Tambah";
            tombol.classList.remove("dipilih");
        }
    });

    // Keranjang hanya tampil kalau ada isinya
    if (totalItem === 0) {
        kotakPesanan.hidden = true;
        panelPesanan.hidden = true;
        tombolRingkas.setAttribute("aria-expanded", "false");
        tombolAtas.classList.remove("naik");
    } else {
        kotakPesanan.hidden = false;
        tombolAtas.classList.add("naik");
    }
}

tombolRingkas.addEventListener("click", function() {
    panelPesanan.hidden = !panelPesanan.hidden;
    tombolRingkas.setAttribute("aria-expanded", !panelPesanan.hidden);
});


// ===== 7. Animasi saat di-scroll + angka berhitung =====
const semuaAnimasi = document.querySelectorAll(".animasi");
const semuaAngka = document.querySelectorAll(".angka");
const tanpaAnimasi = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hitungNaik(elemen) {
    const tujuan = Number(elemen.textContent);
    const lama = 1400;
    let mulai = 0;

    if (!tujuan || tanpaAnimasi) {
        return;
    }

    function langkah(waktu) {
        if (mulai === 0) {
            mulai = waktu;
        }
        const kemajuan = Math.min((waktu - mulai) / lama, 1);
        elemen.textContent = Math.round(tujuan * kemajuan);

        if (kemajuan < 1) {
            requestAnimationFrame(langkah);
        }
    }
    elemen.textContent = "0";
    requestAnimationFrame(langkah);
}

if ("IntersectionObserver" in window) {
    const pengamat = new IntersectionObserver(function(daftar) {
        daftar.forEach(function(yangTerlihat) {
            if (!yangTerlihat.isIntersecting) {
                return;
            }
            const elemen = yangTerlihat.target;

            if (elemen.classList.contains("angka")) {
                hitungNaik(elemen);
            } else {
                elemen.classList.add("muncul");
            }
            pengamat.unobserve(elemen);
        });
    }, { threshold: 0.08 });

    semuaAnimasi.forEach(function(elemen) {
        pengamat.observe(elemen);
    });
    semuaAngka.forEach(function(elemen) {
        pengamat.observe(elemen);
    });
} else {
    semuaAnimasi.forEach(function(elemen) {
        elemen.classList.add("muncul");
    });
}


// ===== 8. Tombol kembali ke atas + tahun di footer =====
window.addEventListener("scroll", function() {
    if (window.scrollY > 600) {
        tombolAtas.classList.add("tampil");
    } else {
        tombolAtas.classList.remove("tampil");
    }
});

tombolAtas.addEventListener("click", function() {
    window.scrollTo({ top: 0 });
});

document.querySelector("#tahun").textContent = new Date().getFullYear();


// ==========================================================
// 🌟 CHALLENGE MUDAH: INTERAKSI & TEMA TOMBOL SUKA (LIKE BUTTON)
// Fitur:
// 1. Mengubah tema tombol suka (Sunset Senja, Crimson Love, Ocean Wave)
// 2. Tombol suka berfungsi ketika diklik: toggle status, counter angka bertambah/berkurang,
//    animasi detak hati, dan perubahan teks (Suka <-> Disukai)
// ==========================================================

const semuaTombolSuka = document.querySelectorAll(".tombol-suka");
const semuaChipTema = document.querySelectorAll(".chip-tema");

// Inisialisasi tema tombol suka dari localStorage (jika tersimpan)
const temaTersimpan = localStorage.getItem("tema_tombol_suka") || "sunset";
document.body.setAttribute("data-tema-suka", temaTersimpan);

semuaChipTema.forEach(function(chip) {
    if (chip.dataset.tema === temaTersimpan) {
        chip.classList.add("aktif");
    } else {
        chip.classList.remove("aktif");
    }

    chip.addEventListener("click", function() {
        const temaPilihan = chip.dataset.tema;

        // Ubah tema tampilan seluruh tombol suka
        document.body.setAttribute("data-tema-suka", temaPilihan);
        localStorage.setItem("tema_tombol_suka", temaPilihan);

        // Update indikator aktif pada tombol pilihan tema
        semuaChipTema.forEach(function(c) { c.classList.remove("aktif"); });
        chip.classList.add("aktif");
    });
});

// Logika fungsi klik pada tombol suka
semuaTombolSuka.forEach(function(tombol, index) {
    const teksSuka = tombol.querySelector(".teks-suka");
    const ikonHati = tombol.querySelector(".ikon-hati");
    const jumlahSuka = tombol.querySelector(".jumlah-suka");
    const idSuka = "suka_item_" + index;

    // Ambil status tersimpan jika pernah disukai sebelumnya
    const statusTersimpan = localStorage.getItem(idSuka);
    let hitungan = Number(tombol.dataset.count) || Number(jumlahSuka.textContent) || 0;

    if (statusTersimpan === "true") {
        tombol.classList.add("liked");
        tombol.dataset.liked = "true";
        if (ikonHati) ikonHati.textContent = "❤️";
        if (teksSuka) teksSuka.textContent = tombol.classList.contains("tombol-suka-toko") ? "Telah Disukai" : "Disukai";
        hitungan += 1;
        if (jumlahSuka) jumlahSuka.textContent = hitungan;
    }

    tombol.addEventListener("click", function() {
        const isLiked = tombol.classList.contains("liked");

        if (!isLiked) {
            // Status: Disukai (Like)
            tombol.classList.add("liked");
            tombol.dataset.liked = "true";
            if (ikonHati) ikonHati.textContent = "❤️";
            if (teksSuka) teksSuka.textContent = tombol.classList.contains("tombol-suka-toko") ? "Telah Disukai" : "Disukai";
            hitungan += 1;
            if (jumlahSuka) jumlahSuka.textContent = hitungan;

            // Animasi detak hati
            tombol.classList.add("animasi-detak");
            setTimeout(function() {
                tombol.classList.remove("animasi-detak");
            }, 500);

            localStorage.setItem(idSuka, "true");
        } else {
            // Status: Batal Suka (Unlike)
            tombol.classList.remove("liked");
            tombol.dataset.liked = "false";
            if (ikonHati) ikonHati.textContent = "🤍";
            if (teksSuka) teksSuka.textContent = tombol.classList.contains("tombol-suka-toko") ? "Sukai Toko" : "Suka";
            hitungan = Math.max(0, hitungan - 1);
            if (jumlahSuka) jumlahSuka.textContent = hitungan;

            localStorage.setItem(idSuka, "false");
        }
    });
});


// ==========================================================
// 🚀 CHALLENGE MENENGAH: BATAS MAKSIMAL 100 KARAKTER PADA KOLOM PESAN
// Fitur:
// 1. Kolom pesan dibatasi maksimal 100 karakter (HTML maxlength & JavaScript input intercept)
// 2. Teks dipotong otomatis jika melebihi 100 karakter (termasuk saat paste)
// 3. Counter jumlah karakter dinamis (0/100) dan sisa karakter
// 4. Peringatan visual saat mendekati batas (>=80) dan saat mencapai batas (100)
// ==========================================================

const pesanInput = document.querySelector("#kontak-pesan");
const jumlahKarakterEl = document.querySelector("#jumlah-karakter");
const sisaKarakterEl = document.querySelector("#sisa-karakter");
const counterKarakterEl = document.querySelector("#counter-karakter");
const peringatanPesanEl = document.querySelector("#peringatan-pesan");
const errorPesanEl = document.querySelector("#error-pesan");
const BATAS_MAKSIMAL_PESAN = 100;

function perbaruiPenghitungPesan() {
    if (!pesanInput) return;

    // Pastikan pengguna tidak dapat memasukkan pesan melebihi batas 100 karakter
    if (pesanInput.value.length > BATAS_MAKSIMAL_PESAN) {
        pesanInput.value = pesanInput.value.slice(0, BATAS_MAKSIMAL_PESAN);
    }

    const jumlahSekarang = pesanInput.value.length;
    const sisa = BATAS_MAKSIMAL_PESAN - jumlahSekarang;

    // Tampilkan jumlah karakter saat ini
    if (jumlahKarakterEl) jumlahKarakterEl.textContent = jumlahSekarang;
    if (sisaKarakterEl) sisaKarakterEl.textContent = "Sisa " + sisa + " karakter";

    // Indikator gaya visual
    if (jumlahSekarang >= BATAS_MAKSIMAL_PESAN) {
        counterKarakterEl.classList.add("batas-maksimal");
        counterKarakterEl.classList.remove("mendekati-batas");
        peringatanPesanEl.textContent = "⚠️ Batas 100 karakter tercapai!";
    } else if (jumlahSekarang >= 80) {
        counterKarakterEl.classList.add("mendekati-batas");
        counterKarakterEl.classList.remove("batas-maksimal");
        peringatanPesanEl.textContent = "";
    } else {
        counterKarakterEl.classList.remove("mendekati-batas", "batas-maksimal");
        peringatanPesanEl.textContent = "";
    }

    // Bersihkan error jika pengguna sudah mulai mengetik pesan
    if (jumlahSekarang > 0 && errorPesanEl && errorPesanEl.textContent) {
        errorPesanEl.textContent = "";
        pesanInput.classList.remove("is-invalid");
    }
}

if (pesanInput) {
    pesanInput.addEventListener("input", perbaruiPenghitungPesan);
    pesanInput.addEventListener("keyup", perbaruiPenghitungPesan);
    pesanInput.addEventListener("paste", function() {
        setTimeout(perbaruiPenghitungPesan, 0);
    });
}


// ==========================================================
// 🎯 CHALLENGE MENANTANG: VALIDASI ALAMAT EMAIL & PEMROSESAN FORMULIR
// Fitur:
// 1. Memeriksa format alamat email dengan Regular Expression (regex) standar
// 2. Memberikan indikator real-time dan pesan error jika email kosong atau format salah
// 3. Mencegah formulir diproses sebelum email valid dan semua data terisi benar
// 4. Menampilkan notifikasi sukses yang elegan dan me-reset formulir jika valid
// ==========================================================

const formKontak = document.querySelector("#form-kontak");
const namaInput = document.querySelector("#kontak-nama");
const emailInput = document.querySelector("#kontak-email");
const errorNamaEl = document.querySelector("#error-nama");
const errorEmailEl = document.querySelector("#error-email");
const statusIkonEmailEl = document.querySelector("#status-ikon-email");
const notifikasiForm = document.querySelector("#notifikasi-form");
const notifikasiJudul = document.querySelector("#notifikasi-judul");
const notifikasiPesan = document.querySelector("#notifikasi-pesan");

// Pola Regex untuk memastikan alamat email berformat benar (username@domain.tld)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validasiEmail(emailString) {
    const nilai = emailString.trim();

    if (nilai === "") {
        return {
            valid: false,
            pesan: "Alamat email wajib diisi!"
        };
    }

    if (!EMAIL_REGEX.test(nilai)) {
        return {
            valid: false,
            pesan: "Format email tidak valid (contoh yang benar: nama@domain.com)."
        };
    }

    return {
        valid: true,
        pesan: ""
    };
}

if (emailInput) {
    // Validasi saat pengguna mengetik (input)
    emailInput.addEventListener("input", function() {
        const nilai = emailInput.value.trim();

        if (nilai === "") {
            emailInput.classList.remove("is-valid", "is-invalid");
            if (errorEmailEl) errorEmailEl.textContent = "";
            if (statusIkonEmailEl) statusIkonEmailEl.textContent = "";
            return;
        }

        const hasil = validasiEmail(nilai);
        if (hasil.valid) {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
            if (errorEmailEl) errorEmailEl.textContent = "";
            if (statusIkonEmailEl) statusIkonEmailEl.textContent = "✅";
        } else {
            // Jika ada tanda '@', beri petunjuk visual
            if (nilai.includes("@")) {
                emailInput.classList.remove("is-valid");
                if (statusIkonEmailEl) statusIkonEmailEl.textContent = "⏳";
            }
        }
    });

    // Validasi saat pengguna meninggalkan kolom input email (blur)
    emailInput.addEventListener("blur", function() {
        const hasil = validasiEmail(emailInput.value);

        if (!hasil.valid) {
            emailInput.classList.add("is-invalid");
            emailInput.classList.remove("is-valid");
            if (errorEmailEl) errorEmailEl.textContent = hasil.pesan;
            if (statusIkonEmailEl) statusIkonEmailEl.textContent = "❌";
        } else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
            if (errorEmailEl) errorEmailEl.textContent = "";
            if (statusIkonEmailEl) statusIkonEmailEl.textContent = "✅";
        }
    });
}

// Bersihkan error nama saat mulai diketik
if (namaInput) {
    namaInput.addEventListener("input", function() {
        if (namaInput.value.trim() !== "" && errorNamaEl) {
            errorNamaEl.textContent = "";
            namaInput.classList.remove("is-invalid");
        }
    });
}

// Pemrosesan formulir saat dikirim (submit)
if (formKontak) {
    formKontak.addEventListener("submit", function(event) {
        event.preventDefault(); // Mencegah reload halaman

        let adaError = false;

        // 1. Validasi Nama
        const namaNilai = namaInput ? namaInput.value.trim() : "";
        if (namaNilai === "") {
            if (errorNamaEl) errorNamaEl.textContent = "Nama lengkap wajib diisi!";
            if (namaInput) {
                namaInput.classList.add("is-invalid");
                namaInput.focus();
            }
            adaError = true;
        } else {
            if (errorNamaEl) errorNamaEl.textContent = "";
            if (namaInput) namaInput.classList.remove("is-invalid");
        }

        // 2. Validasi Email (Challenge Menantang)
        const hasilEmail = validasiEmail(emailInput ? emailInput.value : "");
        if (!hasilEmail.valid) {
            if (errorEmailEl) errorEmailEl.textContent = hasilEmail.pesan;
            if (emailInput) {
                emailInput.classList.add("is-invalid");
                emailInput.classList.remove("is-valid");
                if (statusIkonEmailEl) statusIkonEmailEl.textContent = "❌";
                if (!adaError) emailInput.focus(); // Fokus ke email jika nama sudah terisi
            }
            adaError = true;
        } else {
            if (errorEmailEl) errorEmailEl.textContent = "";
            if (emailInput) {
                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
                if (statusIkonEmailEl) statusIkonEmailEl.textContent = "✅";
            }
        }

        // 3. Validasi Pesan (Challenge Menengah)
        const pesanNilai = pesanInput ? pesanInput.value.trim() : "";
        if (pesanNilai === "") {
            if (errorPesanEl) errorPesanEl.textContent = "Pesan tidak boleh kosong!";
            if (pesanInput) {
                pesanInput.classList.add("is-invalid");
                if (!adaError) pesanInput.focus();
            }
            adaError = true;
        } else if (pesanInput && pesanInput.value.length > BATAS_MAKSIMAL_PESAN) {
            // Potong jika melebihi batas
            pesanInput.value = pesanInput.value.slice(0, BATAS_MAKSIMAL_PESAN);
            perbaruiPenghitungPesan();
        } else {
            if (errorPesanEl) errorPesanEl.textContent = "";
            if (pesanInput) pesanInput.classList.remove("is-invalid");
        }

        // Jika terdapat error, proses dihentikan (formulir TIDAK dapat diproses)
        if (adaError) {
            if (notifikasiForm) notifikasiForm.hidden = true;
            return;
        }

        // Jika SEMUA valid: Proses formulir dan tampilkan notifikasi sukses!
        if (notifikasiForm && notifikasiJudul && notifikasiPesan) {
            notifikasiJudul.textContent = "🎉 Pesan Berhasil Terkirim!";
            notifikasiPesan.textContent = `Terima kasih, ${namaNilai}! Pesan Anda telah diterima oleh Tim Senja. Kami akan menghubungi Anda di ${emailInput.value.trim()} segera.`;
            notifikasiForm.hidden = false;

            // Scroll perlahan ke notifikasi
            notifikasiForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        // Reset form dan status input
        formKontak.reset();
        if (emailInput) emailInput.classList.remove("is-valid", "is-invalid");
        if (namaInput) namaInput.classList.remove("is-valid", "is-invalid");
        if (pesanInput) pesanInput.classList.remove("is-valid", "is-invalid");
        if (statusIkonEmailEl) statusIkonEmailEl.textContent = "";
        perbaruiPenghitungPesan();
    });
}

