import mongoose from "mongoose";
import Nozzle from "./nozzle.model.js";
import Product from "./products.model.js";
import formatDate from "./currentdate.js";

const  inspectionSchema=new mongoose.Schema({
    date:{
        type:String,
        default: formatDate(new Date()),
    },
    nozzle_no:{
        type:Number,
        ref: "Nozzle",
        required: true,
        validate: {
            validator: async function (value) {
                return await Nozzle.exists({ nozzle: value });
            },
            message: "Nozzle doesn't exist.",
        },
    },
    product:{
        type: String,
        required: true,
        validate:{
            validator:async function(value) {
                return await Product.exists({name:value});
            },
            message:"Product doesn't exist",
        }
    },
    current_reading:{
        type:Number,
        required:true
    },
    previous_reading:{
        type:Number,
        required:true
    },
    meter_sale:{
        type:Number,
        required:true
    }
});

inspectionSchema.pre('save',async function (next){
    if(this.nozzle_no){
        const inspect=await Inspection.findOne({nozzle_no:this.nozzle_no,date:formatDate(new Date()-1)});
        this.previous_reading=inspect.previous_reading;
    }
    if(this.current_reading&&this.previous_reading){
        this.meter_sale=this.current_reading-this.previous_reading;
    }
});

const Inspection = mongoose.model('Inspection', inspectionSchema);


export default Inspection;