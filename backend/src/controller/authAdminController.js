const response = require("../utils/response");
const AuthAdminService = require("../services/authAdminServices");

module.exports = {

    loginAdmin(req, res) {
        const data = {
            email: req.body.email,
            password: req.body.password
        };

        AuthAdminService.loginAdminService(data, (err, result) => {
            if (err) return response(400, err, "Login admin gagal", res);

            return response(200, result, "Login admin berhasil", res);
        });
    }
};
