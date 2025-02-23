import mongoose from "mongoose";
import Product from "./products.model.js";


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

const purchaseSchema= new mongoose.Schema({
    date: {
        type: Date,
        default: ()=>formatDate(new Date()),
        display:"True"
    },
    product_name: {
        type: String,
        required:true,
        input: "True",
        display: "True",
        inputType: "Select"
    },
    quantity: {
        type: Number,
        required: true,
        input:"True",
        display:"True",
        inputType:"Number"
    },
    amount:{
        type:Number,
        required: true,
        input:"True",
        display:"True",
        inputType:"Number"
    },
    total_amount:{
        type:Number,
        display:"True",
    },

    payment_mode: {
        type: String,
        enum: ['Cash','Upi','Card','Credit'],
        required: true,
        input: "True",
        display: "True",
        inputType: "Select"
    },
});


purchaseSchema.pre('save', async function (next) {
    if(this.quantity && this.amount){
        this.total_amount=this.quantity*this.amount;
    }
    next();
})
const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
