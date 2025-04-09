import React,{useState} from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";


export default function CreateProduct(){
    const navigate =useNavigate();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [image,setImage]=useState('');


    const changeHandler = (e)=>{
        setImage(e.target.files[0]);

    }

    const createProduct = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('image',image);
        
        await axios.post('http://127.0.0.1:8000/products', formData)
        .then(({ data }) => {
            console.log(data.message);
            navigate('/');
        }).catch(
            ({response})=>{
                if (response.status ==422) {
                    console.log(response.data.error)
                    
                } else {
                    console.log(response.data.message)

                }
            }
        )
    } 
    
    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Create product</h3>
                            <hr></hr>
                            <div className="form-wrapper">
                                <form onSubmit={createProduct}>

                                    <label className="form-label">Title</label>
                                    <input className="form-control" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>

                                    <label className="form-label">Image</label>
                                    <input className="form-control" type="file" onChange={changeHandler}/>

                                    <button type="submit" ></button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}