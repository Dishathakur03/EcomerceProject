import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import axios from "axios";
function Categories() {
    const[catdata,setcatdata]=useState([]);
     async function fetchallcat(){
                try{
            const apiresp =await axios.get("http://localhost:9000/api/getallcateg")
        
                if(apiresp.data.success===1) {
 
                   setcatdata(apiresp.data.cdata)
            }
            else if(apiresp.data.success===0) {
                setcatdata([])
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
   },[])
    return(
<>
<div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        
                    </ol>
                </div>
            </div>
 <div className="login">
            <div className="container">
                
             { 
             catdata.length>0?
             <>
             <h2>Product category</h2>
             {
                catdata.map((data,i)=>
<div key={i} className="col-md-4 top_brand_left">
                    <div className="hover14 column">
                        <div className="agile_top_brand_left_grid">
                           
                            <div className="agile_top_brand_left_grid1">
                                
                                <figure>
                                    <div className="snipcart-item block" >
                                        <div className="snipcart-thumb">
                                           <Link to={`/Products?id=${data._id}`}><img src={`Uploads/${data.Picture}`} height='170'/>	
                                            <p>{data.Catname}</p></Link>	
                                        </div>
                                       
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                        </div>)}
                </>:null }
                 </div>
                 </div>
</>
    )
}
export default Categories;