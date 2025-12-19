const db = require("../config/connections");

module.exports = {
    getAllService(callback) {
        const sql = `SELECT * FROM jobseekerinfo`;
        db.query(sql, callback);
    },

    getByIdService(id, callback) {
        const sql = `SELECT * FROM jobseekerinfo WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    getByUserIdService(user_id, callback) {
        const sql = `SELECT * FROM jobseekerinfo WHERE user_id = ?`;
        db.query(sql, [user_id], callback);
    },

    createService(data, callback) {
        const sql = `INSERT INTO jobseekerinfo (user_id, nik, birth_date, birth_place, gender, domicile, last_education, religion, profil, url) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [data.user_id, data.nik, data.birth_date, data.birth_place, data.gender, data.domicile, data.last_education, data.religion, data.profil, data.url];
        db.query(sql, values, callback);
    },

    updateService(id, data, callback) {
        const sql = `UPDATE jobseekerinfo SET nik=?, birth_date=?, birth_place=?, gender=?, domicile=?, last_education=?, religion=?, profil=?, url=? WHERE id=?`;
        const values = [data.nik, data.birth_date, data.birth_place, data.gender, data.domicile, data.last_education, data.religion, data.profil, data.url, id];
        db.query(sql, values, callback);
    },

    deleteService(id, callback) {
        const sql = `DELETE FROM jobseekerinfo WHERE id=?`;
        db.query(sql, [id], callback);
    }
};
