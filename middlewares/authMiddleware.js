const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // 1. Lấy Authorization header
    const authHeader = req.headers.authorization;

    // 2. Kiểm tra trường hợp thiếu header
    if (!authHeader) {
        return res.status(401).json({
            message: "Thiếu token"
        });
    }

    // 3. Tách Bearer token (chúng ta sẽ học tiếp)

    const parts = authHeader.split(" ");
    const token = parts[1];
    if (parts[0] !== "Bearer" || parts.length !== 2 || !token) {
        return res.status(401).json({
            message: "Token không đúng định dạng"
        });
    }

    try {
        // 4. Xác minh JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 5. Lưu thông tin người dùng vào request
        req.user = decoded;

        // 6. Cho request đi tiếp
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn"
        });
    }
}

function requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Bạn không có quyền truy cập"
        });
    }

    next();
}
module.exports = {
    verifyToken,
    requireAdmin
};