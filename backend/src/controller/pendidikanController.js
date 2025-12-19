const response = require("../utils/response");
const PendidikanService = require("../services/pendidikanServices");

module.exports = {

    // GET /pendidikan
    getPendidikan(req, res) {
        PendidikanService.getAllPendidikanService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data pendidikan", res);

            return response(200, result, "Berhasil mengambil data pendidikan", res);
        });
    },

    // GET /pendidikan/:id
    getPendidikanById(req, res) {
        const id = req.params.id;

        PendidikanService.getPendidikanByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data pendidikan", res);

            if (!result || result.length === 0) {
                return response(404, null, "Data pendidikan tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil data pendidikan", res);
        });
    },

    // POST /pendidikan
    postPendidikan(req, res) {
        const data = req.body;

        PendidikanService.insertPendidikanService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambahkan pendidikan", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: result.insertId
                    },
                    "Pendidikan berhasil ditambahkan",
                    res
                );
            }

            return response(400, null, "Pendidikan gagal ditambahkan", res);
        });
    },

    // PUT /pendidikan/:id
    updatePendidikan(req, res) {
        const id = req.params.id;
        const data = req.body;

        PendidikanService.updatePendidikanService(id, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate data pendidikan", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Data pendidikan berhasil diupdate",
                    res
                );
            }

            return response(404, null, "Data pendidikan tidak ditemukan", res);
        });
    },

    // DELETE /pendidikan/:id
    deletePendidikan(req, res) {
        const id = req.params.id;

        PendidikanService.deletePendidikanService(id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus data pendidikan", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Data pendidikan berhasil dihapus",
                    res
                );
            }

            return response(404, null, "Data pendidikan tidak ditemukan", res);
        });
    }
};
