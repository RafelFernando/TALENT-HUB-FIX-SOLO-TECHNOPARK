import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Check, X, Shield, Key, AlertCircle, Sparkles, Zap, TrendingUp, Users, Clock, KeyRound } from 'lucide-react';

export default function EditKataSandi() {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const passwordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
    };

    const getStrengthColor = (strength) => {
        if (strength <= 1) return 'bg-gradient-to-r from-red-500 to-red-400';
        if (strength <= 3) return 'bg-gradient-to-r from-yellow-500 to-amber-400';
        return 'bg-gradient-to-r from-green-500 to-emerald-400';
    };

    const getStrengthText = (strength) => {
        if (strength <= 1) return 'Lemah';
        if (strength <= 3) return 'Sedang';
        return 'Kuat';
    };

    const strength = passwordStrength(formData.newPassword);
    const passwordsMatch = formData.newPassword && formData.confirmPassword &&
        formData.newPassword === formData.confirmPassword;

    const requirements = [
        { text: 'Minimal 8 karakter', met: formData.newPassword.length >= 8, icon: '🔢' },
        { text: 'Huruf besar & kecil', met: /[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword), icon: 'Aa' },
        { text: 'Minimal 1 angka', met: /[0-9]/.test(formData.newPassword), icon: '123' },
        { text: 'Karakter khusus (!@#$%)', met: /[^a-zA-Z0-9]/.test(formData.newPassword), icon: '#!' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordsMatch && strength >= 3) {
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                setFormData({ newPassword: '', confirmPassword: '' });
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30 p-4 md:p-6">
            {/* Decorative Elements */}
            <div className="fixed top-5 right-5 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-yellow-400/20 rounded-full blur-xl -z-10"></div>
            <div className="fixed bottom-5 left-5 w-16 h-16 bg-gradient-to-r from-amber-300/20 to-pink-400/20 rounded-full blur-lg -z-10"></div>
            
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                                    <KeyRound className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-blue-900">Update Kata Sandi</h1>
                                <p className="text-blue-900/60 text-sm md:text-base">Amankan akun Anda dengan kata sandi baru yang kuat</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Form Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-blue-900/10 overflow-hidden">
                            {/* Top Gradient Bar */}
                            <div className="h-1 bg-gradient-to-r from-blue-600 via-yellow-400 to-emerald-500"></div>
                            
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* New Password Field */}
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <label className="text-base font-semibold text-blue-900">
                                                    Kata Sandi Baru
                                                </label>
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${strength <= 1 ? 'bg-red-100 text-red-700' : strength <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                    {getStrengthText(strength)}
                                                </div>
                                            </div>
                                            
                                            <div className={`relative transition-all duration-200 ${focusedField === 'newPassword' ? 'transform scale-[1.02]' : ''}`}>
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <Lock className="w-4 h-4 text-blue-900/50" />
                                                </div>
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={formData.newPassword}
                                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                    onFocus={() => setFocusedField('newPassword')}
                                                    onBlur={() => setFocusedField('')}
                                                    className="w-full pl-10 pr-10 py-3 bg-white border border-blue-900/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 placeholder:text-blue-900/30 text-sm"
                                                    placeholder="Masukkan kata sandi baru"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900/40 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
                                                >
                                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Strength Indicator */}
                                        {formData.newPassword && (
                                            <div className="space-y-3">
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < strength ? getStrengthColor(strength) : 'bg-blue-900/10'}`}
                                                        />
                                                    ))}
                                                </div>
                                                
                                                {/* Requirements Grid */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    {requirements.map((req, i) => (
                                                        <div 
                                                            key={i} 
                                                            className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${req.met ? 'bg-gradient-to-r from-green-50/80 to-emerald-50/50 border border-green-100' : 'bg-blue-50/30 border border-blue-900/5'}`}
                                                        >
                                                            <div className={`w-6 h-6 rounded-md flex items-center justify-center ${req.met ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-blue-900/5'}`}>
                                                                <span className={`text-xs font-bold ${req.met ? 'text-white' : 'text-blue-900/40'}`}>
                                                                    {req.icon}
                                                                </span>
                                                            </div>
                                                            <p className={`text-xs font-medium ${req.met ? 'text-green-700' : 'text-blue-900/60'}`}>
                                                                {req.text}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-base font-semibold text-blue-900 mb-3 block">
                                                Ulangi Kata Sandi
                                            </label>
                                            
                                            <div className={`relative transition-all duration-200 ${focusedField === 'confirmPassword' ? 'transform scale-[1.02]' : ''}`}>
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                    <Lock className="w-4 h-4 text-blue-900/50" />
                                                </div>
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    onFocus={() => setFocusedField('confirmPassword')}
                                                    onBlur={() => setFocusedField('')}
                                                    className="w-full pl-10 pr-10 py-3 bg-white border border-blue-900/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 placeholder:text-blue-900/30 text-sm"
                                                    placeholder="Ulangi kata sandi baru"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900/40 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {formData.confirmPassword && (
                                            <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${passwordsMatch 
                                                ? 'bg-gradient-to-r from-green-50/80 to-emerald-50/50 border border-green-100' 
                                                : 'bg-gradient-to-r from-red-50/80 to-rose-50/50 border border-red-100'}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${passwordsMatch 
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                                    : 'bg-gradient-to-r from-red-500 to-rose-500'}`}>
                                                    {passwordsMatch ? 
                                                        <Check className="w-4 h-4 text-white" /> : 
                                                        <X className="w-4 h-4 text-white" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-medium ${passwordsMatch ? 'text-green-700' : 'text-red-700'}`}>
                                                        {passwordsMatch ? 'Kata sandi cocok' : 'Kata sandi tidak cocok'}
                                                    </p>
                                                    <p className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                                                        {passwordsMatch ? 'Siap untuk disimpan!' : 'Periksa kembali kata sandi'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!passwordsMatch || strength < 3 || isSubmitting}
                                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${passwordsMatch && strength >= 3
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-md active:scale-[0.98]'
                                                : 'bg-gradient-to-r from-blue-900/20 to-blue-900/30 cursor-not-allowed'
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    <span className="text-sm">Memproses...</span>
                                                </div>
                                            ) : submitSuccess ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Check className="w-4 h-4" />
                                                    <span className="text-sm">Berhasil Disimpan!</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <Shield className="w-4 h-4" />
                                                    <span className="text-sm">Simpan Kata Sandi</span>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Tips Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-xl border border-blue-200 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                        <AlertCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="text-base font-semibold text-blue-900">Tips Keamanan</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-blue-900/70">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
                                        <span>Gunakan kata sandi yang berbeda untuk setiap akun</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                                        <span>Aktifkan verifikasi dua langkah jika tersedia</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                        <span>Simpan password di tempat yang aman</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-50 to-amber-100/30 rounded-xl border border-yellow-200 p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-white" />
                                    </div>
                                    <h3 className="text-base font-semibold text-yellow-900">Jadwal Update</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-yellow-900/70">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                                        <span>Update kata sandi setiap 3 bulan</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
                                        <span>Setelah ada aktivitas mencurigakan</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                        <span>Saat berbagi akses dengan orang lain</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Information */}
                    <div className="space-y-6">
                        {/* Strength Stats */}
                        <div className="bg-white rounded-2xl border border-blue-900/10 p-5 shadow-sm">
                            <h3 className="text-base font-semibold text-blue-900 mb-4">Analisis Keamanan</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
                                        <span className="text-sm text-blue-900/70">Level Kompleksitas</span>
                                    </div>
                                    <span className="text-lg font-bold text-blue-900">5/5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                                        <span className="text-sm text-blue-900/70">Skor Saat Ini</span>
                                    </div>
                                    <span className="text-lg font-bold text-yellow-700">{strength}/5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${passwordsMatch ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}></div>
                                        <span className="text-sm text-blue-900/70">Status Validasi</span>
                                    </div>
                                    <span className={`text-lg font-bold ${passwordsMatch ? 'text-green-700' : 'text-red-700'}`}>
                                        {passwordsMatch ? '✓' : '✗'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-blue-900/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-blue-900/60">Kesiapan</span>
                                    <span className={`text-sm font-medium ${passwordsMatch && strength >= 3 ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {passwordsMatch && strength >= 3 ? 'Siap Disimpan' : 'Perlu Perbaikan'}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-blue-900/5 rounded-full mt-1 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${passwordsMatch && strength >= 3 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-yellow-500 to-amber-500'}`}
                                        style={{ width: passwordsMatch && strength >= 3 ? '100%' : `${Math.min(75, strength * 20)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}