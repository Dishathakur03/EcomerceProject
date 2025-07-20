import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function SearchUser() {
    const[email,Setemail]= useState()
    const[uinfo, Setuinfo]= useState({})
   async function HandleSubmit(e){
        e.preventDefault();
         try{
        const apiresp = await axios.get(`http://localhost:9000/api/SearchUser?em=${email}`)
        if(apiresp.data.sucess===1){
            Setuinfo(apiresp.data.udata)
         }
            else if(apiresp.data.sucess===0){
                Setuinfo({})
                toast.info("Incorrect Username")
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
                <li><Link to ="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                <li className="active">Search user</li>
            </ol>
        </div>
    </div>
<div className="login">
        <div className="container">
            <h2>Search User</h2> 
         <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                <form name="Form3" onSubmit={HandleSubmit}>
					<input name="Email@" type="email" placeholder="Email Address" required=" " onChange={(e)=>Setemail(e.target.value)}/>

					<input name="Button" type="submit" value="Search here!"/><br></br>
                
                        {
          
                        Object.keys(uinfo).length>0?
                        <>
                        <p>Name: {uinfo.name}</p><br/>
                            <p>Phone: {uinfo.phone}</p>
                        </>:null
                         }
				</form>
              </div>
                    </div>
    </div>
           </>
    )
}
export default SearchUser;