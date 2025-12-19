const response = require("../utils/response");
const AuthService = require("../services/authServices");

module.exports = {

    login(req, res) {
        const data = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };

        AuthService.loginService(data, (err, result) => {
            if (err) return response(400, err, "Login gagal", res);
            return response(200, result, "Login berhasil", res);
        });
    }
};
