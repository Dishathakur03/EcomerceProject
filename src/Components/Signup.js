import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from  "react-router-dom";
import axios from "axios";
function Signup() {
    const[pname,Setpname]= useState()
    const[phn,SetPh]= useState()
    const[uname, SetUname]= useState()
    const[Pass,SetPass]= useState()
    const[Cpass,SetCpass]= useState()
    const[Check,SetCh]= useState(false)
	const Navigate = useNavigate()
    async function HandleSubmit(e) {
 e.preventDefault();
 if(Check==true) {
	
if(Pass==Cpass) 
	{
	try {
	const signupdata = {pname,phn,uname,Pass}
	const apiresp=await axios.post("http://localhost:9000/api/register",signupdata)
	
	if(apiresp.data.sucess===true)
	{
		toast.success("Thanks for signing up")
		Navigate("/thanks")
	}
	else{
		toast.error("Couldn't Signup")
	}
}
catch(e){
	toast.error(e.message)
}
}

else {
    toast.error("Confirmed Password and pasword doesn't match!")
}
 }
 else
 {
    toast.info("Please accept the terms and conditions")
 }
 }

    return(
        <>
        
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to ="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Register Page</li>
			</ol>
		</div>
	</div>

	<div className="register">
		<div className="container">
			<h2>Register Here</h2>
			<div className="login-form-grids">
				<h5>profile information</h5>
				<form name="Form1" onSubmit={HandleSubmit}>
					<input type="text" name="Name" placeholder="Your Name..." onChange={(e)=>Setpname(e.target.value)} required=" "/>
					<input type="text" name="phone" placeholder="Phone.." onChange={(e)=>SetPh(e.target.value)} required=" "/>
				<div className="register-check-box">
				</div>
				<h6>Login information</h6>
					<input type="email" name="ename" placeholder="Email Address(Username)" onChange={(e)=>SetUname(e.target.value)} required=" "/>
					<input type="password" name="pass" placeholder="Password" onChange={(e)=>SetPass(e.target.value)} required=" " />
					<input type="password" name="cpass" placeholder="Password Confirmation" onChange={(e)=>SetCpass(e.target.value)} required=" " />
					<div className="register-check-box">
						<div className="check">
							<label className="checkbox"><input type="checkbox" name="checkbox" onChange={(e)=>SetCh(e.target.checked)}/><i> </i>I accept the terms and conditions</label>
						</div>
					</div>
					<input name="btn" type="submit" value="Register"/>
				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default Signup;