const CompanyProfile = require("../models/companyProfileModels");

module.exports = {

    getAllCompanyProfilesService(callback) {
        CompanyProfile.getAllCompanyProfiles(callback);
    },

    getCompanyProfileByIdService(id, callback) {
        CompanyProfile.getCompanyProfileById(id, callback);
    },

    getCompanyProfileByUserIdService(user_id, callback) {
        CompanyProfile.getCompanyProfileByUserId(user_id, callback);
    },

    insertCompanyProfileService(data, callback) {
        CompanyProfile.insertCompanyProfile(data, callback);
    },

    updateCompanyProfileService(id, data, callback) {
        CompanyProfile.updateCompanyProfile(id, data, callback);
    },

    deleteCompanyProfileService(id, callback) {
        CompanyProfile.deleteCompanyProfile(id, callback);
    }

};
