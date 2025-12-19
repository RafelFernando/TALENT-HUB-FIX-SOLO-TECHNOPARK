const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const path = require('path')
const fileupload = require("express-fileupload")
const bodyParser = require('body-parser') // untuk mengirim ke body dalam bentuk json
const userRoutes = require('./src/routes/userRoutes')
const userRoleRoutes = require('./src/routes/userRoleRoutes')
const userProfileRoutes = require('./src/routes/userProfileRoutes')
const companyProfileRoutes = require('./src/routes/companyProfileRoutes');
const jobKategoriRoutes = require('./src/routes/jobKategoriRoutes');
const agamaRoutes = require('./src/routes/agamaRoutes');
const pendidikanRoutes = require('./src/routes/pendidikanRoutes');
const genderRoutes = require('./src/routes/genderRoutes');
const jobPostingRoutes = require('./src/routes/jobPostingRoutes');
const jobApplicationsRoutes = require("./src/routes/jobApplicationsRoutes");
const savedJobsRoutes = require("./src/routes/savedJobsRoutes");
const reportsRoutes = require("./src/routes/reportsRoutes");
const authRoutes = require("./src/routes/authRoutes");
const authAdminRoutes = require("./src/routes/authAdminRoutes");
const notifikasi = require("./src/routes/notificationRoutes")

// cv
const aboutme = require("./src/routes/aboutMeRoutes")
const cvBahasa = require("./src/routes/cvBahasaRoutes")
const cvSkill = require("./src/routes/cvSkillRoutes")
const cvLinkPorto = require("./src/routes/cvLinkPortoRoutes")
const cvRiwayatKerja = require("./src/routes/cvRiwayatKerjaRoutes")
const cvPDF = require("./src/routes/cvPDFRoutes")

// Admin
const adminUserRoleRoutes = require("./src/routes/adminUserRoleRoutes");

// Admin - Setting = ini untuk menu-menu setting yang ada di admin
const reviewKarirRoutes = require("./src/routes/reviewKarirRoutes");



app.use(fileupload());
app.use("/uploads", express.static("src/uploads"));

app.use(cors({
    origin: "http://localhost:4000", // atau "*" jika ingin semua origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/talenthub/api/v1/auth", authRoutes);
app.use("/talenthub/api/v1/authAdmin", authAdminRoutes);
app.use("/talenthub/api/v1/users", userRoutes);
app.use("/talenthub/api/v1/user_roles", userRoleRoutes);
app.use("/talenthub/api/v1/user_profiles", userProfileRoutes);
app.use("/talenthub/api/v1/company_profiles", companyProfileRoutes);
app.use("/talenthub/api/v1/job_categories", jobKategoriRoutes);
app.use("/talenthub/api/v1/agama", agamaRoutes);
app.use("/talenthub/api/v1/pendidikan", pendidikanRoutes);
app.use("/talenthub/api/v1/gender", genderRoutes);
app.use("/talenthub/api/v1/job_posts", jobPostingRoutes);
app.use("/talenthub/api/v1/job_applications", jobApplicationsRoutes);
app.use("/talenthub/api/v1/saved_jobs", savedJobsRoutes);
app.use("/talenthub/api/v1/reports", reportsRoutes);

// CV
app.use("/talenthub/api/v1/aboutme", aboutme)
app.use("/talenthub/api/v1/cvbahasa", cvBahasa)
app.use("/talenthub/api/v1/cvskill", cvSkill)
app.use("/talenthub/api/v1/cvporto", cvLinkPorto)
app.use("/talenthub/api/v1/cvriwayatkerja", cvRiwayatKerja)
app.use("/talenthub/api/v1/cvpdf", cvPDF)

// Admin
app.use("/talenthub/api/v1/admin/user_roles", adminUserRoleRoutes);
app.use("/talenthub/api/v1/admin/notifikasi", notifikasi);

// Admin - Setting = ini untuk menu-menu setting yang ada di admin
app.use("/talenthub/api/v1/review_karir", reviewKarirRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan",
        path: req.originalUrl
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
