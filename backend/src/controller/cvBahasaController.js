const response = require("../utils/response");
const CvBahasaService = require("../services/cvBahasaServices");

module.exports = {

    // GET /cv-bahasa
    getAll(req, res) {
        CvBahasaService.getAllService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil data bahasa", res);
            return response(200, result, "Berhasil mengambil data bahasa", res);
        });
    },

    // GET /cv-bahasa/user/:user_id
    getByUserId(req, res) {
        const user_id = req.params.user_id;

        CvBahasaService.getByUserIdService(user_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data bahasa", res);
            return response(200, result, "Berhasil mengambil data bahasa", res);
        });
    },

    // GET /cv-bahasa/:id
    getById(req, res) {
        const id = req.params.id;

        CvBahasaService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0)
                return response(404, null, "Data bahasa tidak ditemukan", res);

            return response(200, result[0], "Data bahasa ditemukan", res);
        });
    },

    // POST /cv-bahasa
    create(req, res) {
        const { user_id, bahasa } = req.body;

        if (!bahasa) {
            return response(400, null, "Bahasa wajib diisi", res);
        }

        CvBahasaService.createService({ user_id, bahasa }, (err, result) => {
            if (err) return response(500, err, "Gagal menambahkan bahasa", res);
            return response(201, result, "Bahasa berhasil ditambahkan", res);
        });
    },

    // PUT /cv-bahasa/:id
    update(req, res) {
        const id = req.params.id;
        const { bahasa } = req.body;

        if (!bahasa) {
            return response(400, null, "Bahasa wajib diisi", res);
        }

        CvBahasaService.updateService(id, { bahasa }, (err, result) => {
            if (err) return response(500, err, "Gagal update bahasa", res);
            return response(200, result, "Bahasa berhasil diupdate", res);
        });
    },

    // DELETE /cv-bahasa/:id
    delete(req, res) {
        const id = req.params.id;

        CvBahasaService.deleteService(id, (err, result) => {
            if (err) return response(500, err, "Gagal menghapus bahasa", res);
            return response(200, result, "Bahasa berhasil dihapus", res);
        });
    }
};
