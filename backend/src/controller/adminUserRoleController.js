const response = require("../utils/response");
const UserRoleService = require("../services/adminUserRoleServices");

module.exports = {

    getAllUsers(req, res) {
        UserRoleService.getAllUsersService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil data users", res);
            return response(200, result, "Berhasil mengambil semua user", res);
        });
    },

    getEmployers(req, res) {
        UserRoleService.getUsersByRoleService("employer", (err, result) => {
            if (err) return response(500, err, "Gagal mengambil employer", res);
            return response(200, result, "Berhasil mengambil semua employer", res);
        });
    },

    getJobSeekers(req, res) {
        UserRoleService.getUsersByRoleService("job_seeker", (err, result) => {
            if (err) return response(500, err, "Gagal mengambil job seeker", res);
            return response(200, result, "Berhasil mengambil semua job seeker", res);
        });
    }
};
