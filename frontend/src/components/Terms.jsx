
import React from "react";

export default function Terms({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-[70%] max-h-[80vh] overflow-y-auto rounded-2xl shadow-lg p-8 relative">
                {/* Tombol Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-gray-500 text-2xl hover:text-gray-800"
                >
                    &times;
                </button>

                {/* Judul */}
                <h2 className="text-4xl font-bold text-[#193F7A] mb-4 text-center">
                    Syarat dan Ketentuan Aplikasi
                </h2>

                <hr class="w-full border-t-2 border-gray-300 my-4" />

                {/* Isi Terms */}
                <div className="text-gray-700 leading-relaxed space-y-4 text-sm mb-9">
                    <p className="mb-10 text-[18px]">
                        <strong>
                            TERMS & CONDITIONS <br />
                            (Syarat & Ketentuan Penggunaan Aplikasi Super Indonesia Digital Technopark)
                        </strong>
                    </p>

                    <p>
                        <strong>PERJANJIAN PENGGUNAAN APLIKASI SUPER INDONESIA DIGITAL
                            TECHNOPARK</strong>
                    </p>

                    <p>
                        Perjanjian Penggunaan Layanan Aplikasi Super Indonesia Digital
                        Technopark (Perjanjian) antara Pengguna sebagai pengguna Aplikasi
                        Super Indonesia Digital Technopark (Pengguna) dan UPT Solo
                        Technopark sebagai pengelola Aplikasi Super Indonesia Digital
                        Technopark, ini memuat syarat-syarat dan ketentuan penggunaan
                        layanan Aplikasi Super Indonesia Digital Technopark yang berlaku
                        bagi Pengguna untuk dapat menggunakan Aplikasi Super Indonesia
                        Digital Technopark. UPT Solo Technopark selanjutnya dapat disebut
                        juga dengan istilah “Kami”.
                    </p>

                    <p>
                        Mohon untuk membaca dengan hati-hati Perjanjian ini. Anda harus
                        membaca, memahami, menerima dan menyetujui semua persyaratan dan
                        ketentuan dalam Perjanjian ini sebelum menggunakan aplikasi dan/atau
                        menerima konten yang terdapat di dalamnya. Dengan menggunakan
                        aplikasi dan/atau melanjutkan akses terhadap Aplikasi Super
                        Indonesia Digital Technopark, Anda menyetujui persyaratan dan
                        ketentuan Kami, dan oleh karena itu menyetujui untuk terikat dalam
                        suatu kontrak dengan Kami dan oleh karenanya Anda menyatakan
                        persetujuan untuk dapat menerima layanan dan akses atas seluruh
                        konten yang terdapat dalam aplikasi ini.
                    </p>

                    <p>
                        Jika Anda tidak menerima dan menyetujui Perjanjian ini, Anda tidak
                        diperkenankan untuk mengakses lebih lanjut Aplikasi Super Indonesia
                        Digital Technopark dan dipersilakan untuk meninggalkan aplikasi.
                    </p>

                    <p>
                        Setiap kegiatan terkait dengan penggunaan aplikasi website, maka
                        baik penyelenggara, pengguna dalam hal ini termasuk juga adalah
                        penjual (merchant) dan pembeli, dilindungi secara hukum melalui
                        Undang – Undang Republik Indonesia No.11 Tahun 2008 tentang
                        Informasi dan Teknologi, Undang-Undang Republik Indonesia No. 19
                        Tahun 2002 tentang Hak Cipta, dan terhadap segala bentuk perikatan
                        yang timbul dari segala aktivitas di aplikasi ini telah memenuhi
                        kaidah dan syarat sahnya suatu perikatan sebagaimana tercantum dalam
                        Kitab Undang-Undang Hukum Perdata Indonesia.
                    </p>

                    <h3 className="font-bold text-[#193F7A] text-[18px]">PENDAHULUAN</h3>
                    <p>
                        Perjanjian ini diatur dan diinterpretasikan berdasarkan Hukum
                        Republik Indonesia (Indonesia). Pihak-pihak dalam Perjanjian ini
                        sepakat untuk tunduk kepada pengadilan di Indonesia.
                    </p>

                    <p>
                        Dalam Perjanjian ini yang dimaksud dengan “Pengguna” adalah orang
                        perseorangan, baik warga negara Indonesia, warga negara asing,
                        maupun badan hukum dengan kemampuan menggunakan komputer, jaringan,
                        komputer dan/atau media elektronik lainnya yang mampu untuk
                        mengakses Aplikasi Super Indonesia Digital Technopark sesuai dengan
                        keperluannya.
                    </p>

                    <p>
                        Dalam hal ini termasuk juga Pengguna yang telah mendaftarkan diri
                        pada aplikasi sebagai Pengguna Terdaftar atau membayar untuk layanan
                        tertentu yang mungkin disediakan oleh Aplikasi Super Indonesia
                        Digital Technopark.
                    </p>

                    <p>
                        Dengan mengakses atau menggunakan aplikasi ini, Pengguna secara
                        sadar, tanpa paksaan, dan beritikad baik menyatakan diri setuju
                        untuk menerima semua syarat dan ketentuan yang tercantum dalam
                        Perjanjian ini.
                    </p>

                    <p>
                        Kami dapat mengubah atau memperbarui Perjanjian ini setiap waktu
                        dengan mencantumkan versi terbaru di aplikasi. Pengguna dianggap
                        telah menyetujui perubahan tersebut apabila tetap menggunakan
                        aplikasi setelah pembaruan.
                    </p>

                    <h3 className="font-bold text-[#193F7A] text-[18px]">RUANG LINGKUP DAN DEFINISI</h3>
                    <p>
                        “Aplikasi Super Indonesia Digital Technopark” (selanjutnya disebut
                        “Aplikasi”) adalah sebuah aplikasi milik Solo Technopark yang
                        ditujukan sebagai wadah atau platform untuk menjalankan kegiatan
                        usaha serta sarana mencapai tujuan sebagaimana diatur dalam Syarat
                        dan Ketentuan ini.
                    </p>

                    <p>
                        “Pengguna” adalah orang perseorangan atau badan hukum yang mampu
                        mengakses Aplikasi Super Indonesia Digital Technopark sesuai
                        keperluannya, termasuk yang telah mendaftar sebagai Pengguna
                        Terdaftar.
                    </p>

                    <p>
                        “Layanan” adalah layanan e-learning dan e-commerce yang tersedia
                        pada aplikasi yang dapat digunakan secara penuh tanggung jawab oleh
                        Pengguna.
                    </p>

                    <h3 className="font-bold text-[#193F7A] text-[18px]">KETENTUAN UMUM PENGGUNAAN</h3>
                    <p>
                        Pengguna wajib berusia minimal 17 tahun atau telah memenuhi syarat
                        hukum yang berlaku. Setiap pengguna sepakat untuk tidak menyalin,
                        menggunakan, atau mengunduh informasi, gambar, video, dokumen, atau
                        database dari aplikasi untuk tujuan komersial tanpa izin tertulis
                        dari Kami.
                    </p>

                    <p>
                        Pengguna tidak diperbolehkan menyebarkan spam, virus, atau konten
                        yang melanggar hukum. Kami berhak membatasi atau menghentikan akses
                        jika pengguna melanggar ketentuan ini.
                    </p>

                    <p>
                        Dengan terus menggunakan aplikasi, Pengguna dianggap telah membaca,
                        memahami, dan menyetujui kebijakan privasi (Privacy Policy) yang
                        mengatur penggunaan informasi pribadi dalam aplikasi ini.
                    </p>

                    <h3 className="font-bold text-[#193F7A] text-[18px]">PENGGUNA TERDAFTAR – MEMBERSHIP</h3>
                    <p>
                        Menjadi Pengguna Terdaftar (“Member”) tidak dipungut biaya. Member
                        wajib menjaga kerahasiaan akun dan password serta bertanggung jawab
                        atas seluruh aktivitas di akun tersebut.
                    </p>

                    <p>
                        Kami berhak membatasi, memblokir, atau mengakhiri akun yang
                        melanggar hukum atau perjanjian ini. Dilarang menjual atau
                        mengalihkan akun tanpa izin tertulis dari Kami.
                    </p>

                    <p>
                        Member wajib segera melaporkan kepada Kami apabila mengetahui adanya
                        penggunaan akun secara tidak sah, dan memastikan untuk keluar
                        (logout) setelah menggunakan aplikasi.
                    </p>

                    <p>
                        Dengan terus menggunakan Aplikasi Super Indonesia Digital
                        Technopark, Pengguna dianggap telah membaca, memahami, dan
                        menyetujui seluruh isi perjanjian ini.
                    </p>
                </div>
            </div>
        </div>
    );
}
