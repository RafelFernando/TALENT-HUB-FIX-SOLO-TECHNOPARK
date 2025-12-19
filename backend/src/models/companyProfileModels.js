const db = require("../config/connections");
 
module.exports = {
    // Ambil semua company profile
    getAllCompanyProfiles(callback) {
        const sql = "SELECT * FROM profile";
        db.query(sql, callback);
    },

    // Ambil company profile berdasarkan profileid
    getCompanyProfileById(profileid, callback) {
        const sql = "SELECT * FROM profile WHERE profileid = ?";
        db.query(sql, [profileid], callback);
    },

    // Ambil company profile berdasarkan user_id
    getCompanyProfileByUserId(user_id, callback) {
        const sql = "SELECT * FROM profile WHERE user_id = ?";
        db.query(sql, [user_id], callback);
    },

    // Insert company profile
    insertCompanyProfile(data, callback) {
        const sql = `
            INSERT INTO profile 
            (user_id, companyName, province, city, phone, email, website, employeeCount, aboutUs, address, field, profileImage, url_profile, backgroundImage, url_banner)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                data.user_id,
                data.companyName,
                data.province || null,
                data.city || null,
                data.phone || null,
                data.email || null,
                data.website || null,
                data.employeeCount || null,
                data.aboutUs || null,
                data.address || null,
                data.field || null,
                data.profileImage || null,
                data.url_profile || null,
                data.backgroundImage || null,
                data.url_banner || null
            ],
            callback
        );
    },

    // Update company profile
    updateCompanyProfile(profileid, data, callback) {
        const sql = `
            UPDATE profile SET
                user_id = ?,
                companyName = ?,
                province = ?,
                city = ?,
                phone = ?,
                email = ?,
                website = ?,
                employeeCount = ?,
                aboutUs = ?,
                address = ?,
                field = ?,
                profileImage = ?,
                url_profile = ?,
                backgroundImage = ?,
                url_banner = ?
            WHERE profileid = ?
        `;

        db.query(
            sql,
            [
                data.user_id,
                data.companyName,
                data.province || null,
                data.city || null,
                data.phone || null,
                data.email || null,
                data.website || null,
                data.employeeCount || null,
                data.aboutUs || null,
                data.address || null,
                data.field || null,
                data.profileImage || null,
                data.url_profile || null,
                data.backgroundImage || null,
                data.url_banner || null,
                profileid
            ],
            callback
        );
    },

    // Delete company profile
    deleteCompanyProfile(profileid, callback) {
        const sql = "DELETE FROM profile WHERE profileid = ?";
        db.query(sql, [profileid], callback);
    }
};
