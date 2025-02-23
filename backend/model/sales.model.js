import mongoose from "mongoose";
import Product from "./products.model.js";
import Customer from "./customer.model.js";
import Employee from "./employees.model.js";
import Company from "./companies.model.js";
import Roles from "./assigned_roles.model.js";
import Nozzle from "./nozzle.model.js";

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

const getProductName=async(n)=>{
    const nozzle = await Nozzle.findOne({ nozzle_no: n });
    return nozzle ? nozzle.product_name : null;
}

const salesSchema = new mongoose.Schema({
    date: {
        type: String,
        default: ()=>formatDate(new Date()),
        display: "True",
    },
    time:{
        type:String,
        required:true,
        default: ()=>formatTime(new Date()),
        display: "False",
    },
    payment_mode: {
        type: String,
        enum: ['Cash', 'Upi', 'Card', 'Credit'],
        required: true,
        input: "True",
        display: "True",
        inputType: "Select", 
    },
    nozzle_no: {
        type: Number,
        required: true,
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    product_name: {
        type: String,
        display: "True",
    },
    vehicle_no: {
        type: String,
        input: "True",
        display: "False",
        inputType: "Text", 
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        validate: {
            validator: async function (value) {
                return await Customer.exists({ _id: value });
            },
            message: 'Customer not found.',
        },
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    company_name: {
        type: String,
        ref: "Company",
        input: "False",
        display: "True", 
    },
    amount: {
        type: Number,
        display: "True",
    },
    quantity: {
        type: Number,
        required:true,
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    employee_id: {
        type: Number,
        ref: "Employee",
        required: true,
        validate: {
            validator: async function (value) {
                return await Employee.exists({ id: value });
            },
            message: 'Employee not found.',
        },
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    payment_received: {
        type: String,
        required: true,
        enum:["True","False"],
        input: "True",
        display: "True",
        inputType: "Select", 
    },
});

salesSchema.pre('save', async function (next) {
    console.log("hi");
    if (this.nozzle_no) {
        console.log(1);
        this.product_name =await getProductName(this.nozzle_no);
    }

    if (this.customer_id) {
        const customer = await Customer.findOne({ _id: this.customer_id });
        this.company_name =await customer ? customer.companyName : null;
    }

    if (this.product_name && this.quantity) {
        const product = await Product.findOne({ name: this.product_name });
        this.amount =await product ? product.sales_price * this.quantity : null;
    }

    if((Product.findOne({ name: this.product_name })).quantity<this.quantity){
        throw new error('Requested quantity not available') ;
    }

    if(this.amount&&this.company_name&&(Company.findOne({ name: this.company_name })).available_limit<this.amount){
        throw new error('Company not found or available limit is below billed amount.');
    }
    next();
});

const Sales = mongoose.model('Sales', salesSchema);


export default Sales;
