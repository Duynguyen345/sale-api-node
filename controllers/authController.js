const authService = require("../services/authService");

async function register(req, res, next) {
    try {
        // lấy username, password, role từ req.body
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        // gọi authService.createUser(...)
        const result = await authService.createUser(username,password,role)
        // trả 201
        res.status(201).json({
            message: 'register succesfully',
            return: result
        })
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        // 1. Lấy username và password từ request
        const username = req.body.username;
        const password = req.body.password;

        // 2. Gọi login() của Service
        const token = await authService.login(
            username,
            password
        );

       
        return res.status(200).json({
            "message":"Login successful",
            "token": token
        })
    } catch (error) {
    if (error.message === "sai thong tin dang nhap") {
        // TODO: Trả HTTP 401 kèm JSON
        return res.status(401).json({
    message: "Sai thông tin đăng nhập",
    
});
    }

    next(error);
}
}

module.exports = {
    register,login
};