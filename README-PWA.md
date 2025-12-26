# 📱 Nazxf Bio Links - PWA (Progressive Web App)

Website biodata Anda sekarang sudah menjadi **Progressive Web App (PWA)** yang bisa diinstall seperti aplikasi native di smartphone!

## ✨ Fitur PWA

- ✅ **Install seperti App** - Bisa diinstall di home screen smartphone
- ✅ **Bekerja Offline** - Website tetap bisa dibuka tanpa internet
- ✅ **Fast Loading** - Loading super cepat dengan caching
- ✅ **Full Screen** - Tampil seperti aplikasi asli tanpa browser UI
- ✅ **Auto Update** - Otomatis update saat ada perubahan

## 📲 Cara Install di Smartphone

### Android (Chrome/Edge):

1. Buka website di browser Chrome atau Edge
2. Klik menu ⋮ (titik tiga) di pojok kanan atas
3. Pilih **"Install app"** atau **"Add to Home screen"**
4. Klik **"Install"**
5. Selesai! Icon app akan muncul di home screen

### iPhone/iPad (Safari):

1. Buka website di browser Safari
2. Tap tombol Share (kotak dengan panah ke atas)
3. Scroll ke bawah dan tap **"Add to Home Screen"**
4. Edit nama app jika perlu, lalu tap **"Add"**
5. Selesai! Icon app akan muncul di home screen

### Desktop (Chrome/Edge/Opera):

1. Buka website di browser
2. Lihat icon ⊕ atau install di address bar (pojok kanan)
3. Klik icon tersebut atau pilih **"Install"** dari menu
4. Klik **"Install"** di popup
5. App akan terbuka di window terpisah

## 🚀 Cara Upload ke Hosting

Untuk menggunakan PWA, website harus di-upload ke hosting dengan **HTTPS**:

### Hosting Gratis Recommended:

1. **Vercel** (Recommended) - [vercel.com](https://vercel.com)
   - Upload folder biodata
   - Otomatis dapat domain HTTPS
   
2. **Netlify** - [netlify.com](https://netlify.com)
   - Drag & drop folder ke netlify
   - Langsung live dengan HTTPS

3. **GitHub Pages** - [pages.github.com](https://pages.github.com)
   - Upload ke GitHub repository
   - Enable GitHub Pages di settings

### Cara Upload ke Vercel (Paling Mudah):

1. Buat akun di [vercel.com](https://vercel.com)
2. Klik **"Add New Project"**
3. Drag & drop folder `biodata` 
4. Klik **"Deploy"**
5. Tunggu 1-2 menit, website sudah live!
6. Buka di smartphone untuk install app

## 📁 File PWA yang Dibuat

```
biodata/
├── index.html           # Website utama (sudah diupdate)
├── manifest.json        # Konfigurasi PWA
├── service-worker.js    # Service worker untuk offline
├── icon-192.png        # Icon app 192x192
└── icon-512.png        # Icon app 512x512
```

## 🔧 Testing PWA

### Di Browser Desktop:

1. Buka Chrome DevTools (F12)
2. Pilih tab **"Application"**
3. Klik **"Manifest"** untuk cek manifest.json
4. Klik **"Service Workers"** untuk cek service worker
5. Tes offline: Centang "Offline" dan reload page

### Di Smartphone:

1. Upload ke hosting HTTPS dulu
2. Buka di browser smartphone
3. Lihat banner "Add to Home Screen"
4. Install dan test

## ⚠️ Catatan Penting

- **PWA HARUS di HTTPS** - Tidak bisa di localhost atau HTTP
- Service worker hanya jalan di production (hosting)
- Icon bisa diganti sesuai keinginan (gunakan icon PNG square)
- Untuk testing lokal, gunakan `localhost` atau tool seperti `ngrok`

## 🎨 Kustomisasi

### Ganti Icon:
1. Buat icon PNG square (512x512 dan 192x192)
2. Replace file `icon-512.png` dan `icon-192.png`
3. Icon akan otomatis update

### Ganti Nama App:
1. Edit file `manifest.json`
2. Ubah nilai `name` dan `short_name`
3. Save dan upload ulang

### Ganti Warna Tema:
1. Edit file `manifest.json`
2. Ubah nilai `theme_color` dan `background_color`
3. Save dan upload ulang

## 📞 Support

Kalau ada pertanyaan atau butuh bantuan, langsung tanya aja! 😊

---

**Made with ❤️ by Nazxf**
