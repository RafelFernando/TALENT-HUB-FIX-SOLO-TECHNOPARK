const response = require("../utils/response");
const AgamaService = require("../services/agamaServices");

module.exports = {

    // GET /agama
    getAgama(req, res) {
        AgamaService.getAllAgamaService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data agama", res);

            return response(200, result, "Berhasil mengambil data agama", res);
        });
    },

    // GET /agama/:id
    getAgamaById(req, res) {
        const id = req.params.id;

        AgamaService.getAgamaByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data agama", res);

            if (!result || result.length === 0) {
                return response(404, null, "Data agama tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil data agama", res);
        });
    },

    // POST /agama
    postAgama(req, res) {
        const data = req.body;

        AgamaService.insertAgamaService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambahkan agama", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: result.insertId
                    },
                    "Agama berhasil ditambahkan",
                    res
                );
            }

            return response(400, null, "Agama gagal ditambahkan", res);
        });
    },

    // PUT /agama/:id
    updateAgama(req, res) {
        const id = req.params.id;
        const data = req.body;

        AgamaService.updateAgamaService(id, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate data agama", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Data agama berhasil diupdate",
                    res
                );
            }

            return response(404, null, "Data agama tidak ditemukan", res);
        });
    },

    // DELETE /agama/:id
    deleteAgama(req, res) {
        const id = req.params.id;

        AgamaService.deleteAgamaService(id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus data agama", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Data agama berhasil dihapus",
                    res
                );
            }

            return response(404, null, "Data agama tidak ditemukan", res);
        });
    }
};
