import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { datacontext } from "../App";
function Showcart() {
    const{udata} = useContext(datacontext)
    const [cartdata,setcartdata]= useState([])
    const[gtotal,setgtotal]=useState()
    const navigate = useNavigate()    
   async function getcart(){
    try{
       
        const apiresp = await axios.get(`http://localhost:9000/api/getcart?uname=${udata.Username}`)
        if(apiresp.data.success===1){
           setcartdata(apiresp.data.ctdata)
         }
            else if(apiresp.data.success===0){
            setcartdata([])
            }
            else{
                toast.error("Some error has been occured, please try again...")
            }
        }
    catch(e){
        toast.info("Error occured" + e.message)
    }
        }
        useEffect(()=>{
            if(udata!==null) {
                getcart()
            }
        }
,[udata])
useEffect(()=>{
var gtot;
for(var x=0; x<cartdata.length; x++){
    gtot =  gtot + cartdata[x].totalcost
}
setgtotal(gtot);
},[cartdata])
async function Handledelete(_id){
    try
    {
        if(window.confirm("are you sure you want to delete?"))
        {
            
     const apidel = await axios.delete('http://localhost:9000/api/delcart?')
     if(apidel.data.sucess===1) {
        toast.info("User deleted successfully")
     }
     else if(apidel.data.sucess===1){
        toast.info("User not deleted")
     }
        }
 }
 catch(e){
 toast.info("some error occured, try again!" + e.message)
}
}
function Oncheckout() {
    sessionStorage.setItem("carttotal", gtotal)
    navigate('/Checkout')
}
    return(
        <>
           <div className="breadcrumbs">
        <div className="container">
            <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to ="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                <li className="active">Your shopping list</li>
            </ol>
        </div>
    </div>
<div className="register">
		<div className="container">
            {
            cartdata.length>0?
            <>
                <h2>Your shopping cart</h2><br/>
                <table className="timetable_sub">
                 
                <tbody>
                    
                        <tr>
                        
                             <th>Picture</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                            <th>Delete</th>
                    </tr>
                
                  { 
                  cartdata.map((data,i)=>
                   <tr key={i}>
                        <td><img src={`/Uploads/${data.picname}`} alt="prodimage" height="75"/></td>
                        <td>{data.prodname}</td>
                        <td>{data.rate}</td>
                        <td>{data.qty}</td>
                        <td>{data.totalcost}</td>
                       <td><button className="btn btn-danger" onClick={()=>Handledelete(data._id)}>Delete</button></td> 
                    </tr>
)}
                    
                  </tbody>
            </table>
              {cartdata.length} product(s) found<br/>
                Your total bill amount is Rs.{gtotal}/-<br/><br/>
              <button className="btn btn-primary" onClick={Oncheckout}>Checkout</button>
            </>:<h2>Your cart is empty!</h2>
            }
            </div>
    </div>
           </>
    )
}
export default Showcart;