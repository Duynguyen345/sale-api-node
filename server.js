const {loadEnvFile} = require("node:process");
const errorHandler = require("./middlewares/errorHandler");
// Phải đọc .env trước
loadEnvFile(".env");

// Kiểm tra tạm
console.log("DB_DATABASE:", process.env.DB_DATABASE);

// Sau đó mới import các file sử dụng process.env
const express = require("express");
const cors = require("cors");
const {
    
    connectDatabase
} = require("./config/database")

const customerRoutes = require("./routes/customerRoutes")

const app = express();
const PORT = Number(process.env.PORT) || 3000 ;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/customers",customerRoutes);
app.use(errorHandler);







connectDatabase();
app.listen(PORT,function(){
    console.log(`Server dang chay tai http://localhost:${PORT}`);})