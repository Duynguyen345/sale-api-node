function errorHandler(error, req, res, next) {
    // xử lý lỗi ở đây
        console.error("ERROR:", error);

    res.status(500).json({
         message: "Internal Server Error"
})
}

module.exports = errorHandler;