const response = require("../utils/response");
const UserService = require("../services/userServices");
const transporter = require("../config/mailer");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModels");

module.exports = {

    getUsers(req, res) {
        UserService.getAllUsersService((error, result) => {
            if (error) return response(500, "invalid", "Gagal mengambil data users", res);
            return response(200, result, "Berhasil mengambil data users", res);
        });
    },

    async postUser(req, res) {
        const { username, email, password_hash, full_name, phone, profile_picture } = req.body;

        // Generate token untuk verifikasi email
        const token = generateToken();
        console.log("🔑 Generated Token:", token);

        // Siapkan data user dengan token
        const data = {
            username,
            email,
            password_hash,
            full_name: full_name || null,
            phone: phone || null,
            profile_picture: profile_picture || null,
            email_verification_token: token,  // ✅ Token disimpan
            email_verified: 0  // ❌ PENTING: Harus 0 (belum terverifikasi)
        };

        console.log("📝 Data yang akan disimpan:", data);

        try {
            // Insert user ke database
            const result = await new Promise((resolve, reject) => {
                UserService.insertUserService(data, (error, result) => {
                    if (error) {
                        console.error("❌ Database Error:", error);
                        reject(error);
                    } else {
                        console.log("✅ User inserted:", result.insertId);
                        resolve(result);
                    }
                });
            });

            if (!result.affectedRows) {
                return response(400, null, "User gagal ditambahkan", res);
            }

            // Kirim email verifikasi
            const verifyLink = `http://localhost:3000/talenthub/api/v1/users/verify/${token}`;

            console.log("📧 Mengirim email ke:", email);
            console.log("🔗 Link verifikasi:", verifyLink);

            await transporter.sendMail({
                from: "rafelblog21@gmail.com",
                to: email,
                subject: "Verifikasi Email Akun Kamu",
                html: `
                <h3>Halo ${username},</h3>
                <p>Terima kasih telah mendaftar! Klik link berikut untuk aktivasi akun:</p>
                <a href="${verifyLink}" style="display:inline-block;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Verifikasi Email</a>
                <p>Atau copy link ini: ${verifyLink}</p>
                <p><small>Token akan kadaluarsa dalam 24 jam</small></p>
            `
            });

            console.log("✅ Email berhasil dikirim ke", email);

            return response(200, {
                isSuccess: result.affectedRows,
                id: result.insertId,
                token: token // Debug: Kirim token di response (hapus di production)
            }, "User berhasil ditambahkan. Cek email untuk verifikasi.", res);

        } catch (error) {
            console.error("❌ Error:", error);
            return response(500, error.message, "Gagal menambah user atau mengirim email", res);
        }
    },

    updateUser(req, res) {
        const userId = req.params.id;
        const data = req.body;

        UserService.updateUserService(userId, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate user", res);

            if (result.affectedRows) {
                return response(200, {
                    isSuccess: result.affectedRows,
                    id: userId
                }, "User berhasil diupdate", res);
            }

            return response(404, null, "User tidak ditemukan", res);
        });
    },

    deleteUser(req, res) {
        const userId = req.params.id;

        UserService.deleteUserService(userId, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus user", res);

            if (result.affectedRows) {
                return response(200, {
                    isSuccess: result.affectedRows,
                    id: userId
                }, "User berhasil dihapus", res);
            }

            return response(404, null, "User tidak ditemukan", res);
        });
    },

    async register(req, res) {
        const { username, email, password } = req.body;

        const token = generateToken();

        try {
            // INSERT USER DENGAN TOKEN EMAIL
            const result = await User.createUserWithToken(username, email, password, token);

            const verifyLink = `http://localhost:3000/api/users/verify/${token}`;

            // KIRIM EMAIL
            await transporter.sendMail({
                from: "rafelblog21@gmail.com",
                to: email,
                subject: "Verifikasi Email Akun Kamu",
                html: `
                <h3>Halo ${username},</h3>
                <p>Klik link berikut untuk aktivasi akun:</p>
                <a href="${verifyLink}">${verifyLink}</a>
            `
            });

            return response(200, null, "Registrasi berhasil, cek email untuk verifikasi.", res);

        } catch (err) {
            console.error("REGISTER ERROR:", err);
            return response(500, err, "Gagal registrasi", res);
        }
    },

    async verifyEmail(req, res) {
        const { token } = req.params;

        try {
            const user = await User.findUserByToken(token);

            if (!user) {
                return response(404, null, "Token tidak valid", res);
            }

            await User.verifyEmail(token);

            return response(200, null, "Email berhasil diverifikasi!", res);

        } catch (err) {
            return response(500, err, "Gagal verifikasi email", res);
        }
    }
};
