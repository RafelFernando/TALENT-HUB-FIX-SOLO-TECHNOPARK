const AuthAdmin = require("../models/authAdminModels");

module.exports = {

    loginAdminService(data, callback) {
        const { email, password } = data;

        // Cari user berdasarkan email
        AuthAdmin.findAdminByEmail(email, (err, userResult) => {
            if (err) return callback(err);

            if (userResult.length === 0) {
                return callback({ message: "Email tidak ditemukan" });
            }

            const user = userResult[0];

            // Cek password
            if (user.password_hash !== password) {
                return callback({ message: "Password salah" });
            }

            // Cek apakah akun aktif
            if (user.status !== "active") {
                return callback({ message: "Akun tidak aktif / dinonaktifkan" });
            }

            // Cek email verified
            if (user.email_verified === 0) {
                return callback({ message: "Harap verifikasi email terlebih dahulu" });
            }

            // Cek role admin
            AuthAdmin.findAdminRole(user.user_id, (err, roleResult) => {
                if (err) return callback(err);

                if (roleResult.length === 0) {
                    return callback({ message: "Anda tidak memiliki akses admin" });
                }

                const adminRole = roleResult[0];

                if (adminRole.is_confirmed !== 1) {
                    return callback({ message: "Akses admin belum dikonfirmasi oleh sistem" });
                }

                // Lolos seluruh pengecekan
                return callback(null, {
                    message: "Login admin berhasil",
                    admin: {
                        user_id: user.user_id,
                        full_name: user.full_name,
                        email: user.email,
                        role: adminRole.role_type,
                        status: user.status,
                        email_verified: user.email_verified
                    }
                });
            });
        });
    }
};
