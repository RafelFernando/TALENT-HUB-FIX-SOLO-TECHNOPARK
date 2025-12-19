const db = require("../config/connections");

module.exports = {
    // Ambil semua job posting lengkap dengan kategori dan employer
    getAllJobs(callback) {
        const sql = `
        SELECT 
            j.*,

            -- USER
            u.full_name AS employer_name,
            u.email AS employer_email,
            u.phone AS employer_phone,
            u.profile_picture AS employer_profile_picture,
            u.status AS employer_status,

            -- EMPLOYER PROFILE
            p.companyName AS company_name,
            p.province AS company_province,
            p.city AS company_city,
            p.phone AS company_phone,
            p.email AS company_email,
            p.website AS company_website,
            p.employeeCount AS company_employee_count,
            p.aboutUs AS company_about,
            p.address AS company_address,
            p.field AS company_field,
            p.profileImage AS company_profile_image,
            p.backgroundImage AS company_background_image,

            -- CATEGORY
            c.name AS category_name,
            c.status AS category_status

        FROM job_posts j
        LEFT JOIN users u ON j.employer_id = u.user_id
        LEFT JOIN profile p ON u.user_id = p.user_id
        LEFT JOIN job_categories c ON j.job_category_id = c.category_id
        ORDER BY j.job_id DESC
    `;
        db.query(sql, callback);
    },


    // Ambil job posting berdasarkan ID
    getJobById(job_id, callback) {
        const sql = `
        SELECT 
            j.*,

            u.full_name AS employer_name,
            u.email AS employer_email,
            u.phone AS employer_phone,
            u.profile_picture AS employer_profile_picture,
            u.status AS employer_status,

            p.companyName AS company_name,
            p.province AS company_province,
            p.city AS company_city,
            p.phone AS company_phone,
            p.email AS company_email,
            p.website AS company_website,
            p.employeeCount AS company_employee_count,
            p.aboutUs AS company_about,
            p.address AS company_address,
            p.field AS company_field,
            p.profileImage AS company_profile_image,
            p.backgroundImage AS company_background_image,

            c.name AS category_name,
            c.status AS category_status

        FROM job_posts j
        LEFT JOIN users u ON j.employer_id = u.user_id
        LEFT JOIN profile p ON u.user_id = p.user_id
        LEFT JOIN job_categories c ON j.job_category_id = c.category_id
        WHERE j.job_id = ?
    `;
        db.query(sql, [job_id], callback);
    },


    // Ambil job posting berdasarkan employer_id
    getJobsByEmployerId(employer_id, callback) {
        const sql = `
        SELECT 
            j.*,

            u.full_name AS employer_name,
            u.email AS employer_email,
            u.phone AS employer_phone,
            u.profile_picture AS employer_profile_picture,
            u.status AS employer_status,

            p.companyName AS company_name,
            p.province AS company_province,
            p.city AS company_city,
            p.phone AS company_phone,
            p.email AS company_email,
            p.website AS company_website,
            p.employeeCount AS company_employee_count,
            p.aboutUs AS company_about,
            p.address AS company_address,
            p.field AS company_field,
            p.profileImage AS company_profile_image,
            p.backgroundImage AS company_background_image,

            c.name AS category_name,
            c.status AS category_status

        FROM job_posts j
        LEFT JOIN users u ON j.employer_id = u.user_id
        LEFT JOIN profile p ON u.user_id = p.user_id
        LEFT JOIN job_categories c ON j.job_category_id = c.category_id
        WHERE j.employer_id = ?
    `;
        db.query(sql, [employer_id], callback);
    },


    // Ambil job posting berdasarkan category_id
    getJobsByCategory(category_id, callback) {
        const sql = `
        SELECT 
            j.*,

            u.full_name AS employer_name,
            u.email AS employer_email,
            u.phone AS employer_phone,
            u.profile_picture AS employer_profile_picture,
            u.status AS employer_status,

            p.companyName AS company_name,
            p.province AS company_province,
            p.city AS company_city,
            p.phone AS company_phone,
            p.email AS company_email,
            p.website AS company_website,
            p.employeeCount AS company_employee_count,
            p.aboutUs AS company_about,
            p.address AS company_address,
            p.field AS company_field,
            p.profileImage AS company_profile_image,
            p.backgroundImage AS company_background_image,

            c.name AS category_name,
            c.status AS category_status

        FROM job_posts j
        LEFT JOIN users u ON j.employer_id = u.user_id
        LEFT JOIN profile p ON u.user_id = p.user_id
        LEFT JOIN job_categories c ON j.job_category_id = c.category_id
        WHERE j.job_category_id = ?
    `;
        db.query(sql, [category_id], callback);
    },

    // Tambah job posting baru
    insertJob(data, callback) {
        const sql = `
            INSERT INTO job_posts
            (employer_id, title, description, requirements, job_category_id, salary_min, salary_max, location, employment_type, status, posted_at, deadline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                data.employer_id,
                data.title,
                data.description,
                data.requirements,
                data.job_category_id,
                data.salary_min || 0.00,
                data.salary_max || 0.00,
                data.location,
                data.employment_type,
                data.status || "Active",
                data.posted_at || new Date(),
                data.deadline || null
            ],
            callback
        );
    },

    // Update job posting
    updateJob(job_id, data, callback) {
        const sql = `
            UPDATE job_posts SET
                employer_id = ?,
                title = ?,
                description = ?,
                requirements = ?,
                job_category_id = ?,
                salary_min = ?,
                salary_max = ?,
                location = ?,
                employment_type = ?,
                status = ?,
                posted_at = ?,
                deadline = ?
            WHERE job_id = ?
        `;
        db.query(
            sql,
            [
                data.employer_id,
                data.title,
                data.description,
                data.requirements,
                data.job_category_id,
                data.salary_min || 0.00,
                data.salary_max || 0.00,
                data.location,
                data.employment_type,
                data.status || "Active",
                data.posted_at || new Date(),
                data.deadline || null,
                job_id
            ],
            callback
        );
    },

    // Hapus job posting
    deleteJob(job_id, callback) {
        const sql = "DELETE FROM job_posts WHERE job_id = ?";
        db.query(sql, [job_id], callback);
    }
};
