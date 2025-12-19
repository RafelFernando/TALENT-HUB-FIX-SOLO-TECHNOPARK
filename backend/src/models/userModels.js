const db = require("../config/connections");

module.exports = {
    getAllUsers(callback) {
        const sql = "SELECT * FROM users";
        db.query(sql, callback);
    },
 
    getUserById(id, callback) {
        const sql = "SELECT * FROM users WHERE user_id = ?";
        db.query(sql, [id], callback);
    },

    insertUser(data, callback) {
        const sql = `
            INSERT INTO users 
            (username, email, password_hash, full_name, phone, profile_picture, email_verification_token, email_verified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                data.username,
                data.email,
                data.password_hash,
                data.full_name,
                data.phone,
                data.profile_picture,
                data.email_verification_token,
                data.email_verified
            ],
            callback
        );
    },

    updateUser(id, data, callback) {
        const sql = `
            UPDATE users SET 
                username = ?, 
                email = ?, 
                password_hash = ?, 
                full_name = ?, 
                phone = ?, 
                profile_picture = ?, 
                email_verified = ?
            WHERE user_id = ?
        `;
        db.query(
            sql,
            [
                data.username,
                data.email,
                data.password_hash,
                data.full_name,
                data.phone,
                data.profile_picture,
                data.email_verified,
                id
            ],
            callback
        );
    },

    deleteUser(id, callback) {
        const sql = "DELETE FROM users WHERE user_id = ?";
        db.query(sql, [id], callback);
    },

    verifyEmail(token) {
        const sql = `
            UPDATE users 
            SET email_verified=1, email_verified_at=NOW(), email_verification_token=NULL
            WHERE email_verification_token=?
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [token], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    findUserByToken(token) {
        const sql = "SELECT * FROM users WHERE email_verification_token=?";

        return new Promise((resolve, reject) => {
            db.query(sql, [token], (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });
    },

    createUserWithToken(username, email, password, token) {
        const sql = `
            INSERT INTO users 
            (username, email, password_hash, email_verification_token, email_verified)
            VALUES (?, ?, ?, ?, 0)
        `;

        return new Promise((resolve, reject) => {
            db.query(sql, [username, email, password, token], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};
