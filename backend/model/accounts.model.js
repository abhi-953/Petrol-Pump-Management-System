import mongoose from "mongoose";

const accountsSchema=new mongoose.Schema({
    Date:{
        type:Date,
        default:Date.now
    },
    openingCashBalance:{
        type:Number,
        required:true
    },
    endingCashBalance:{
        type:Number,
        required:true
    },
    openingBankBalance:{
        type:Number,
        required:true,
    },
    endingBankBalance:{
        type:Number,
        required:true
    },
    withdrawn:{
        type:Number,
    },
    deposit:{
        type:Number
    },
},{
    timestamps:true
})

const Accounts = mongoose.model('Accounts', accountsSchema);

export default Accounts;
