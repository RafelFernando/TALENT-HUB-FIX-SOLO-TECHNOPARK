const response = require("../utils/response");
const JobPostingService = require("../services/jobPostingServices");

module.exports = {
    // GET /jobs
    getJobs(req, res) {
        JobPostingService.getAllJobsService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data job", res);
            return response(200, result, "Berhasil mengambil data job", res);
        });
    },

    // GET /jobs/:id
    getJobById(req, res) {
        const job_id = req.params.id;
        JobPostingService.getJobByIdService(job_id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data job", res);
            if (!result || result.length === 0) return response(404, null, "Job tidak ditemukan", res);
            return response(200, result[0], "Berhasil mengambil data job", res);
        });
    },

    // GET /jobs/employer/:employer_id
    getJobsByEmployer(req, res) {
        const employer_id = req.params.employer_id;
        JobPostingService.getJobsByEmployerIdService(employer_id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data job", res);
            return response(200, result, "Berhasil mengambil data job", res);
        });
    },

    getJobsByCategory(req, res) {
        const category_id = req.params.category_id;
        JobPostingService.getJobsByCategoryService(category_id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data job", res);
            return response(200, result, "Berhasil mengambil data job berdasarkan kategori", res);
        });
    },

    // POST /jobs
    postJob(req, res) {
        const data = req.body;
        if (!data.employer_id || !data.title || !data.job_category_id || !data.employment_type) {
            return response(400, null, "Employer, title, category, dan employment_type harus diisi", res);
        }

        JobPostingService.insertJobService(data, (error, result) => {
            if (error) return response(500, error, "Gagal menambahkan job", res);
            if (result.affectedRows)
                return response(200, { isSuccess: result.affectedRows, job_id: result.insertId }, "Job berhasil ditambahkan", res);
            return response(400, null, "Job gagal ditambahkan", res);
        });
    },

    // PUT /jobs/:id
    updateJob(req, res) {
        const job_id = req.params.id;
        const data = req.body;
        JobPostingService.updateJobService(job_id, data, (error, result) => {
            if (error) return response(500, error, "Gagal mengupdate job", res);
            if (result.affectedRows)
                return response(200, { isSuccess: result.affectedRows, job_id }, "Job berhasil diupdate", res);
            return response(404, null, "Job tidak ditemukan", res);
        });
    },

    // DELETE /jobs/:id
    deleteJob(req, res) {
        const job_id = req.params.id;
        JobPostingService.deleteJobService(job_id, (error, result) => {
            if (error) return response(500, error, "Gagal menghapus job", res);
            if (result.affectedRows)
                return response(200, { isSuccess: result.affectedRows, job_id }, "Job berhasil dihapus", res);
            return response(404, null, "Job tidak ditemukan", res);
        });
    }
};
