# Tugas 03 - Cryptocurrency Market App

## Deskripsi Proyek

Aplikasi **Cryptocurrency Market** merupakan aplikasi mobile sederhana yang dibuat menggunakan Ionic Vue untuk menampilkan data cryptocurrency dari API online CoinLore.

Aplikasi mengambil data cryptocurrency melalui API:

[https://api.coinlore.net/api/tickers/](https://api.coinlore.net/api/tickers/)

Data yang ditampilkan mencakup beberapa informasi utama, yaitu:

- `rank` : Peringkat cryptocurrency.
- `name` : Nama cryptocurrency.
- `symbol` : Simbol cryptocurrency.
- `price_usd` : Harga cryptocurrency dalam mata uang USD.

Selain menampilkan data utama, aplikasi juga dilengkapi beberapa fitur tambahan untuk memudahkan pengguna dalam melihat informasi cryptocurrency.

## Soal Tugas

1. Membuat proyek baru untuk menampilkan data nama-nama cryptocurrency yang diambil dari API online CoinLore.
2. Membuat tampilan aplikasi mobile dengan menampilkan atribut atau field `rank`, `name`, `symbol`, dan `price_usd`.
3. Menampilkan dan menjelaskan file yang dibuat untuk menampilkan data tersebut.
4. Menyertakan source code dalam bentuk teks atau file.

---

## Teknologi yang Digunakan

- **Ionic Vue** - Framework untuk membangun antarmuka aplikasi.
- **Vue.js** - Mengatur komponen, data, dan interaksi aplikasi.
- **Axios** - Mengambil data dari API menggunakan HTTP GET request.
- **Vite** - Menjalankan server pengembangan aplikasi.
- **CSS** - Mengatur tampilan dan desain aplikasi.
- **CoinLore API** - Menyediakan data cryptocurrency.

---

## Fitur Aplikasi

1. **Menampilkan Data Cryptocurrency**

   Mengambil dan menampilkan data cryptocurrency dari API CoinLore, meliputi peringkat, nama, simbol, dan harga dalam USD.

2. **Top 3 Cryptocurrency**

   Menampilkan tiga cryptocurrency dengan peringkat tertinggi dalam bentuk kartu khusus dengan warna emas, perak, dan perunggu.

3. **Daftar Cryptocurrency Lainnya**

   Menampilkan cryptocurrency selain tiga peringkat teratas dalam bentuk daftar kartu.

4. **Pencarian Cryptocurrency**

   Memungkinkan pengguna mencari cryptocurrency berdasarkan nama atau simbol.

5. **Refresh Data**

   Memungkinkan pengguna mengambil kembali data terbaru dari API tanpa harus memuat ulang seluruh halaman aplikasi.

6. **Indikator Perubahan Harga**

   Menampilkan persentase perubahan harga dalam 24 jam menggunakan indikator panah dan warna berbeda untuk menunjukkan kenaikan atau penurunan harga.

7. **Loading dan Pesan Error**

   Menampilkan animasi loading ketika data sedang diambil serta pesan pemberitahuan apabila terjadi kegagalan saat mengambil data.

---

## Cara Menjalankan Proyek

Proyek ini dibangun menggunakan Ionic Vue dan Vite.

### Prasyarat

Pastikan perangkat sudah memiliki:

- Node.js
- npm (Node Package Manager)

### Langkah-langkah Menjalankan Aplikasi

1. Clone repository ini atau unduh source code proyek.
2. Buka terminal dan masuk ke direktori proyek.
3. Instal seluruh dependensi dengan perintah:

   ```bash
   npm install
   ```

4. Setelah proses instalasi selesai, jalankan aplikasi menggunakan perintah:

   ```bash
   npm run dev
   ```

5. Buka browser dan akses alamat lokal yang ditampilkan oleh Vite di terminal, biasanya:

   `http://localhost:5173/`

---

## Penjelasan File dan Source Code

Berikut beberapa file utama yang digunakan dalam pengembangan aplikasi Cryptocurrency Market.

### 1. `src/views/CryptoPage.vue`

File ini merupakan komponen utama yang bertanggung jawab untuk mengambil, mengolah, dan menampilkan data cryptocurrency dari API CoinLore.

Beberapa bagian penting di dalam file ini:

- **Import Library:** Menggunakan Axios untuk mengambil data API serta mengimpor komponen UI dari Ionic Vue, seperti `ion-page`, `ion-header`, `ion-content`, `ion-button`, `ion-card`, dan `ion-spinner`.
- **API URL:** Menentukan alamat API CoinLore yang digunakan sebagai sumber data.
- **Data:** Menyimpan data cryptocurrency, status loading, pesan error, dan kata kunci pencarian.
- **Computed:** Mengolah data untuk pencarian serta memisahkan cryptocurrency peringkat 1 sampai 3 dan cryptocurrency lainnya.
- **Mounted:** Memanggil fungsi `loadData()` secara otomatis ketika halaman pertama kali dibuka.
- **Methods:** Menangani proses pengambilan data, refresh, pemeriksaan perubahan harga, serta pemformatan harga dan persentase perubahan.

Data cryptocurrency ditampilkan menggunakan perulangan `v-for` berdasarkan hasil pengolahan data.

### 2. `src/theme/crypto.css`

File ini digunakan untuk mengatur desain dan tampilan aplikasi.

Beberapa pengaturan di dalamnya meliputi:

- Warna latar belakang dan header aplikasi.
- Tampilan kartu Top 3 dengan warna emas, perak, dan perunggu.
- Tampilan daftar cryptocurrency lainnya.
- Pengaturan ukuran teks, jarak, dan posisi elemen.
- Indikator perubahan harga dengan warna hijau dan merah.
- Tampilan loading dan pesan error.
- Penyesuaian tampilan untuk layar HP dan laptop menggunakan media query.

### 3. `src/router/index.ts`

File ini digunakan untuk mengatur navigasi halaman aplikasi.

Halaman utama diarahkan ke `CryptoPage.vue` melalui konfigurasi router. Dengan demikian, ketika aplikasi dibuka, pengguna langsung diarahkan ke halaman Cryptocurrency Market.

### 4. `src/main.ts`

File ini merupakan titik awal inisialisasi aplikasi.

Fungsinya antara lain:

- Mengimpor Vue dan Ionic Vue.
- Mengimpor komponen utama aplikasi.
- Mengimpor stylesheet bawaan Ionic.
- Menghubungkan router dengan aplikasi.
- Menjalankan aplikasi pada elemen HTML dengan ID `app`.

### 5. `src/vite-env.d.ts`

File ini berisi deklarasi tipe untuk file berekstensi `.vue` agar dapat dikenali oleh TypeScript dalam proyek.

### 6. `eslint.config.js`

File ini digunakan untuk mengatur konfigurasi ESLint sebagai alat pemeriksaan kode, termasuk penyesuaian aturan agar sesuai dengan penggunaan script Vue dalam proyek.

---

## Sumber Data API

Aplikasi menggunakan API dari CoinLore:

[https://api.coinlore.net/api/tickers/](https://api.coinlore.net/api/tickers/)

Data diambil menggunakan metode HTTP GET dengan bantuan Axios.

Struktur respons API memiliki properti `data` yang berisi kumpulan objek cryptocurrency. Setiap objek memiliki informasi seperti `rank`, `name`, `symbol`, dan `price_usd`, serta informasi tambahan seperti `percent_change_24h`.

---

## Hasil Praktikum

Aplikasi Cryptocurrency Market berhasil dibuat menggunakan Ionic Vue dan dapat menampilkan data cryptocurrency dari API CoinLore.

Pengguna dapat melihat tiga cryptocurrency dengan peringkat tertinggi, melihat daftar cryptocurrency lainnya, melakukan pencarian berdasarkan nama atau simbol, serta mengambil kembali data menggunakan tombol Refresh.

Aplikasi juga dilengkapi indikator perubahan harga dan tampilan responsif agar dapat digunakan pada perangkat mobile maupun layar laptop.

---

## Penutup

Melalui praktikum ini, saya mempelajari cara membuat aplikasi menggunakan Ionic Vue, mengambil data dari API online menggunakan Axios, mengolah data menggunakan fitur Vue, serta menampilkan informasi dalam bentuk komponen antarmuka Ionic.

Proyek ini juga memberikan pengalaman dalam membuat tampilan aplikasi yang responsif dan menambahkan fitur interaktif untuk memudahkan pengguna.

**Mata Kuliah:** Pemrograman Berbasis Perangkat Bergerak (MSIM4401)  
**Tugas:** Tugas Praktikum 03
