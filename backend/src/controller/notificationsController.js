const response = require("../utils/response");
const notificationService = require("../services/notificationsServices");

module.exports = {
    getAll(req, res) {
        notificationService.getAllService((error, result) => {
            if (error) return response(500, error, "Gagal mengambil data notifikasi", res);

            return response(200, result, "Berhasil mengambil data notifikasi", res);
        });
    },

    getNotifikasiById(req, res) {
        const id = req.params.id;

        notificationService.getNotifikasiByIdService(id, (error, result) => {
            if (error) return response(500, error, "Gagal mengambil data notifikasi", res);

            if (!result || result.length === 0) {
                return response(404, null, "Data notifikasi tidak ditemukan", res);
            }

            return response(200, result[0], "Berhasil mengambil data notifikasi", res);
        });
    },

    getNotifikasiByUserId(req, res) {
        const user_id = req.params.user_id;
        notificationService.getNotifikasiByUserIdService(user_id, (err, result) => {
            if (err) return response(500, err, "Gagal mengambil data", res);
            if (result.length === 0) return response(404, null, "notifikasi tidak ditemukan", res);
            return response(200, result, "Berhasil mengambil notifikasi", res);
        });
    },

    create(req, res) {
        const { user_id, title, message, type } = req.body;

        if (!user_id|| !title || !message || !type) {
            return response(400, null, "Field tidak boleh kosong", res);
        }

        notificationService.createService(
            { user_id, title, message, type },
            (err, result) => {
                if (err)
                    return response(500, err, "Gagal menambahkan notifikasi", res);

                return response(201, result, "Berhasil menambahkan notifikasi", res);
            }
        );
    },

    update(req, res) {
        const id = req.params.id;
        const { user_id, title, message, type } = req.body;

        if (!id) {
            return response(400, null, "ID notifikasi tidak valid", res);
        }

        notificationService.updateService(
            id,
            { user_id, title, message, type },
            (err, result) => {
                if (err)
                    return response(500, err, "Gagal mengupdate notifikasi", res);

                return response(200, result, "Berhasil mengupdate notifikasi", res);
            }
        );
    },

    delete(req, res) {
        const id = req.params.id;

        notificationService.deleteService(id, (err, result) => {
            if (err)
                return response(500, err, "Gagal menghapus notifikasi", res);

            return response(200, result, "Berhasil menghapus notifikasi", res);
        });
    }
}
