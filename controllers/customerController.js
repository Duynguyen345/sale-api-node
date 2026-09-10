
const {sql} = require("../config/database")

const customerService = require("../services/customerService")

async function getAllCustomers(req,res,next) {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (error) {
        next(error);

    }
}


async function getCustomerById(req,res,next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({
        message: "Customer ID must be a positive number"
    });
}
          const customers = await customerService.getCustomerById(id);
    
    if(customers.length ===0){
        return res.status(404).json({

            message: "Khong tim thay khach hang",
        })
    }
  
       res.json(customers[0]);

  
    } catch (error) {
       next(error);
    }
}


 async function createCustomer(req,res,next) {
    try {
        
        const customer = req.body;
        if(!customer.customerId || !customer.customerName || customer.customerName.trim()==="" || !customer.phone || !customer.address){
            return res.status(400).json({
                message: "Please fill in all of the field!!!"
            })
        }
        const id = Number(customer.customerId);
        if(Number.isNaN(id) || id<= 0){
            return res.status(400).json({
                message: "Customer ID must be a positive number"
            })
        }
        
        const regex = /^\d+$/;

        if (!regex.test(customer.phone)) {
    return res.status(400).json({
        message: "Phone must contain only numbers"
    });
}

       const existingCustomers = await customerService.createCustomer(customer);

if (existingCustomers.length >0) {
    return res.status(409).json({
        message: "Customer ID already exists"
    });
}

       const newCustomer = await customerService.insertCustomer(customer);
        res.status(201).json(newCustomer); 


    } catch (error) {
         next(error);
    }
}


async function updateCustomer(req,res,next) {
    try {
        const id = Number(req.params.id);
        const customer = req.body;
        if(!customer.customerId || !customer.customerName || customer.customerName.trim()==="" || !customer.phone || !customer.address){
            return res.status(400).json({
                message: "Please fill in all of the field!!!"
            })
        }
         if(Number.isNaN(id) || id<= 0){
            return res.status(400).json({
                message: "Customer ID must be a positive number"
            })
        }
       
        const newUpdate = customerService.updateCustomer(id,customer);
     if (  newUpdate === 0) {
    return res.status(404).json({
        message: "Customer not found"
    });
}
        
           res.status(200).json({
            customerId: id,
    customerName: customer.customerName,
    phone: customer.phone,
    address: customer.address
        });
    } catch (error) {
       next(error);
    }
    
}

async function deleteCustomer(req,res,next) {
    try {
        const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({
        message: "Customer ID must be a positive number"
    });
}
        const newDelete = customerService.deleteCustomer(id);
        if (newDelete === 0) {
    return res.status(404).json({
        message: "Customer not found"
    });
}
        res.json({
            message: "Xoa khach hang thanh cong",
            customerId: id
        });

    } catch(error) {
        next(error);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}