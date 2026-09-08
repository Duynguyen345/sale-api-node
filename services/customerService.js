const { sql } = require("../config/database");


async function getAllCustomers() {
    // Chuyển câu SELECT từ controller sang đây
     const result = await sql.query`
    Select 
    CustomerID as customerId,
    CustomerName as customerName,
    Phone as phone,
    Address as address
    from Customer
    `;
    
    // Trả về result.recordset
    return result.recordset;
}

async function getCustomerById(id) {
      const result = await sql.query`

    Select

    CustomerID as customerId,

    CustomerName as customerName,

    Phone as phone,

    Address as address

    from Customer

    where CustomerID = ${id}

    `;
        // Trả kết quả về Controller
    return result.recordset;
}

module.exports = {
    getCustomerById,
    getAllCustomers
}
  