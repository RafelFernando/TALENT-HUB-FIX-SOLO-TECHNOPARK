const JobPosting = require("../models/jobPostingModels");

module.exports = {
    // GET semua job posting
    getAllJobsService(callback) {
        JobPosting.getAllJobs(callback);
    },

    // GET job berdasarkan ID
    getJobByIdService(job_id, callback) {
        JobPosting.getJobById(job_id, callback);
    },

    // GET job berdasarkan employer_id
    getJobsByEmployerIdService(employer_id, callback) {
        JobPosting.getJobsByEmployerId(employer_id, callback);
    },

    // GET /jobs/category/:category_id
    getJobsByCategory(req, res) {
        const category_id = req.params.category_id;
        JobPostingService.getJobsByCategoryService(category_id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data job", res);
            return response(200, result, "Berhasil mengambil data job berdasarkan kategori", res);
        });
    },

    // GET job berdasarkan category_id
    getJobsByCategoryService(category_id, callback) {
        JobPosting.getJobsByCategory(category_id, callback);
    },

    // POST tambah job
    insertJobService(data, callback) {
        JobPosting.insertJob(data, callback);
    },

    // PUT update job
    updateJobService(job_id, data, callback) {
        JobPosting.updateJob(job_id, data, callback);
    },

    // DELETE job
    deleteJobService(job_id, callback) {
        JobPosting.deleteJob(job_id, callback);
    }
};
