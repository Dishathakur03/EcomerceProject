import {  useEffect, useState, useRef} from "react";
import axios from "axios";
import { toast} from "react-toastify";
import { Link } from "react-router-dom";
function ManageCategory() {
    const [cname,setcname] = useState("");
    const [picfile,setpicfile] = useState(null)
    const[catdata, setcatdata]= useState([])
    const[editmode, seteditmode]=useState(false)
    const[imgname,setimgname]=useState("")
    const[catid,setcatid]=useState()
    const fileInputRef = useRef(null)
   async function handlesubmit(e)
   {
    e.preventDefault()
     try{
    const formdata = new FormData();
    formdata.append("catname", cname);
    if(picfile!==null){
    formdata.append("pic", picfile);
    }
     const apiresp = await axios.post(`http://localhost:9000/api/Savecategory`, formdata)
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
        toast.info("Error occured" + e.message)
    }
        }
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
useEffect (()=>{
fetchallcat()
},[])
async function Updatecategory() {
 try{
    const formdata = new FormData();
    formdata.append("catname", cname);//either it will have old catname or new
    if(picfile!==null){
    formdata.append("pic", picfile);// for new file/pic
    }
    formdata.append("oldpic" , imgname);//for old that will be used to delete if new file is selected and alos for unchnged pic if user doesn't want to make any change
    formdata.append("cid", catid)
     const apiresp = await axios.put('http://localhost:9000/api/updatecategory', formdata)
        if(apiresp.data.sucess===1){
           toast.success("Category updated succesfully")
           handlecancel()
           fetchallcat()
         }
            else if(apiresp.data.sucess===0){
               toast.error("Category not updated")
            }
            else{
                toast.error("Some error has been occured, please try again...")
            }
        }
    catch(e){
        toast.info("Error occured" +  e.message)
    }
        }

 

async function Handledelete(id)
    {
        try
        {
            if(window.confirm("Are you sure to delete?"))
            {
                const apiresp = await axios.delete(`http://localhost:9000/api/deletecat/${id}`)
                if(apiresp.data.sucess===1)
                {
                    toast.info("Category deleted successfully")
                    handlecancel();
                    fetchallcat();
                }
                else if(apiresp.data.sucess===0)
                {
                    toast.info("Category not deleted")
                }
                else
                {
                    toast.error("Some error occured, try again")
                }
            }
        }
        catch(e)
        {
            toast.error("Error Occured " + e.message)
        }
    }
    
function handleupdate(catinfo) {
    seteditmode(true)
    setcname(catinfo.Catname)
    setimgname(catinfo.Picture)
    setcatid(catinfo._id)

}
function handlecancel(){
    seteditmode(false)
    setcname("")
    setimgname("")
    setpicfile(null)
    setcatid("")
    if(fileInputRef.current){
        fileInputRef.current.value=null;
    }

}

    return(
        <>
           <div className="breadcrumbs">
        <div className="container">
            <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                <li><Link to ="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Admin Home</Link></li>
                <li className="active">Manage Category</li>
            </ol>
        </div>
    </div>
  
            <div className="login">
                <div className="container">
                    <h2>Manage Category</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={handlesubmit}>
                        <input type="text" value={cname} name="cname" placeholder="Category Name" required="" onChange={(e)=>setcname(e.target.value)} />
                       {editmode?<><img src={`Uploads/${imgname}`} height='75' alt='cat-pic'></img></>:null}
                        <br/><input type="file" ref={fileInputRef} name="cpic" onChange={(e)=>setpicfile(e.target.files[0])} />
                       
                        {
                            editmode?
                            <>
                             <br/>
                            <input type="button" onClick={Updatecategory} value="Update Category" name="btn" className="btn btn-primary"></input> &nbsp;
                            <input type="button" onClick={handlecancel} value="Cancel" name="btn" className="btn btn-primary"></input>
                            </>:<input type="submit" name="btn" value="Add Category" />
                        }
                        </form>
                    </div>
                    
                    {
                        catdata.length>0?
                     <>
                     <br/>
                     <h2>Categories Added</h2>
                        <table className="timetable_sub">
                            <tbody>
                          <tr><th>Picture</th>
                          
                          <th>Category name</th>
                          
                          <th>Update</th>
                         
                          <th>Delete</th></tr>
                          
                            {
                         catdata.map((data,i)=>
                            <tr key={i}>
                        <td><img src={`Uploads/${data.Picture}`}  height="75"alt="cat-pic"></img></td> 
                        <td>{data.Catname}</td>
                        <td><button type="Submit" className="btn btn-primary" onClick={()=>handleupdate(data)} >Update</button></td>
                        <td><button type="Submit"className="btn btn-danger" onClick={()=>Handledelete(data._id)} >Delete</button></td>
                        </tr>
                     )
                    }         
                         </tbody>
                        </table>
                        <br/>
                        {catdata.length} categories found
                      </>:null
                      
                        
                }
                </div>
            </div>   
                         </>
    )
}
export default ManageCategory;