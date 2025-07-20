import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
    const[uname,Setuname]= useState()
    const[Pass, SetPass]= useState()
    const navigate = useNavigate()
   async function onlogin(e){
        e.preventDefault()
       
        const loginData= {uname , Pass}
         try{
        const apiresp = await axios.post("http://localhost:9000/api/login",loginData)
        if(apiresp.data.success==1){
            toast.success("Login successful")
            navigate('/')
         }
            else if(apiresp.data.success=0){
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
				<li className="active">Login Page</li>
			</ol>
		</div>
	</div>
<div className="login">
		<div className="container">
			<h2>Login Form</h2> 
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="Form2" onSubmit={onlogin}>
					<input name="Email@" type="email" placeholder="Email Address" required=" " onChange={(e)=>Setuname(e.target.value)}/>
					<input  name="pass" type="password" placeholder="Password" required=" " onChange={(e)=>SetPass(e.target.value)}/>
					<input name="Button" type="submit" value="Click here to Login!"/>
				</form>
			</div>
					</div>
	</div>
        </>
    )
}
export default Login;