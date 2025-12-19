const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talenthub'
});

db.connect(err => {
    if (err) {
        console.error("Gagal terkoneksi ke database:", err.message);
    } else {
        console.log("Berhasil terkoneksi ke database!");
    }
});

module.exports = db;
