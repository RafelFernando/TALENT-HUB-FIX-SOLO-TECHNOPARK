const response = require("../utils/response");
const RoleService = require("../services/userRoleServices");

module.exports = {
    getUserRoles(req, res) {
        const user_id = req.params.user_id;

        RoleService.getUserRoleService(user_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil role user", res);

            response(200, result, "Berhasil mengambil role user", res);
        });
    },

    postUserRole(req, res) {
        const data = req.body;

        RoleService.insertUserRoleService(data, (err, result) => {
            if (err) return response(500, err, "Gagal menambah role", res);

            if (result.affectedRows) {
                response(
                    200,
                    {
                        isSuccess: result.affectedRows,
                        id: result.insertId
                    },
                    "Role berhasil ditambahkan",
                    res
                );
            } else {
                response(400, null, "Role gagal ditambahkan", res);
            }
        });
    },

    updateUserRole(req, res) {
        const role_id = req.params.role_id;
        const data = req.body; // role_type, module_type, is_confirmed

        RoleService.updateUserRoleService(role_id, data, (err, result) => {
            if (err) return response(500, err, "Gagal mengupdate role", res);

            if (result.affectedRows) {
                response(
                    200,
                    { isUpdated: result.affectedRows },
                    "Role berhasil diperbarui",
                    res
                );
            } else {
                response(404, null, "Role tidak ditemukan", res);
            }
        });
    },

    deleteUserRole(req, res) {
        const role_id = req.params.role_id;

        RoleService.deleteUserRoleService(role_id, (err, result) => {
            if (err) return response(500, err, "Gagal menghapus role", res);

            if (result.affectedRows) {
                response(
                    200,
                    { isDeleted: result.affectedRows },
                    "Role berhasil dihapus",
                    res
                );
            } else {
                response(404, null, "Role tidak ditemukan", res);
            }
        });
    }
};
