// middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Buat folder jika belum ada
const createUploadFolder = (folderName) => {
  const folderPath = path.join(__dirname, '../uploads', folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return folderPath;
};

// Konfigurasi storage untuk profile images
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = createUploadFolder('profile-images');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

// Konfigurasi storage untuk background images
const backgroundStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = createUploadFolder('background-images');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'background-' + uniqueSuffix + ext);
  }
});

// Filter file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diizinkan (JPEG, PNG, GIF, WebP)'));
  }
};

// Middleware upload
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB untuk profile
  fileFilter: fileFilter
}).single('profile_image');

const uploadBackgroundImage = multer({
  storage: backgroundStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB untuk background
  fileFilter: fileFilter
}).single('background_image');

const uploadBothImages = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
}).fields([
  { name: 'profile_image', maxCount: 1 },
  { name: 'background_image', maxCount: 1 }
]);

module.exports = {
  uploadProfileImage,
  uploadBackgroundImage,
  uploadBothImages
};