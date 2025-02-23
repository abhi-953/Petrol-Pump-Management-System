import Purchase from "../model/purchase.model.js";
import Product from "../model/products.model.js";
import Company from "../model/companies.model.js";
import Roles from "../model/assigned_roles.model.js";
import Nozzle from "../model/nozzle.model.js";
import { getProductNames } from "./productName.js";



export const purchaseFieldCntl = async (req, res) => {
    try {
        const fields = Object.keys(Purchase.schema.paths);
        const displayedFields = fields.filter(field => {
            const fieldOptions = Purchase.schema.path(field).options;
            return fieldOptions.display !== false && field!=="_id" && field!=="__v";
        });

        res.status(200).send({
            success: true,
            message: "Purchase Fields fetched",
            data: displayedFields,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch Purchase Fields",
            error,
        });
    }
};


export const purchaseValueCntl = async (req,res) =>{
    try{
        const purchase = await Purchase.find({});
        res.status(200).send({success: true, data:purchase });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch Purchase Details",
            error,
        });
    }
};

export const purchaseFieldInputCntl = async (req, res) => {
    try {
        const schemaDefinition = Purchase.schema.paths;
        schemaDefinition["product_name"].options.enum=await getProductNames();
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
            message: "Purchase Fields fetched",
            data: filteredSchema,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to fetch Purchase Fields",
            error,
        });
    }
};

export const purchasePost = async(req,res)=>{
        const purchase =req.body;
        console.log(purchase);
        const newPurchase= new Purchase(purchase)

        try{
            await newPurchase.save();
            const prod=await Product.findOne({name:newPurchase.product_name});
            prod.quantity=prod.quantity+newPurchase.quantity;
            await prod.save();
            
            return res.status(200).json({success:true,data:newPurchase});
        }
        catch(e){console.log(e);
            if (e.name === "ValidationError") {
                
                const messages = Object.values(e.errors).map(field => ({field}));
                return res.status(400).json({ success: false, errorMessages: messages });
            }
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };


export const purchaseDelete = async(req,res)=>{
        try{
            const {key} =req.body;
            const deletedItem=await Purchase.findByIdAndDelete(key);
            if(deletedItem)
                return res.status(200).json({success:true,message:"Item Deleted Successfully"});
            return res.status(404).json({success:false,message:"Item Not found"});
        }
        catch(e){
            return res.status(500).json({sucess:false,error:"Error Deleting item"});
            
        }
};
