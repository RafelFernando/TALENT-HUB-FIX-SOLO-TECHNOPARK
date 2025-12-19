const JobApplications = require("../models/jobApplicationsModels");

module.exports = {
    getAllApplicationsService(callback) {
        JobApplications.getAllApplications(callback);
    },

    getApplicationByIdService(application_id, callback) {
        JobApplications.getApplicationById(application_id, callback);
    },

    getApplicationsByJobIdService(job_id, callback) {
        JobApplications.getApplicationsByJobId(job_id, callback);
    },

    getApplicationsByCandidateIdService(candidate_id, callback) {
        JobApplications.getApplicationsByCandidateId(candidate_id, callback);
    },

    insertApplicationService(data, callback) {
        JobApplications.insertApplication(data, callback);
    },

    updateApplicationService(application_id, data, callback) {
        JobApplications.updateApplication(application_id, data, callback);
    },

    updateApplicationStatusService(application_id, status, callback) {
        JobApplications.updateApplicationStatus(application_id, status, callback);
    },

    deleteApplicationService(application_id, callback) {
        JobApplications.deleteApplication(application_id, callback);
    }
};
