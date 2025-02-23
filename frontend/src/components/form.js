import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect,useState } from 'react';
import { Link ,useNavigate,useParams,useLocation} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Input from "./Input"
import Delete from "./deleteData.js"


function Forms(props){
    const [schema,setSchema]=useState([]);
    const [modelData,setData]=useState();
    const navigate =useNavigate();
    const {value}=useParams();


    useEffect(()=>{
        fetch("http://localhost:8000/"+props.module+"/input").then(res=>res.json()).then(data=>{
            setSchema(data.data);
            
        });
        
    },[props.module])

    useEffect(()=>{
        fetch("http://localhost:8000/"+props.module).then(res=>res.json()).then((data)=>{const t=data.data.find(item => item._id === value);setData(t);});
    },[])
    function handleChange(name,value){
        setData({...modelData,[name]:value});
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        try {
            if(value)
                await Delete(value,props.module);
            console.log("insert");
            console.log(typeof modelData.amount);
            const response = await fetch("http://localhost:8000/" + props.module, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modelData), 
            });

            const result = await response.json();
            console.log(result.success);
            if (result.success) {
                console.log("Data submitted successfully", result.data );
                navigate(`/${props.module}`);
            } else {
                alert("Failed to submit data"+ result.error);
            }
        } catch (error) {
            alert("Error while submitting data:"+error);
        }
    }
    return (
        <div className="container form-container" style={{paddingTop: "20px"}}>
            <div className="d-flex justify-content-end align-items-start" style={{ paddingTop: "20px", paddingRight: "20px" }}>
            <Link to={`/${props.module}`} className="btn btn-success" >
                <CloseIcon />
            </Link>
            </div>
            <h1 className="text-center" style={{paddingBottom: "20px"}}>Add {props.module} </h1>
            <Form>
                {schema && schema.map((field,index)=>{
                    return <Input key={index} name={field.fieldName} type={field.inputType} enum={field.enum} value={modelData?.[field.fieldName]||""} required={props.required} change={handleChange}/>;
                })}
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" onClick={handleClick}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
};

export default Forms;