import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function ListofUsers() {
    const[allinfo, Setallinfo]= useState([])
   async function fetchAllUsers(){
     
         try{
        const apiresp = await axios.get(`http://localhost:9000/api/listofusers`)
        if(apiresp.data.sucess===1){
            Setallinfo(apiresp.data.udata)
         }
            else if(apiresp.data.sucess===0){
                Setallinfo({})
                toast.info("No users found!")
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
            fetchAllUsers()
        }
,[])
async function deluser(){
    try
    {
        if(window.confirm("are you sure you want to delete?"))
        {
            
     const apidel = await axios.delete('http://localhost:9000/api/deluser')
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
    return(
        <>
           <div className="breadcrumbs">
        <div className="container">
            <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to ="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                <li className="active">List of users</li>
            </ol>
        </div>
    </div>
<div className="register">
		<div className="container">
            {
            allinfo.length>0?
            <>
            <table className="table table-hover">
                <h2>List of Users</h2>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Username</th>
                        <th>Delete</th>
                    </tr>{
                allinfo.map((data,i)=>
                    <tr key={i}>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.Username}</td>
                    <td><button onClick={()=>deluser(data._id)} className="btn btn-danger"> Delete</button></td>
                </tr>
                )
                    }
                </tbody>
            </table>
            </>:null
            }
            </div>
    </div>
           </>
    )
}
export default ListofUsers;