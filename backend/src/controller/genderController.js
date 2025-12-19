const response = require("../utils/response");
const GenderService = require("../services/genderService");

module.exports = {

    // GET /gender
    getGender(req, res) {
        GenderService.getAllGenderService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data gender", res);

            return response(200, result, "Berhasil mengambil data gender", res);
        });
    },

    // GET /gender/:id
    getGenderById(req, res) {
        const id = req.params.id;

        GenderService.getGenderByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data gender", res);

            if (!result || result.length === 0) {
                return response(404, null, "Data gender tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil data gender", res);
        });
    },

    // POST /gender
    postGender(req, res) {
        const data = req.body;

        GenderService.insertGenderService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambahkan gender", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: result.insertId
                    },
                    "Gender berhasil ditambahkan",
                    res
                );
            }

            return response(400, null, "Gender gagal ditambahkan", res);
        });
    },

    // PUT /gender/:id
    updateGender(req, res) {
        const id = req.params.id;
        const data = req.body;

        GenderService.updateGenderService(id, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate data gender", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Data gender berhasil diupdate",
                    res
                );
            }

            return response(404, null, "Data gender tidak ditemukan", res);
        });
    },

    // DELETE /gender/:id
    deleteGender(req, res) {
        const id = req.params.id;

        GenderService.deleteGenderService(id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus data gender", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Data gender berhasil dihapus",
                    res
                );
            }

            return response(404, null, "Data gender tidak ditemukan", res);
        });
    }
};
