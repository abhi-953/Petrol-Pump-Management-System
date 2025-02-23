import mongoose from "mongoose";
import Sales from "./sales.model.js";

const giftSchema = new mongoose.Schema({
    bill_no: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sales',
        required: true,
        validate: {
            validator: async function(value) {
                return await Sales.exists({ _id: value });
            },
            message: 'Invalid bill number. No matching sales record found.',
        },
        input: "True",
        display: "True",
        inputType: "Text", 
    },
    amount: {
        type: Number,
        input: "True",
        display: "True", 
        inputType: "Number",
    },
    name: {
        type: String,
        required: true,
        trim: true,
        input: "True", 
        display: "true", 
        inputType: "Text", 
    },
    phone_no: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: 'Invalid phone number. It should be a 10-digit number.',
        },
        input: "True", 
        display: "True", 
        inputType: "Number",
    },
    items: {
        type: String, 
        required: true,
        enum: ["Free_Service", "Free_Poc"],
        input: "True", 
        display: "True", 
        inputType: "Select", 
    },
    date: {
        type: String,
        required: true,
        input: "True", 
        display: "True", 
        inputType: "Date", 
    },
});

giftSchema.pre('save', async function (next) {
    if (this.bill_no) {
        const sales = await Sales.findOne({ _id: this.bill_no });
        this.amount = sales ? sales.amount : null;
    }
    next();
});

const Gift = mongoose.model('Gift', giftSchema);

export default Gift;
