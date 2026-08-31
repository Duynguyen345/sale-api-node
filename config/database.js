 const sql = require("mssql");

 const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
 }

 async function connectDatabase() {
    try{
        await sql.connect(dbConfig);
             const result = await sql.query`SELECT DB_NAME() AS currentDatabase`;

        console.log("ket noi thanh cong SQL Server");
         console.log(
            "Database hien tai:",
            result.recordset[0].currentDatabase
        );
    }catch(error){
        console.error("Ket noi SQL that bai",error);

        process.exit(1);
    }
 }

 module.exports = {
    sql,
    connectDatabase
 }