import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function Checkout() {
    const[pmode,setpmode] = useState()
   
    const navigate = useNavigate()
    const{setudata}= useContext(datacontext)
   async function onlogin(e){
        e.preventDefault()
        const loginData= {uname , Pass}
         try{
        const apiresp = await axios.post("http://localhost:9000/api/login",loginData)
        if(apiresp.data.success==1){
            toast.success("Login successful")
            setudata(apiresp.data.cdata)
            sessionStorage.setItem("uinfo",JSON.stringify(apiresp.data.cdata))
            if(apiresp.data.cdata.Usertype=="Admin"){
                
                navigate('/adminhome')
            }
            else{
                navigate('/')
            }
         }
            else if(apiresp.data.success==0){
                toast.info("Incorrect password")
            }
            else{
                toast.error("Some error has been occured, please try again...")
            }
        }
    catch(e){
        toast.info("Error occured" + e.message)
    }
        }
    return(
        <>
           <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to ="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Checkout</li>
			</ol>
		</div>
	</div>
<div className="login">
		<div className="container">
			<h2>Checkout</h2> 
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="Form2" onSubmit={onlogin}>
                    <textarea className="form-control">Enter your Address</textarea><br></br>
                    Choose the payment method<br></br>
					<label><input name="pmode" type="radio" value="Cash on delivery" placeholder="Email Address" required=" " onChange={(e)=>setpmode(e.target.value)}/>Cash on Delivery</label> &nbsp;
					<label><input  name="pmode" type="radio" value="Card" placeholder="Password" required=" " onChange={(e)=>setpmode(e.target.value)}/>Card payment</label>
                    {
                        pmode=="Card"?
                        <>
                       <input type="text" name="hname" placeholder="Holder Name"/><br/>
                        <input type="text" name="cardno" placeholder="Card No"/>
                        <input type="password" name="cvv" placeholder="CVV"/><br/>
                      <input type="text" name="exp" placeholder="Expiry"/>
                        </>:null
                    }
					<input name="Button" type="submit" value="Confirm order"/>
				</form>
			</div>
					</div>
	</div>
        </>
    )
}
export default Checkout;