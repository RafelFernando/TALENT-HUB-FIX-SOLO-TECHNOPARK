const SavedJobs = require("../models/savedJobsModels");

module.exports = {
    getAllSavedJobsService(callback) {
        SavedJobs.getAllSavedJobs(callback);
    },

    getSavedJobByIdService(id, callback) {
        SavedJobs.getSavedJobById(id, callback);
    },

    getSavedJobsByUserIdService(user_id, callback) {
        SavedJobs.getSavedJobsByUserId(user_id, callback);
    },

    insertSavedJobService(data, callback) {
        SavedJobs.insertSavedJob(data, callback);
    },

    deleteSavedJobService(id, callback) {
        SavedJobs.deleteSavedJob(id, callback);
    }
};
