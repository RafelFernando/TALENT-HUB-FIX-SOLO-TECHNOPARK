const response = require("../utils/response");
const SavedJobsService = require("../services/savedJobsServices");

module.exports = {
    // GET semua saved jobs
    getSavedJobs(req, res) {
        SavedJobsService.getAllSavedJobsService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data saved jobs", res);
            return response(200, result, "Berhasil mengambil data saved jobs", res);
        });
    },

    // GET saved job berdasarkan ID
    getSavedJobById(req, res) {
        const id = req.params.id;
        SavedJobsService.getSavedJobByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil saved job", res);
            if (!result || result.length === 0) return response(404, null, "Saved job tidak ditemukan", res);
            return response(200, result[0], "Berhasil mengambil saved job", res);
        });
    },

    // GET saved jobs berdasarkan user_id
    getSavedJobsByUserId(req, res) {
        const user_id = req.params.user_id;
        SavedJobsService.getSavedJobsByUserIdService(user_id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil saved jobs user", res);
            return response(200, result, "Berhasil mengambil saved jobs user", res);
        });
    },

    // POST tambah saved job
    postSavedJob(req, res) {
        const data = req.body;
        if (!data.user_id || !data.job_id) return response(400, null, "user_id dan job_id harus diisi", res);

        SavedJobsService.insertSavedJobService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambah saved job", res);
            return response(200, { id: result.insertId }, "Saved job berhasil ditambahkan", res);
        });
    },

    // DELETE saved job
    deleteSavedJob(req, res) {
        const id = req.params.id;
        SavedJobsService.deleteSavedJobService(id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus saved job", res);
            if (result.affectedRows) return response(200, { id }, "Saved job berhasil dihapus", res);
            return response(404, null, "Saved job tidak ditemukan", res);
        });
    }
};
