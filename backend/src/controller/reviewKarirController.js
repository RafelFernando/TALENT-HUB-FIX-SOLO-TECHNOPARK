const response = require("../utils/response");
const ReviewService = require("../services/reviewKarirServices");
const path = require("path");
const fs = require("fs");

module.exports = {

    getAll(req, res) {
        ReviewService.getAllService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil data review", res);
            return response(200, result, "Berhasil mengambil review", res);
        });
    },

    getById(req, res) {
        const id = req.params.id;

        ReviewService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Review tidak ditemukan", res);

            return response(200, result[0], "Berhasil mengambil review", res);
        });
    },

    create(req, res) {
        if (!req.files || !req.files.gambar) {
            return response(400, null, "Gambar wajib diupload", res);
        }

        const file = req.files.gambar;           // gambar dari form
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        const url = `${req.protocol}://${req.get('host')}/src/uploads/reviews/${fileName}`;

        if (!allowedType.includes(ext.toLowerCase())) {
            return response(422, null, "Format gambar tidak valid", res);
        }

        if (fileSize > 5000000) {
            return response(422, null, "Ukuran gambar maksimal 5MB", res);
        }

        // Pindahkan gambar ke folder public
        file.mv(`./src/uploads/reviews/${fileName}`, (err) => {
            if (err) return response(500, err.message, "Gagal upload file", res);

            const data = {
                nama: req.body.nama,
                pekerjaan: req.body.pekerjaan,
                komentar: req.body.komentar,
                gambar: fileName,
                url: url
            };

            ReviewService.createService(data, (err, result) => {
                if (err) return response(500, err, "Gagal menambah review", res);
                return response(200, data, "Review berhasil ditambahkan", res);
            });
        });
    },

    update(req, res) {
        const id = req.params.id;

        ReviewService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Review tidak ditemukan", res);

            const oldData = result[0];
            let fileName = oldData.gambar; // default tetap file lama

            // Jika user upload gambar baru
            if (req.files && req.files.gambar) {
                const file = req.files.gambar;
                const fileSize = file.data.length;
                const ext = path.extname(file.name);
                fileName = file.md5 + ext;

                const allowedType = ['.png', '.jpg', '.jpeg'];

                if (!allowedType.includes(ext.toLowerCase())) {
                    return response(422, null, "Format gambar tidak valid", res);
                }

                if (fileSize > 5000000) {
                    return response(422, null, "Ukuran gambar maksimal 5MB", res);
                }

                // Hapus gambar lama jika ada
                const oldPath = `./src/uploads/reviews/${oldData.gambar}`;
                fs.unlink(oldPath, (err) => {
                    if (err) console.log("Gagal hapus gambar lama:", err);
                });

                // Upload gambar baru
                file.mv(`./src/uploads/reviews/${fileName}`, (err) => {
                    if (err) return response(500, err.message, "Gagal upload gambar baru", res);
                });
            }

            // URL terbaru
            const url = `${req.protocol}://${req.get('host')}/src/uploads/reviews/${fileName}`;

            const newData = {
                nama: req.body.nama || oldData.nama,
                pekerjaan: req.body.pekerjaan || oldData.pekerjaan,
                komentar: req.body.komentar || oldData.komentar,
                gambar: fileName,
                url: url
            };

            ReviewService.updateService(id, newData, (err, result) => {
                if (err) return response(500, err, "Gagal mengupdate review", res);
                return response(200, newData, "Review berhasil diupdate", res);
            });
        });
    },

    delete(req, res) {
        const id = req.params.id;

        // Ambil data lama terlebih dahulu
        ReviewService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Review tidak ditemukan", res);

            const data = result[0];

            // Path gambar lama
            const filePath = `./src/uploads/reviews/${data.gambar}`;

            // Hapus gambar jika ada
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) console.log("Gagal menghapus gambar:", err);
                });
            }

            // Hapus data di database
            ReviewService.deleteService(id, (err, result) => {
                if (err) return response(500, err, "Gagal menghapus review", res);

                return response(200, null, "Review berhasil dihapus", res);
            });
        });
    }


};  
