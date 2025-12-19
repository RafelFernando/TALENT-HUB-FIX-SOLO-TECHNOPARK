const response = require("../utils/response");
const JobApplicationsService = require("../services/jobApplicationsService");

module.exports = {

    // GET /applications
    getApplications(req, res) {
        JobApplicationsService.getAllApplicationsService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil data aplikasi", res);
            return response(200, result, "Berhasil mengambil data aplikasi", res);
        });
    },

    // GET /applications/:id
    getApplicationById(req, res) {
        const id = req.params.id;

        JobApplicationsService.getApplicationByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil aplikasi", res);
            if (!result || result.length === 0)
                return response(404, null, "Aplikasi tidak ditemukan", res);

            return response(200, result[0], "Berhasil mengambil aplikasi", res);
        });
    },

    // GET /applications/job/:job_id
    getApplicationsByJobId(req, res) {
        const job_id = req.params.job_id;

        JobApplicationsService.getApplicationsByJobIdService(job_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil aplikasi", res);
            return response(200, result, "Berhasil mengambil aplikasi untuk job ini", res);
        });
    },

    // GET /applications/candidate/:candidate_id
    getApplicationsByCandidateId(req, res) {
        const candidate_id = req.params.candidate_id;

        JobApplicationsService.getApplicationsByCandidateIdService(candidate_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil aplikasi", res);
            return response(200, result, "Berhasil mengambil aplikasi kandidat", res);
        });
    },

    // POST /applications
    postApplication(req, res) {
        const { job_id, candidate_id } = req.body;

        if (!job_id || !candidate_id) {
            return response(400, null, "job_id dan candidate_id wajib diisi", res);
        }

        const data = {
            job_id,
            candidate_id,
            status: "Submitted",
            applied_at: new Date()
        };

        JobApplicationsService.insertApplicationService(data, (err, result) => {
            if (err) return response(500, err, "Gagal menambahkan aplikasi", res);

            return response(
                201,
                { id: result.insertId },
                "Aplikasi berhasil dikirim",
                res
            );
        });
    },

    // PUT /applications/:id/status
    updateApplicationStatus(req, res) {
        const id = req.params.id;
        const { status } = req.body;

        if (!status) {
            return response(400, null, "Status wajib diisi", res);
        }

        JobApplicationsService.updateApplicationStatusService(
            id,
            status,
            (err, result) => {
                if (err) return response(500, err, "Gagal mengupdate status", res);
                if (!result.affectedRows)
                    return response(404, null, "Aplikasi tidak ditemukan", res);

                return response(200, { id, status }, "Status aplikasi diperbarui", res);
            }
        );
    },

    // DELETE /applications/:id
    deleteApplication(req, res) {
        const id = req.params.id;

        JobApplicationsService.deleteApplicationService(id, (err, result) => {
            if (err) return response(500, err, "Gagal menghapus aplikasi", res);
            if (!result.affectedRows)
                return response(404, null, "Aplikasi tidak ditemukan", res);

            return response(200, { id }, "Aplikasi berhasil dihapus", res);
        });
    }
};
