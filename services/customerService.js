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

async function createCustomer(customer) 
{
             const result = await sql.query`
    SELECT CustomerID
    FROM Customer
    WHERE CustomerID = ${customer.customerId}
`;

    
    return result.recordset;
}

async function insertCustomer(customer) {
     const result = await sql.query`
        Insert Into Customer
        (CustomerID,
        CustomerName,
        Phone,

        Address
        )
        Values
        (${customer.customerId}
        ,${customer.customerName}
        ,${customer.phone}
        ,${customer.address}
        )
        `;
        return customer;
}

async function updateCustomer(id,customer) {
     const result = await sql.query`
        update customer
        set 
          CustomerName = ${customer.customerName},
                Phone = ${customer.phone},
                Address = ${customer.address}
            WHERE CustomerID = ${id}
        `;
        return result.rowsAffected[0];

}

async function deleteCustomer(id) {
      const result =await sql.query`
            DELETE FROM Customer
            WHERE CustomerID = ${id}
        `;
        return result.rowsAffected[0];
}
module.exports = {
    getCustomerById,
    getAllCustomers,
    createCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}
  