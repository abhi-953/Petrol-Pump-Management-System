import mongoose from "mongoose";
import Product from "./products.model.js";

const serviceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate:{
            validator: async function (value){
                return await Product.exists({name:value});
            },
            message:'Product not found.',
        },
    },
    vehicle_number:{
        type:Number,
        required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Completed','Active','Inacitve','Pending Approval']
    },
    servicedate:{
        type:Number,
        default:Date.now
    },
    startDate:{
        type:Date,
        required:true
    },
    completeinDate:{
        type:Number,
        required:true
    },
    deliveryDate:{
        type:Number,
        required:true
    },
    quoted_price:{
        type:Number,
        required: true
    },
},{
    timestamps:true
})
const Service = mongoose.model('Service', serviceSchema);

export default Service;
