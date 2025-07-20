import {  useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function ManageProducts() {
    const[catid,Setcat]=useState()
    const[prod,Setprod]=useState()
    const[rate,Setrate]=useState()
    const[dis,Setdis]=useState()
    const[stock,Setstock]=useState()
    const[Feat,SetFeat]=useState()
    const[Descrep, Setdes]=useState()
    const[CatData, Setdata]=useState([])
    const[picfile,Setpicfile]=useState()

    // Using Formdata 

   async function handlesubmit(e)
   {
    e.preventDefault()
     try{
    const formdata = new FormData();
    
    formdata.append("catid" , catid)
    formdata.append("prod" , prod)
    formdata.append("rate" , rate)
    formdata.append("dis" , dis)
    formdata.append("stock", stock)
    formdata.append("Feat" , Feat)
    formdata.append("Descrep" , Descrep)
    formdata.append("CatData" , CatData)
    
    if(picfile!==null){
    formdata.append("pic", picfile);
    }
     const apiresp = await axios.post(`http://localhost:9000/api/Saveproducts`, formdata)
        if(apiresp.data.sucess===1){
           toast.success("Category added succesfully")
         }
            else if(apiresp.data.sucess===0){
               toast.error("Category not added succesfully")
            }
            else{
                toast.error("Some error has been occured, please try again...")
            }
        }
    catch(e){
        console.log(e.message)
        toast.info("Error occured" + e.message)
    }
        }
        async function fetchallcat(){
                try{
            const apiresp =await axios.get("http://localhost:9000/api/getallcateg")
        
                if(apiresp.data.success===1) {
toast.success("ADDED!!")
                   Setdata(apiresp.data.cdata)
            }
            else if(apiresp.data.success===0) {
                Setdata([])
                toast.info("no category found")
            }
            else{
                toast.error("Error on adding category")
            }
        }
        catch(e){
            
            toast.info("error occurred" + e.message)
        }
    }
        useEffect(()=>{
            fetchallcat();
        },([]))

    return(
        <>
           <div className="breadcrumbs">
        <div className="container">
            <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to ="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                <li className="active">Manage Products</li>
            </ol>
        </div>
    </div>
  
            <div className="login">
                <div className="container">
                    <h2>Manage Products</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit} >
                   <select type="text" name="cname" placeholder="Category Name" required=""className="form-control" onChange={(e)=>Setcat(e.target.value)}>
                    <option value="">Choose Category</option>
                    {
                        CatData.length>0?
                        CatData.map((data,i)=>
                            <option value={data._id} key={i}>{data.Catname}</option>
                        ):null
                    }
                    </select><br></br>
                    <input type="text" name="pdname" placeholder="Products" required="" onChange={(e)=>Setprod(e.target.value)} />
                    <br></br>
                   <input type="number" name="Rate" placeholder="Rate(without Rs)" required="" onChange={(e)=>Setrate(e.target.value)} className="form-control"/>
                   <br></br>
                   <input type="number" name="Discount" placeholder="Discount(Without % syymbol)" required="" onChange={(e)=>Setdis(e.target.value)}className="form-control" />
                   <br></br>
                   <input type="type"name="stock" placeholder="Stock" className="form-control" onChange={(e)=>Setstock(e.target.value)}></input>
                      <label> <input type="radio" name="Feat" value="yes" placeholder="Category Name" required="" onChange={(e)=>SetFeat(e.target.value)}/>yes</label> &nbsp;
                      <label> <input type="radio" name="Feat" value="no" placeholder="Category Name" required="" onChange={(e)=>SetFeat(e.target.value)} />no</label>
                       
                       <textarea placeholder="Description" onChange={(e)=>Setdes(e.target.value)} name="Description" className="form-control"></textarea>
                       <input type="file" name="img" onChange={(e)=>Setpicfile(e.target.files[0])}></input>
                       <br></br>
                        <input type="submit" name="btn" className="btn btn-primary" value="Add Product" /><br/><br/>
                        </form>
                    </div>
                </div>
            </div>   
                         </>
    )
}
export default ManageProducts