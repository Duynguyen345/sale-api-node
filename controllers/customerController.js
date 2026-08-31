
const {sql} = require("../config/database")

async function getAllCustomers(req,res) {
    try {
        const result = await sql.query`
    Select 
    CustomerID as customerId,
    CustomerName as customerName,
    Phone as phone,
    Address as address
    from Customer
    `;
    res.json(result.recordset);
    } catch (error) {
        console.error("lay danh sach khong thanh cong",error);

    }
}


async function getCustomerById(req,res) {
    try {
        const id = Number(req.params.id);
        const result = await sql.query`
    Select 
    CustomerID as customerId,
    CustomerName as customerName,
    Phone as phone,
    Address as address
    from Customer
    where CustomerID = ${id}
    `;

    if(result.recordset.length ===0){
        return res.status(404).json({

            message: "Khong tim thay khach hang",
        })
    }
    res.json(result.recordset[0]);
    } catch (error) {
        console.error("lay khach hang khong thanh cong",error);

    }
}


 async function createCustomer(req,res) {
    try {
        const customer = req.body;
        await sql.query`
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
        res.json(customer); 


    } catch (error) {
        console.error("da xay ra loi:",error);
        res.status(500).json({
            message: "them khach hang that bai!"
        })
    }
}


async function updateCustomer(req,res) {
    try {
        const id = Number(req.params.id);
        const customer = req.body;

        await sql.query`
        update
        customer
        set 
          CustomerName = ${customer.customerName},
                Phone = ${customer.phone},
                Address = ${customer.address}
            WHERE CustomerID = ${id}
        `;
           res.json({
            customerId: id,
    customerName: customer.customerName,
    phone: customer.phone,
    address: customer.address
        });
    } catch (error) {
         console.error("Cap nhat that bai:", error);

        res.status(500).json({
            message: "Cap nhat khach hang that bai!"
        });
    }
    
}

async function deleteCustomer(req,res) {
    try {
        const id = Number(req.params.id);

        await sql.query`
            DELETE FROM Customer
            WHERE CustomerID = ${id}
        `;

        res.json({
            message: "Xoa khach hang thanh cong",
            customerId: id
        });

    } catch(error) {
        console.error("Xoa that bai:", error);

        res.status(500).json({
            message: "Xoa khach hang that bai!"
        });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}