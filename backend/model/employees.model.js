import mongoose from "mongoose";

const employeeSchema =new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true,
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    name: {
        type: String,
        required: true,
        trim: true,
        input: "True",
        display: "True",
        inputType: "Text", 
    },
    password:{
        type: String,
    },
    validationCode:{
        type:Boolean,
        required:true,
        default: "false",
        input: "True",
        display: "True",
        inputType: "Boolean", 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        input: "True",
        display: "True",
        inputType: "Email", 
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    designation: {
        type: String,
        enum: ['Manager', 'Pump Operator', 'Technician', 'Cleaner', 'Accountant' , 'Assistant_Manager', 'Sales_person'],
        required: true,
        input: "True",
        display: "True",
        inputType: "Select", 
    },
    supervisor: {
        type: Number,
        ref: "Employee",
        input: "True",
        display: "True",
        inputType: "Select", 
    },
    gender:{
        type: String,
        enum: ['Male','Female','Others'],
        required: true,
        input: "True",
        display: "True",
        inputType: "Select", 
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
        input: "True",
        display: "True",
        inputType: "Number", 
    },
    address: { type: String, trim: true ,input: "True",
        display: "True",
        inputType: "Text", },
    city: { type: String, trim: true ,input: "True",
        display: "True",
        inputType: "Text", },
    state: { type: String, trim: true ,input: "True",
        display: "True",
        inputType: "Text", },
    pincode: { type: String, trim: true ,input: "True",
        display: "True",
        inputType: "Number", },
    dateOfJoining: {
        type: Date,
        required: true,
        default: Date.now,
        display: "True",
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        input: "True",
        display: "True",
        inputType: "Select", 
    },
    shift: {
        type: String,
        enum: ['Day', 'Night', 'Rotational'],
        required: true,
        input: "True",
        display: "True",
        inputType: "Select", 
    },
    working_hour:{
        type:Number,
        required: true,
        input: "True",
        display: "True",
        inputType: "Number", 
    },
}, );

employeeSchema.pre('save', async function (next) {
    if(this.supervisor){
        if(this.designation){

            if(this.designation!='Manager' && await Employee.exists({id:this.supervisor,designation:{ $in: ['Assistant Manager', 'Manager'] }})===null){
                throw new error('Supervisor not found');
            }
        }
    }
});
const Employee = mongoose.model('Employee',employeeSchema);

export default Employee;

