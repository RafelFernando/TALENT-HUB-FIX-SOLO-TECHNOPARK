const Auth = require("../models/authModels");

module.exports = {

    loginService(data, callback) {
        const { email, password, role } = data;

        // Cari user berdasarkan email
        Auth.findUserByEmail(email, (err, userResult) => {
            if (err) return callback(err);

            if (userResult.length === 0) {
                return callback({ message: "Email tidak ditemukan" });
            }

            const user = userResult[0];

            // Cek password
            if (user.password_hash !== password) {
                return callback({ message: "Password salah" });
            }

            // Cek status akun
            if (user.status !== "active") {
                return callback({ message: "Akun tidak aktif / dinonaktifkan" });
            }

            // Cek email verified
            if (user.email_verified === 0) {
                return callback({ message: "Harap verifikasi email terlebih dahulu" });
            }

            // Cari roles user
            Auth.findUserRole(user.user_id, (err, roleResult) => {
                if (err) return callback(err);

                if (roleResult.length === 0) {
                    return callback({ message: "Role tidak ditemukan untuk user ini" });
                }

                const userRole = roleResult[0];

                // Cek apakah role cocok
                if (userRole.role_type !== role) {
                    return callback({
                        message: `Akses ditolak. Anda mencoba login sebagai ${role}, tetapi role Anda adalah ${userRole.role_type}`
                    });
                }

                // Cek role confirmed (keamanan tambahan)
                if (userRole.is_confirmed !== 1) {
                    return callback({ message: "Role belum dikonfirmasi admin" });
                }

                // Lolos semua pengecekan → berhasil login
                return callback(null, {
                    message: "Login berhasil",
                    user: {
                        user_id: user.user_id,
                        full_name: user.full_name,
                        email: user.email,
                        role: userRole.role_type,
                        status: user.status,
                        email_verified: user.email_verified
                    }
                });
            });
        });
    }
};
