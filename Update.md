# Tujuan Akhir

- Buat pengujian mulai dari Unit, Integration, dan End-to-End pada Aplikasi Forum Diskusi.
- Deploy Aplikasi Forum Diskusi dengan teknik CI/CD.
- Memanfaatkan salah satu React Ecosystem pada Aplikasi Forum Diskusi.

## Kriteria Utama 1: Automation Testing

- Buat minimal dua pengujian fungsi Reducer.
- Buat minimal dua pengujian Thunk Function.
- Buat minimal dua pengujian React Components.
- Buat minimal satu pengujian End-to-End untuk alur login aplikasi.
- Wajib menulis skenario pengujian pada masing-masing berkas pengujian.
- Pengujian dapat dijalankan dengan perintah npm test dan npm run e2e.

Disarankan untuk menguji unit yang kompleks. Contonya, fungsi reducer yang memiliki banyak kondisi atau fungsi thunk yang men-dispatch banyak action.

## Kriteria Utama 2: Deployment Aplikasi

- Deploy aplikasi dengan menggunakan teknik CI/CD.
- Continuous Integration diterapkan dengan GitHub Actions.
- Continuous Deployment diterapkan dengan Vercel.
- Memproteksi branch master.
- Melampirkan URL Vercel aplikasi Anda pada catatan submission.
- Melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar. Screenshot yang perlu dilampirkan:
  - 1_ci_check_error: menunjukkan CI check error karena pengujian gagal, contohnya.dos:9ad5ec697da017001967f5a230f0c0f020221111102335.jpeg
  - 2_ci_check_pass: menunjukkan CI check pass karena pengujian lolos, contohnya.
    dos:d5d5fc9ae2eb95f6682dbd4266f2ef5d20221111102422.jpeg
  - 3_branch_protection: menunjukkan branch proteksi pada halaman PR, contohnya.
    dos:7b70f73cc59019697967ec26f092c8eb20221111102459.jpeg

## Kriteria Utama 3: Memanfaatkan Salah Satu Ecosystem React

- Memanfaatkan minimal satu React Ecosystem pada [daftar berikut.](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools)
- Berikut penggunaan Ecosystem React yang tidak kami pertimbangkan untuk memenuhi kriteria.
  - Create React Apps
  - Vite
  - React Router
  - React Icons
  - Redux
  - Redux Thunk
  - Redux Toolkit
  - Jest
  - Vitest
    React Testing Library
