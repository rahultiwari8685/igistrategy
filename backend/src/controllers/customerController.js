import Customer from "../models/Customer.js";

export const createCustomer = async (req, res) => {
    const customer = await Customer.create(req.body);
    res.json({ success: true, data: customer });
};

export const getCustomers = async (req, res) => {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: customers });
};

export const getCustomerById = async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.json({ success: true, data: customer });
};

export const updateCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json({ success: true, data: customer });
};
