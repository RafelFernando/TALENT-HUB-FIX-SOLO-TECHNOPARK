import React, { useState } from 'react';
import { User, Calendar, MapPin, GraduationCap, Image, Save, X } from 'lucide-react';

export default function EditBiodata() {
    const [formData, setFormData] = useState({
        nik: '3207095129900002',
        namaLengkap: 'Rafi Ahmad Fauzi',
        tempatLahir: 'Ciamis',
        tanggalLahir: '1999-12-05',
        jenisKelamin: 'Laki-Laki',
        agama: 'Islam',
        pendidikanTerakhir: 'SMA/SLTA/SMK',
        instansi: 'SMK N 1 Kawali',
        tahunLulus: '2018',
        provinsi: 'Jawa Barat',
        kotaKab: 'Ciamis',
        alamatLengkap: 'Desa Windusara'
    });

    const [previewImage, setPreviewImage] = useState('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const provinsiOptions = ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'DKI Jakarta', 'Banten'];
    const kotaOptions = ['Ciamis', 'Tasikmalaya', 'Banjar', 'Pangandaran', 'Bandung'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleReset = () => {
        setFormData({
            nik: '',
            namaLengkap: '',
            tempatLahir: '',
            tanggalLahir: '',
            jenisKelamin: '',
            agama: '',
            pendidikanTerakhir: '',
            instansi: '',
            tahunLulus: '',
            provinsi: '',
            kotaKab: '',
            alamatLengkap: ''
        });
        setPreviewImage('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-700">Pelamar Pekerjaan</h1>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-b-3xl shadow-xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Form Fields */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Biodata Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-red-500" />
                                    Biodata
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">NIK</label>
                                        <input
                                            type="text"
                                            name="nik"
                                            value={formData.nik}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            placeholder="Masukkan NIK"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            name="namaLengkap"
                                            value={formData.namaLengkap}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Tanggal Lahir</label>
                                            <input
                                                type="text"
                                                name="tempatLahir"
                                                value={formData.tempatLahir}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                                placeholder="Tempat lahir"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">Tanggal</label>
                                            <input
                                                type="date"
                                                name="tanggalLahir"
                                                value={formData.tanggalLahir}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 opacity-0">Agama</label>
                                            <select
                                                name="agama"
                                                value={formData.agama}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            >
                                                <option value="">Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen">Kristen</option>
                                                <option value="Katolik">Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Buddha">Buddha</option>
                                                <option value="Konghucu">Konghucu</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                                            <select
                                                name="jenisKelamin"
                                                value={formData.jenisKelamin}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            >
                                                <option value="">Pilih</option>
                                                <option value="Laki-Laki">Laki-Laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Agama</label>
                                            <select
                                                name="agama"
                                                value={formData.agama}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            >
                                                <option value="">Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen">Kristen</option>
                                                <option value="Katolik">Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Buddha">Buddha</option>
                                                <option value="Konghucu">Konghucu</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pendidikan Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-red-500" />
                                    Pendidikan
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Pendidikan Terakhir</label>
                                            <select
                                                name="pendidikanTerakhir"
                                                value={formData.pendidikanTerakhir}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            >
                                                <option value="">Pilih</option>
                                                <option value="SD">SD</option>
                                                <option value="SMP/SLTP">SMP/SLTP</option>
                                                <option value="SMA/SLTA/SMK">SMA/SLTA/SMK</option>
                                                <option value="D3">D3</option>
                                                <option value="S1">S1</option>
                                                <option value="S2">S2</option>
                                                <option value="S3">S3</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Instansi</label>
                                            <input
                                                type="text"
                                                name="instansi"
                                                value={formData.instansi}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                                placeholder="Nama instansi"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Lulus</label>
                                            <input
                                                type="text"
                                                name="tahunLulus"
                                                value={formData.tahunLulus}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                                placeholder="2018"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Alamat Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-red-500" />
                                    Alamat
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                                            <select
                                                name="provinsi"
                                                value={formData.provinsi}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            >
                                                <option value="">Pilih Provinsi</option>
                                                {provinsiOptions.map(prov => (
                                                    <option key={prov} value={prov}>{prov}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kab</label>
                                            <select
                                                name="kotaKab"
                                                value={formData.kotaKab}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                                            >
                                                <option value="">Pilih Kota/Kab</option>
                                                {kotaOptions.map(kota => (
                                                    <option key={kota} value={kota}>{kota}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                                        <textarea
                                            name="alamatLengkap"
                                            value={formData.alamatLengkap}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:bg-white transition-all resize-none"
                                            placeholder="Masukkan alamat lengkap"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Photo Upload */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Image className="w-5 h-5 text-red-500" />
                                    Pas Photo
                                </h3>

                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border-2 border-dashed border-gray-300">
                                    <div className="relative group">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-full aspect-[3/4] object-cover rounded-xl shadow-lg mb-4"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                            <label className="cursor-pointer bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                Ganti Foto
                                            </label>
                                        </div>
                                    </div>

                                    <label className="block cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <div className="bg-white border-2 border-gray-300 rounded-lg px-4 py-3 hover:border-red-500 hover:bg-red-50 transition-all">
                                            <Image className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                                            <span className="text-sm font-medium text-gray-600">Upload Photo</span>
                                            <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 2MB)</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-4 justify-end pt-6 border-t">
                        <a
                            href="/Seeker/CV"
                            className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                        >
                            <X size={18} />
                            Tutup
                        </a>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`px-4 py-2 rounded- font-semibold text-white transition-all flex items-center gap-2 ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'inline-flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-400 rounded-lg shadow-sm transition'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Menyimpan...
                                </>
                            ) : showSuccess ? (
                                <>
                                    <Save size={18} />
                                    Berhasil!
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    UPDATE
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Success Notification */}
                {showSuccess && (
                    <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <Save className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-semibold">Data Berhasil Disimpan!</p>
                            <p className="text-sm text-green-100">Biodata Anda telah diperbarui</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}