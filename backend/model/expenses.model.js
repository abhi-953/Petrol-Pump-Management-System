import mongoose from "mongoose";
import Employee from "./employees.model.js";
import Product from "./products.model.js";

const expensesSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['Repair','Maintainance','EmployeeExpenses','Purchase','Miscellaneous'],
        required: true
    },
    paymentMode:{
        type:String,
        enum:['Cash','Online']
    },
    amount:{
        type:Number,
        required: true
    },
    employee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        validate:{
            validator: async function (value){
                return await Employee.exists({_id:value});
            },
            message:'employee not found.',
        },
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        validate:{
            validator: async function (value){
                return await Product.exists({_id:value});
            },
            message:'Product not found.',
        },
    },
    description:{
        type:String
    }
})
const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
