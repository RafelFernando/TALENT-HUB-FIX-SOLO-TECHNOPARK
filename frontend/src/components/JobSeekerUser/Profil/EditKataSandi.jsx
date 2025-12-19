import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Check, X, Shield } from 'lucide-react';

export default function EditKataSandiSeeker() {
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
        if (strength <= 1) return 'bg-red-500';
        if (strength <= 3) return 'bg-yellow-500';
        return 'bg-green-500';
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
        { text: 'Minimal 8 karakter', met: formData.newPassword.length >= 8 },
        { text: 'Huruf besar & kecil', met: /[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) },
        { text: 'Minimal 1 angka', met: /[0-9]/.test(formData.newPassword) },
        { text: 'Karakter khusus (!@#$%)', met: /[^a-zA-Z0-9]/.test(formData.newPassword) }
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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md">

                <div className="mb-4">
                    <h1 className="text-2xl font-semibold text-gray-700">Edit Kata Sandi</h1>
                </div>


                <div className="p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Kata Sandi Baru
                        </label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'newPassword' ? 'scale-[1.02]' : ''
                            }`}>
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                onFocus={() => setFocusedField('newPassword')}
                                onBlur={() => setFocusedField('')}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
                                placeholder="Masukkan kata sandi baru"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {formData.newPassword && (
                            <div className="mt-3">
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < strength ? getStrengthColor(strength) : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className={`text-sm font-medium ${strength <= 1 ? 'text-red-500' : strength <= 3 ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                    Kekuatan: {getStrengthText(strength)}
                                </p>
                            </div>
                        )}

                        {formData.newPassword && (
                            <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-xl">
                                {requirements.map((req, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${req.met ? 'bg-green-500' : 'bg-gray-300'
                                            }`}>
                                            {req.met ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                                            {req.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ulangi Kata Sandi Baru
                        </label>
                        <div className={`relative transition-all duration-300 ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''
                            }`}>
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField('')}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
                                placeholder="Ulangi kata sandi baru"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {formData.confirmPassword && (
                            <div className={`mt-3 flex items-center gap-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-500'
                                }`}>
                                {passwordsMatch ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                <span>{passwordsMatch ? 'Kata sandi cocok' : 'Kata sandi tidak cocok'}</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!passwordsMatch || strength < 3 || isSubmitting}
                        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${passwordsMatch && strength >= 3
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Memproses...
                            </div>
                        ) : submitSuccess ? (
                            <div className="flex items-center justify-center gap-2">
                                <Check className="w-5 h-5" />
                                Berhasil Disimpan!
                            </div>
                        ) : (
                            'Simpan Kata Sandi'
                        )}
                    </button>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <span className="font-semibold">Tips Keamanan:</span> Gunakan kombinasi huruf, angka, dan simbol yang unik. Jangan gunakan kata sandi yang sama di berbagai platform.
                    </p>
                </div>

            </div>
        </div>
    );
}