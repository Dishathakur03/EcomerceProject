import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { datacontext } from "../App";
function Changepass() {
    const[Pass, SetPass]= useState()
    const[npass, Setnpass]= useState()
    const[cnpass, Setcnpass]= useState()
    
    const navigate = useNavigate()
    const{udata, setudata}= useContext(datacontext)
   async function Handlesubmit(e){
        e.preventDefault()
         
     if(npass===cnpass && npass!==Pass){
        try{
        const ChangeP= {npass,Pass,uname:udata.Username}
        const apiresp = await axios.put("http://localhost:9000/api/changepass",ChangeP)
        if(apiresp.data.success==1){
          	setudata(null)
		navigate('/login')
		sessionStorage.removeItem("uinfo");
		 toast.success("Password Updated successfully,Please login with new password")
        }
            else if(apiresp.data.success==0){
               toast.info("Incorrect password")
            }
            else{
                toast.info("Some error occured")
            }
         
          } 
    catch(e){
        toast.info("Error occured" + e.message)
    }
    }
    else{
        toast.info("New password and old password may not match")
    }
}
        
    return(
        <>
           <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to ="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Change password</li>
			</ol>
		</div>
	</div>
<div className="login">
		<div className="container">
			<h2>Change password</h2> 
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="Form2" onSubmit={Handlesubmit}>
					<input name="CURRENT" type="password" placeholder="Current Password" required=" " onChange={(e)=>SetPass(e.target.value)}/>
					<input  name="NEW" type="password" placeholder="New Password" required=" " onChange={(e)=>Setnpass(e.target.value)}/>
                    <input  name="CNEW" type="password" placeholder="Confirm Password" required=" " onChange={(e)=>Setcnpass(e.target.value)}/>

					<input name="Change password" onClick={Handlesubmit} type="submit" value="Change Password!"/>
				</form>
			</div>
					</div>
	</div>
        </>
    )

}
export default Changepass;