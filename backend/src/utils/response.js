const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            data: data,
            message: message
        },
        pagination: {
            prev: "",
            next: "",
            maks: ""
        }
    })
}

// bisa dirubah rubah tampilan json sesuai dengan keinginan dan tim
// wajib mengetahui ini agar bisa membuat API yang baik

module.exports = response

// const response = (statusCode, data, message, res) => {
//     res.json(statusCode, [
//         {
//             payload: data,
//             message,
//             metadata: {
//                 prev: "",
//                 next: "",
//                 current: "",
//             },
//         },
//     ])
// }

// module.exports = response