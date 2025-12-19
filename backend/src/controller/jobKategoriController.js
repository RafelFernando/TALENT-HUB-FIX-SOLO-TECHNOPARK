const response = require("../utils/response");
const JobKategoriService = require("../services/jobKategoriServices");

module.exports = {

    // GET /job_categories
    getJobCategories(req, res) {
        JobKategoriService.getAllCategoriesService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data kategori pekerjaan", res);

            return response(200, result, "Berhasil mengambil data kategori pekerjaan", res);
        });
    },

    // GET /job_categories/:id
    getJobCategoryById(req, res) {
        const id = req.params.id;

        JobKategoriService.getCategoryByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data kategori pekerjaan", res);

            if (!result || result.length === 0) {
                return response(404, null, "Kategori pekerjaan tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil kategori pekerjaan", res);
        });
    },

    // POST /job_categories
    postJobCategory(req, res) {
        const data = req.body;

        JobKategoriService.insertCategoryService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambahkan kategori pekerjaan", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: result.insertId
                    },
                    "Kategori pekerjaan berhasil ditambahkan",
                    res
                );
            }

            return response(400, null, "Kategori pekerjaan gagal ditambahkan", res);
        });
    },

    // PUT /job_categories/:id
    updateJobCategory(req, res) {
        const id = req.params.id;
        const data = req.body;

        JobKategoriService.updateCategoryService(id, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate kategori pekerjaan", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Kategori pekerjaan berhasil diupdate",
                    res
                );
            }

            return response(404, null, "Kategori pekerjaan tidak ditemukan", res);
        });
    },

    // DELETE /job_categories/:id
    deleteJobCategory(req, res) {
        const id = req.params.id;

        JobKategoriService.deleteCategoryService(id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus kategori pekerjaan", res);

            if (result.affectedRows) {
                return response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: id
                    },
                    "Kategori pekerjaan berhasil dihapus",
                    res
                );
            }

            return response(404, null, "Kategori pekerjaan tidak ditemukan", res);
        });
    }
};
