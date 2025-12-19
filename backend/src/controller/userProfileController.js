const response = require("../utils/response");
const JobseekerInfoService = require("../services/userProfileServices");
const path = require("path");
const fs = require("fs");

module.exports = {
    getAll(req, res) {
        JobseekerInfoService.getAllService((err, result) => {
            if (err) return response(500, err, "Gagal mengambil data jobseeker", res);
            return response(200, result, "Berhasil mengambil data jobseeker", res);
        });
    },

    getById(req, res) {
        const id = req.params.id;
        JobseekerInfoService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Jobseeker tidak ditemukan", res);
            return response(200, result[0], "Berhasil mengambil data jobseeker", res);
        });
    },

    getByUserId(req, res) {
        const user_id = req.params.user_id;
        JobseekerInfoService.getByUserIdService(user_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Jobseeker tidak ditemukan", res);
            return response(200, result[0], "Berhasil mengambil data jobseeker", res);
        });
    },

    create(req, res) {
        if (!req.files || !req.files.profil) {
            return response(400, null, "Profil wajib diupload", res);
        }

        const file = req.files.profil;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        const url = `${req.protocol}://${req.get('host')}/src/uploads/profile-images/${fileName}`;

        if (!allowedType.includes(ext.toLowerCase())) {
            return response(422, null, "Format profil tidak valid", res);
        }

        if (fileSize > 5000000) {
            return response(422, null, "Ukuran profil maksimal 5MB", res);
        }

        file.mv(`./src/uploads/profile-images/${fileName}`, (err) => {
            if (err) return response(500, err.message, "Gagal upload profil", res);

            const data = {
                user_id: req.body.user_id,
                nik: req.body.nik,
                birth_date: req.body.birth_date,
                birth_place: req.body.birth_place,
                gender: req.body.gender,
                domicile: req.body.domicile,
                last_education: req.body.last_education,
                religion: req.body.religion,
                profil: fileName,
                url: url
            };

            JobseekerInfoService.createService(data, (err, result) => {
                if (err) return response(500, err, "Gagal menambah jobseeker", res);
                return response(200, data, "Jobseeker berhasil ditambahkan", res);
            });
        });
    },

    update(req, res) {
        const id = req.params.id;

        JobseekerInfoService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Jobseeker tidak ditemukan", res);

            const oldData = result[0];
            let fileName = oldData.profil;

            if (req.files && req.files.profil) {
                const file = req.files.profil;
                const fileSize = file.data.length;
                const ext = path.extname(file.name);
                fileName = file.md5 + ext;

                const allowedType = ['.png', '.jpg', '.jpeg'];
                if (!allowedType.includes(ext.toLowerCase())) return response(422, null, "Format profil tidak valid", res);
                if (fileSize > 5000000) return response(422, null, "Ukuran profil maksimal 5MB", res);

                const oldPath = `./src/uploads/profile-images/${oldData.profil}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

                file.mv(`./src/uploads/profile-images/${fileName}`, (err) => {
                    if (err) return response(500, err.message, "Gagal upload profil baru", res);
                });
            }

            const url = `${req.protocol}://${req.get('host')}/src/uploads/profile-images/${fileName}`;

            const newData = {
                nik: req.body.nik || oldData.nik,
                birth_date: req.body.birth_date || oldData.birth_date,
                birth_place: req.body.birth_place || oldData.birth_place,
                gender: req.body.gender || oldData.gender,
                domicile: req.body.domicile || oldData.domicile,
                last_education: req.body.last_education || oldData.last_education,
                religion: req.body.religion || oldData.religion,
                profil: fileName,
                url: url
            };

            JobseekerInfoService.updateService(id, newData, (err, result) => {
                if (err) return response(500, err, "Gagal mengupdate jobseeker", res);
                return response(200, newData, "Jobseeker berhasil diupdate", res);
            });
        });
    },

    delete(req, res) {
        const id = req.params.id;

        JobseekerInfoService.getByIdService(id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "Jobseeker tidak ditemukan", res);

            const data = result[0];
            const filePath = `./src/uploads/profile-images/${data.profil}`;
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            JobseekerInfoService.deleteService(id, (err, result) => {
                if (err) return response(500, err, "Gagal menghapus jobseeker", res);
                return response(200, null, "Jobseeker berhasil dihapus", res);
            });
        });
    }
};
