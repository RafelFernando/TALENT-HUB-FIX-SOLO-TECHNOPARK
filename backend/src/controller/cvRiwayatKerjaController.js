const response = require("../utils/response");
const CvRiwayatKerjaService = require("../services/cvRiwayatKerjaServices");

module.exports = {

    // =============================
    // GET BY USER
    // =============================
    getByUser(req, res) {
        const userId = req.params.user_id;

        CvRiwayatKerjaService.getByUserIdService(userId, (err, result) => {
            if (err) {
                return response(500, err, "Gagal mengambil riwayat kerja", res);
            }
            return response(200, result, "Berhasil mengambil data riwayat kerja", res);
        });
    },

    // =============================
    // CREATE
    // =============================
    create(req, res) {
        const data = req.body;

        CvRiwayatKerjaService.createService(data, (err, result) => {
            if (err) {
                return response(500, err, "Gagal menambahkan riwayat kerja", res);
            }
            return response(201, result, "Riwayat kerja berhasil ditambahkan", res);
        });
    },

    // =============================
    // UPDATE
    // =============================
    update(req, res) {
        const id = req.params.id;
        const data = req.body;

        CvRiwayatKerjaService.updateService(id, data, (err, result) => {
            if (err) {
                return response(500, err, "Gagal mengupdate riwayat kerja", res);
            }
            return response(200, result, "Riwayat kerja berhasil diupdate", res);
        });
    },

    // =============================
    // DELETE
    // =============================
    delete(req, res) {
        const id = req.params.id;

        CvRiwayatKerjaService.deleteService(id, (err, result) => {
            if (err) {
                return response(500, err, "Gagal menghapus riwayat kerja", res);
            }
            return response(200, result, "Riwayat kerja berhasil dihapus", res);
        });
    }
};
