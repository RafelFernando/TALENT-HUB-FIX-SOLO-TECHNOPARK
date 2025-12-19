const JobKategori = require("../models/jobKategoriModels");

module.exports = {

    // Ambil semua kategori
    getAllCategoriesService(callback) {
        JobKategori.getAllCategories(callback);
    },

    // Ambil kategori berdasarkan ID
    getCategoryByIdService(category_id, callback) {
        JobKategori.getCategoryById(category_id, callback);
    },

    // Tambah kategori baru
    insertCategoryService(data, callback) {
        JobKategori.insertCategory(data, callback);
    },

    // Update kategori
    updateCategoryService(category_id, data, callback) {
        JobKategori.updateCategory(category_id, data, callback);
    },

    // Hapus kategori
    deleteCategoryService(category_id, callback) {
        JobKategori.deleteCategory(category_id, callback);
    }

};
