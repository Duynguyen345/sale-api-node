require("dotenv").config();
const jwt = require("jsonwebtoken");

const { sql, connectDatabase } = require("./config/database");
const { login, createUser } = require("./services/authService");




async function testLogin() {
    try {
        await connectDatabase();

        const token = await login(
            process.env.TEST_USERNAME,
            process.env.TEST_PASSWORD
        );

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("LOGIN THÀNH CÔNG");
        console.log("Có JWT:", typeof token === "string");
        console.log("UserId:", decoded.UserId);
        console.log("Role:", decoded.role);
        console.log("Thời hạn (giây):", decoded.exp - decoded.iat);

    } catch (error) {
        console.error("LOGIN THẤT BẠI:", error.message);
    } finally {
        await sql.close();
    }
}

testLogin();