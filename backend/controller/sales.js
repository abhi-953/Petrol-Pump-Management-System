import Sales from "../model/sales.model.js";
import Product from "../model/products.model.js";
import Company from "../model/companies.model.js";
import Roles from "../model/assigned_roles.model.js";
import Nozzle from "../model/nozzle.model.js";
import { getProductNames } from "./productName.js";



export const salesFieldCntl = async (req, res) => {
    try {
        const fields = Object.keys(Sales.schema.paths);
        const displayedFields = fields.filter(field => {
            const fieldOptions = Sales.schema.path(field).options;
            return fieldOptions.display !== false && field!=="_id" && field!=="__v";
        });

        res.status(200).send({
            success: true,
            message: "Sales Fields fetched",
            data: displayedFields,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch Sales Fields",
            error,
        });
    }
};


export const salesValueCntl = async (req,res) =>{
    try{
        const sales = await Sales.find({});
        res.status(200).send({success: true, data:sales });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch Sales Details",
            error,
        });
    }
};

export const salesFieldInputCntl = async (req, res) => {
    try {
        const schemaDefinition = Sales.schema.paths;
        const filteredSchema = Object.keys(schemaDefinition)
        .filter(field => field !== '_id' && field !== '__v' && schemaDefinition[field].options.input==="True")  
        .map(field => {
            const fieldOptions = schemaDefinition[field].options;

            return {
            fieldName: field,
            inputType: fieldOptions.inputType || 'Text',  
            enum: fieldOptions.enum || [] ,
            required: fieldOptions.required || 'false',
            };
        });

        res.status(200).send({
            success: true,
            message: "Sales Fields fetched",
            data: filteredSchema,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch Sales Fields",
            error,
        });
    }
};

export const salesPost = async(req,res)=>{
        const sales =req.body;
        const newSales= new Sales(sales);

        try{
            await newSales.save();
            const prod=await Product.findOne({name:newSales.product_name});
            prod.quantity=prod.quantity-newSales.quantity;
            console.log(prod);
            await prod.save();
            if(newSales.payment_mode=='Credit'){
                const comp=await Company.findOne(newSales.company_name);
                comp.available_limit=comp.available_limit-newSales.amount;
                await comp.save();
            }   
            if(newSales.payment_mode=='Cash'){
                const employee=await Roles.findOne({employee_id:newSales.employee_id});
                employee.cashcollected=employee.cashcollected+newSales.amount;
                await employee.save();
            }
            const nozzle=await Nozzle.findOne({nozzle_no:newSales.nozzle_no});
            nozzle.current_reading+=newSales.quantity;
            await nozzle.save();
            return res.status(200).json({success:true,data:newSales});
        }
        catch(e){
            console.log(e);
            if (e.name === "ValidationError") {
                const messages = Object.values(e.errors).map(field => ({field}));
                return res.status(400).json({ success: false, errorMessages: messages });
            }
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };


export const salesDelete = async(req,res)=>{
        try{
            const {key} =req.body;
            const deletedItem=await Sales.findByIdAndDelete(key);
            if(deletedItem)
                return res.status(200).json({success:true,message:"Item Deleted Successfully"});
            return res.status(404).json({success:false,message:"Item Not found"});
        }
        catch(e){
            return res.status(500).json({sucess:false,error:"Error Deleting item"});
            
        }
};
