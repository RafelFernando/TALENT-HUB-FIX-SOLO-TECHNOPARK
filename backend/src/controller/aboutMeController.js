const response = require("../utils/response");
const CvTentangSayaService = require("../services/aboutMeServices");

module.exports = {

    // GET /cv-tentang-saya
    getAll(req, res) {
        CvTentangSayaService.getAllService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            return response(200, result, "Berhasil mengambil data", res);
        });
    },

    // GET /cv-tentang-saya/:id
    getById(req, res) {
        const id = req.params.id;

        CvTentangSayaService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0)
                return response(404, null, "Data tidak ditemukan", res);

            return response(200, result[0], "Data ditemukan", res);
        });
    },

    // GET /cv-tentang-saya/user/:user_id
    getByUserId(req, res) {
        const user_id = req.params.user_id;

        CvTentangSayaService.getByUserIdService(user_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            return response(200, result, "Berhasil mengambil data", res);
        });
    },

    // POST /cv-tentang-saya
    create(req, res) {
        const { user_id, deskripsi } = req.body;

        const data = {
            user_id,
            deskripsi,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        CvTentangSayaService.createService(data, (err, result) => {
            if (err) return response(500, err, "Gagal menambahkan data", res);
            return response(201, result, "Data berhasil ditambahkan", res);
        });
    },

    // PUT /cv-tentang-saya/:id
    update(req, res) {
        const id = req.params.id;
        const { deskripsi } = req.body;

        const data = {
            deskripsi,
            updatedAt: Date.now()
        };

        CvTentangSayaService.updateService(id, data, (err, result) => {
            if (err) return response(500, err, "Gagal update data", res);
            return response(200, result, "Data berhasil diupdate", res);
        });
    },

    // DELETE /cv-tentang-saya/:id
    delete(req, res) {
        const id = req.params.id;

        CvTentangSayaService.deleteService(id, (err, result) => {
            if (err) return response(500, err, "Gagal menghapus data", res);
            return response(200, result, "Data berhasil dihapus", res);
        });
    }

};
