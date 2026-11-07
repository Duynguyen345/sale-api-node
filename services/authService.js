const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { sql } = require("../config/database");
const { request } = require("express");
function generateToken(user){
    
    const payload = {
        UserId: user.UserId,
    role: user.Role
    }
        const secret = process.env.JWT_SECRET;
    const options ={ expiresIn: "1h" }
    return jwt.sign(payload, secret, options)
}

async function hashPassword(password) {
    // return passwordHash
    const PasswordHash = await bcrypt.hash(password, 10);
    return PasswordHash;
}
        async function createUser(username, password, role) {
            // 1. hash password
            const PasswordHash = await hashPassword(password);
                const request = new sql.Request();
    request.input("username", sql.VarChar(50), username);
    request.input("passwordHash", sql.VarChar(255), PasswordHash);
    request.input("role", sql.VarChar(20), role);
            // 2. insert vào Users
   
    await request.query(`
        INSERT INTO Users(Username, PasswordHash, Role)
        VALUES (@username, @passwordHash, @role)
    `);
            // 3. return user vừa tạo hoặc thông tin cần thiết
            return {username,role};
        }

        async function login(username, password) {
    // 1. tìm user theo username
            const request = new sql.Request();

    request.input("username", sql.VarChar(50), username);

    const result = await request.query(`
        SELECT UserId, Username, PasswordHash, Role
        FROM Users
        WHERE Username = @username
    `);

    const user = result.recordset[0];
    // 2. nếu không có user → báo sai thông tin đăng nhập
        if(!user) throw new Error('sai thong tin dang nhap')
         
    // 3. bcrypt.compare(password, user.PasswordHash)
   const isMatch = await bcrypt.compare(password,user.PasswordHash)
    // 4. nếu sai password → báo sai thông tin đăng nhập
    if(isMatch==false) throw new Error('sai thong tin dang nhap')
    // 5. generateToken(...)
    const token = generateToken(user);
    // 6. return token
    return token;
}
module.exports ={
    generateToken,hashPassword,createUser,login
}