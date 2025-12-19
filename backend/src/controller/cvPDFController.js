const response = require("../utils/response");
const CvPdfService = require("../services/cvPDFServices");
const path = require("path");
const fs = require("fs");

module.exports = {

    // GET ALL
    getAll(req, res) {
        CvPdfService.getAllService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil CV", res);
            return response(200, result, "Berhasil mengambil CV", res);
        });
    },

    // GET BY ID
    getById(req, res) {
        const id = req.params.id;

        CvPdfService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "CV tidak ditemukan", res);

            return response(200, result[0], "Berhasil mengambil CV", res);
        });
    },

    // GET BY USER ID
    getByUserId(req, res) {
        const user_id = req.params.user_id;

        CvPdfService.getByUserIdService(user_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "CV belum diupload", res);

            return response(200, result[0], "Berhasil mengambil CV", res);
        });
    },

    // CREATE
    create(req, res) {
        if (!req.files || !req.files.file) {
            return response(400, null, "File CV wajib diupload", res);
        }

        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const allowedType = [".pdf"];

        if (!allowedType.includes(ext.toLowerCase())) {
            return response(422, null, "File harus PDF", res);
        }

        if (fileSize > 5_000_000) {
            return response(422, null, "Ukuran file maksimal 5MB", res);
        }

        const url = `${req.protocol}://${req.get("host")}/src/uploads/cv/${fileName}`;

        file.mv(`./src/uploads/cv/${fileName}`, (err) => {
            if (err) return response(500, err.message, "Gagal upload CV", res);

            const data = {
                user_id: req.body.user_id,
                file: fileName,
                url: url
            };

            CvPdfService.createService(data, (err) => {
                if (err) return response(500, err, "Gagal menyimpan CV", res);
                return response(200, data, "CV berhasil diupload", res);
            });
        });
    },

    // UPDATE
    update(req, res) {
        const id = req.params.id;

        CvPdfService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "CV tidak ditemukan", res);

            const oldData = result[0];
            let fileName = oldData.file;

            if (req.files && req.files.file) {
                const file = req.files.file;
                const ext = path.extname(file.name);
                const allowedType = [".pdf"];

                if (!allowedType.includes(ext.toLowerCase())) {
                    return response(422, null, "File harus PDF", res);
                }

                const oldPath = `./src/uploads/cv/${oldData.file}`;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }

                fileName = file.md5 + ext;
                file.mv(`./src/uploads/cv/${fileName}`, (err) => {
                    if (err) return response(500, err.message, "Gagal upload CV baru", res);
                });
            }

            const url = `${req.protocol}://${req.get("host")}/src/uploads/cv/${fileName}`;

            const newData = {
                file: fileName,
                url: url
            };

            CvPdfService.updateService(id, newData, (err) => {
                if (err) return response(500, err, "Gagal update CV", res);
                return response(200, newData, "CV berhasil diupdate", res);
            });
        });
    },

    // DELETE
    delete(req, res) {
        const id = req.params.id;

        CvPdfService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "CV tidak ditemukan", res);

            const data = result[0];
            const filePath = `./src/uploads/cv/${data.file}`;

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            CvPdfService.deleteService(id, (err) => {
                if (err) return response(500, err, "Gagal menghapus CV", res);
                return response(200, null, "CV berhasil dihapus", res);
            });
        });
    }
};
