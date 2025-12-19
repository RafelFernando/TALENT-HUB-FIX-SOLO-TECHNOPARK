const response = require("../utils/response");
const CompanyProfileService = require("../services/companyProfileServices");
const path = require("path");
const fs = require("fs");

module.exports = {

    // GET /company_profiles
    getCompanyProfiles(req, res) {
        CompanyProfileService.getAllCompanyProfilesService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data company profile", res);

            return response(200, result, "Berhasil mengambil data company profile", res);
        });
    },

    // GET /company_profiles/:id (berdasarkan primary key -> profileid)
    getCompanyProfileById(req, res) {
        const id = req.params.id;

        CompanyProfileService.getCompanyProfileByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data company profile", res);

            if (!result || result.length === 0) {
                return response(404, null, "Company profile tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil company profile", res);
        });
    },

    // GET /company_profiles/user/:user_id
    getCompanyProfileByUserId(req, res) {
        const userId = req.params.user_id;

        CompanyProfileService.getCompanyProfileByUserIdService(userId, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil company profile berdasarkan user_id", res);

            if (!result || result.length === 0) {
                return response(404, null, "Company profile untuk user ini tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil data company profile user", res);
        });
    },

    // POST /company_profiles
    postCompanyProfile(req, res) {
        try {
            const { user_id, companyName, province, city, phone, email, website, employeeCount, aboutUs, address, field } = req.body;

            // Validasi wajib
            if (!user_id || !companyName) {
                return response(400, null, "user_id dan companyName wajib diisi", res);
            }

            // --- HANDLE FILE UPLOAD PROFILE IMAGE ---
            let profileImage = null;
            let url_profile = null;

            if (req.files && req.files.profileImage) {
                const file = req.files.profileImage;
                const ext = path.extname(file.name);
                const fileName = file.md5 + ext;
                const allowedType = ['.png', '.jpg', '.jpeg'];

                if (!allowedType.includes(ext.toLowerCase())) {
                    return response(422, null, "Format gambar profile tidak valid", res);
                }

                if (file.size > 5000000) {
                    return response(422, null, "Ukuran gambar profile maksimal 5MB", res);
                }

                file.mv(`./src/uploads/profile-images/${fileName}`, (err) => {
                    if (err) return response(500, err, "Gagal upload profile image", res);
                });

                profileImage = fileName;
                url_profile = `${req.protocol}://${req.get("host")}/src/uploads/profile-images/${fileName}`;
            }

            // --- HANDLE FILE UPLOAD BANNER ---
            let backgroundImage = null;
            let url_banner = null;

            if (req.files && req.files.backgroundImage) {
                const file = req.files.backgroundImage;
                const ext = path.extname(file.name);
                const fileName = file.md5 + ext;
                const allowedType = ['.png', '.jpg', '.jpeg'];

                if (!allowedType.includes(ext.toLowerCase())) {
                    return response(422, null, "Format banner tidak valid", res);
                }

                if (file.size > 5000000) {
                    return response(422, null, "Ukuran banner maksimal 5MB", res);
                }

                file.mv(`./src/uploads/baground-images/${fileName}`, (err) => {
                    if (err) return response(500, err, "Gagal upload banner image", res);
                });

                backgroundImage = fileName;
                url_banner = `${req.protocol}://${req.get("host")}/src/uploads/baground-images/${fileName}`;
            }

            // Data untuk insert
            const data = {
                user_id,
                companyName,
                province,
                city,
                phone,
                email,
                website,
                employeeCount,
                aboutUs,
                address,
                field,
                profileImage,
                url_profile,
                backgroundImage,
                url_banner
            };

            // Insert ke database
            CompanyProfileService.insertCompanyProfileService(data, (error, result) => {
                if (error) return response(500, error, "Gagal menambahkan company profile", res);

                return response(
                    200,
                    { id: result.insertId, data },
                    "Company profile berhasil ditambahkan",
                    res
                );
            });

        } catch (error) {
            return response(500, error, "Terjadi kesalahan server", res);
        }
    },


    updateCompanyProfile(req, res) {
        const id = req.params.id;

        // Ambil data lama dulu
        CompanyProfileService.getCompanyProfileByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Company profile tidak ditemukan", res);

            const oldData = result[0];

            let profileImageName = oldData.profileImage;
            let bannerImageName = oldData.backgroundImage;

            // ======== HANDLE PROFILE IMAGE ========
            if (req.files && req.files.profileImage) {
                const file = req.files.profileImage;
                const ext = path.extname(file.name);
                const allowed = ['.png', '.jpg', '.jpeg'];

                if (!allowed.includes(ext.toLowerCase())) {
                    return response(422, null, "Format profile image tidak valid", res);
                }

                profileImageName = file.md5 + ext;

                // Hapus file lama
                if (oldData.profileImage) {
                    const oldPath = `./src/uploads/profile-images/${oldData.profileImage}`;
                    fs.unlink(oldPath, () => { });
                }

                file.mv(`./src/uploads/profile-images/${profileImageName}`, (err) => {
                    if (err) return response(500, err.message, "Gagal upload profile image", res);
                });
            }

            // ======== HANDLE BACKGROUND IMAGE ========
            if (req.files && req.files.backgroundImage) {
                const file = req.files.backgroundImage;
                const ext = path.extname(file.name);
                const allowed = ['.png', '.jpg', '.jpeg'];

                if (!allowed.includes(ext.toLowerCase())) {
                    return response(422, null, "Format background image tidak valid", res);
                }

                bannerImageName = file.md5 + ext;

                if (oldData.backgroundImage) {
                    const oldPath = `./src/uploads/baground-images/${oldData.backgroundImage}`;
                    fs.unlink(oldPath, () => { });
                }

                file.mv(`./src/uploads/baground-images/${bannerImageName}`, (err) => {
                    if (err) return response(500, err.message, "Gagal upload banner image", res);
                });
            }

            // URL baru
            const profileUrl = `${req.protocol}://${req.get("host")}/src/uploads/profile-images/${profileImageName}`;
            const bannerUrl = `${req.protocol}://${req.get("host")}/src/uploads/baground-images/${bannerImageName}`;

            const updatedData = {
                user_id: req.body.user_id || oldData.user_id,
                companyName: req.body.companyName || oldData.companyName,
                province: req.body.province || oldData.province,
                city: req.body.city || oldData.city,
                phone: req.body.phone || oldData.phone,
                email: req.body.email || oldData.email,
                website: req.body.website || oldData.website,
                employeeCount: req.body.employeeCount || oldData.employeeCount,
                aboutUs: req.body.aboutUs || oldData.aboutUs,
                address: req.body.address || oldData.address,
                field: req.body.field || oldData.field,
                profileImage: profileImageName,
                url_profile: profileUrl,
                backgroundImage: bannerImageName,
                url_banner: bannerUrl
            };

            CompanyProfileService.updateCompanyProfileService(id, updatedData, (error, result) => {
                if (error) return response(500, error, "Gagal mengupdate company profile", res);
                return response(200, updatedData, "Company profile berhasil diupdate", res);
            });
        });
    },


    // DELETE /company_profiles/:id
    deleteCompanyProfile(req, res) {
        const id = req.params.id;

        // Ambil data lama dulu
        CompanyProfileService.getCompanyProfileByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data company profile", res);
            if (!result || result.length === 0) {
                return response(404, null, "Company profile tidak ditemukan", res);
            }

            const data = result[0];

            // Path file lama
            const profilePath = `./src/uploads/profile-images/${data.profileImage}`;
            const bannerPath = `./src/uploads/baground-images/${data.backgroundImage}`;

            // Hapus profile image
            if (data.profileImage && fs.existsSync(profilePath)) {
                fs.unlink(profilePath, (err) => {
                    if (err) console.log("Gagal menghapus profile image:", err);
                });
            }

            // Hapus background image
            if (data.backgroundImage && fs.existsSync(bannerPath)) {
                fs.unlink(bannerPath, (err) => {
                    if (err) console.log("Gagal menghapus background image:", err);
                });
            }

            // Hapus data di database
            CompanyProfileService.deleteCompanyProfileService(id, (error, result) => {
                if (error) return response(500, error, "Gagal menghapus company profile", res);

                if (result.affectedRows) {
                    return response(
                        200,
                        { isSuccess: result.affectedRows, id },
                        "Company profile berhasil dihapus",
                        res
                    );
                }

                return response(404, null, "Company profile tidak ditemukan", res);
            });
        });
    }

};
