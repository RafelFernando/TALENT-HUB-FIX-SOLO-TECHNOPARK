const response = require("../utils/response");
const CvSkillService = require("../services/cvSkillServices");

module.exports = {
    // GET /cvskill/user/:user_id
    getByUserId(req, res) {
        const user_id = req.params.user_id;

        CvSkillService.getByUserIdService(user_id, (err, result) => {
            if (err)
                return response(500, err, "Gagal mengambil data skill", res);

            return response(
                200,
                result,
                "Berhasil mengambil data skill",
                res
            );
        });
    },

    // POST /cvskill
    create(req, res) {
        const { user_id, skill, level } = req.body;

        if (!user_id || !skill || !level) {
            return response(400, null, "Data tidak lengkap", res);
        }

        CvSkillService.createService(
            { user_id, skill, level },
            (err, result) => {
                if (err)
                    return response(500, err, "Gagal menambahkan skill", res);

                return response(
                    201,
                    result,
                    "Skill berhasil ditambahkan",
                    res
                );
            }
        );
    },

    // PUT /cvskill/:id
    update(req, res) {
        const id = req.params.id;
        const { skill, level } = req.body;

        CvSkillService.updateService(
            id,
            { skill, level },
            (err, result) => {
                if (err)
                    return response(500, err, "Gagal mengubah skill", res);

                return response(
                    200,
                    result,
                    "Skill berhasil diubah",
                    res
                );
            }
        );
    },

    // DELETE /cvskill/:id
    delete(req, res) {
        const id = req.params.id;

        CvSkillService.deleteService(id, (err, result) => {
            if (err)
                return response(500, err, "Gagal menghapus skill", res);

            return response(
                200,
                result,
                "Skill berhasil dihapus",
                res
            );
        });
    }
};
