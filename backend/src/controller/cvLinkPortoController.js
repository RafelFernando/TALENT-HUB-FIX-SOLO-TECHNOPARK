const response = require("../utils/response");
const CvLinkPortoService = require("../services/cvLinkPortoServices");

module.exports = {
    // GET /cvlinkporto/user/:user_id
    getByUser(req, res) {
        const userId = req.params.user_id;

        CvLinkPortoService.getByUserIdService(userId, (err, result) => {
            if (err)
                return response(500, err, "Gagal mengambil data link portofolio", res);

            return response(200, result, "Berhasil mengambil data link portofolio", res);
        });
    },

    // POST /cvlinkporto
    create(req, res) {
        const { user_id, nama, link } = req.body;

        if (!user_id || !nama || !link) {
            return response(400, null, "Field tidak boleh kosong", res);
        }

        CvLinkPortoService.createService(
            { user_id, nama, link },
            (err, result) => {
                if (err)
                    return response(500, err, "Gagal menambahkan link portofolio", res);

                return response(201, result, "Berhasil menambahkan link portofolio", res);
            }
        );
    },

    // PUT /cvlinkporto/:id
    update(req, res) {
        const id = req.params.id;
        const { nama, link } = req.body;

        CvLinkPortoService.updateService(
            id,
            { nama, link },
            (err, result) => {
                if (err)
                    return response(500, err, "Gagal mengupdate link portofolio", res);

                return response(200, result, "Berhasil mengupdate link portofolio", res);
            }
        );
    },

    // DELETE /cvlinkporto/:id
    delete(req, res) {
        const id = req.params.id;

        CvLinkPortoService.deleteService(id, (err, result) => {
            if (err)
                return response(500, err, "Gagal menghapus link portofolio", res);

            return response(200, result, "Berhasil menghapus link portofolio", res);
        });
    }
};
