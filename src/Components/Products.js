import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"; 
import { toast } from "react-toastify";
import axios from "axios";
function Products() {
    const[proddata,setproddata]=useState([]);
   const[params] = useSearchParams();
   const catid = params.get("id")
    async function getprodsbycat() {
        try{
            const apiresp= await axios.get(`http://localhost:9000/api/getprodsbycat?cid=${catid}`)
            if(apiresp.data.success==1){
                setproddata(apiresp.data.pdata)
            }
            else if(apiresp.data.success==0)
            {
                setproddata([])
            }
            else {
                toast.error("Something went wrong")
            }
        }
        catch(e) {
            toast.error("error occurred" + e.message)
        }
    }
    useEffect(()=>{
     if(catid!=="")
        {
           getprodsbycat();
        }
    },[catid])
    return(
<>
 <div className="login">
            <div className="container">
              {
           proddata.length>0?
           <>
           {
            proddata.map((data,i)=>

<div key= {i} className="col-md-4 top_brand_left">
                    <div className="hover14 column">
                        <div className="agile_top_brand_left_grid">
                           
                            <div className="agile_top_brand_left_grid1">
                                <figure>
                                    <div className="snipcart-item block" >
                                        <div className="snipcart-thumb">
                                           <Link to={`/details?prodid=${data._id}`}><img src={`Uploads/${data.Picture}`} height="175" />		
                                            <p>{data.Productname}</p></Link>
                                        
                                        </div>
                                       
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
)}
               </>:null }
                 </div>
                 </div>
</>
    )
}
export default Products;