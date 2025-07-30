import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { datacontext } from "../App";
function Proddetails() {
    const [params] = useSearchParams();
    const pid = params.get("prodid")
    const [info, setinfo] = useState({})
    const[remcost, setremcost] = useState()
    const[qnty,setqnty]=useState()
    const[availqnty,setavailqnty]=useState([])
    const navigate = useNavigate()
    const{udata}=useContext(datacontext)
    async function getprodDet() {
        try {
            const apiresp = await axios.get(`http://localhost:9000/api/getdetailsbyprod?prodid=${pid}`)
            if (apiresp.data.success == 1) {
                setinfo(apiresp.data.Detdata)
            }
            else if (apiresp.data.success == 0) {
                setinfo({})
            }
            else {
                toast.error("Something went wrong")
            }
        }
        catch (e) {
            toast.error("error occurred" + e.message)
        }
    }
    async function Handlecart(e){
    e.preventDefault()
     
        try {
            var totalcost = (remcost)*(qnty)
            const apidata={pid, Productname:info.Productname, remcost, totalcost, qnty, picname:info.Picture,uname:udata.Username }
            const apiresp = await axios.post(`http://localhost:9000/api/savecart`,apidata)
            if (apiresp.data.success == 1) {
               navigate("/showcart")
            }
            else if (apiresp.data.success == 0) {
                toast.info("No items have been selected")
            }
            else {
                toast.error("Something went wrong")
            }
        }
        catch (e) {
            toast.error("error occurred" + e.message)
        }
    }
    useEffect(() => {
        if (pid !== "") {
            getprodDet();
        }
    }, [pid])
    useEffect(()=>{
        setremcost(info.Rate-(info.Rate*info.Discount/100))
        var stockarr=[];
        if(info.Stock>10)
        {
            for(var x=1;x<=10;x++)
            {
                stockarr.push(x);
            }
        }
        else
        {
            for(var x=1;x<=info.Stock;x++)
            {
                stockarr.push(x);
            }
        }
        setavailqnty(stockarr);
    },[info]
    )
    return (
        <>
                  <div className="breadcrumbs">
                        <div className="container">
                            <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                                <li>
                                    <Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                                <li className="active">Product Details</li>
                            </ol>
                        </div>
                    </div>
                    <div className="products">
                        <div className="container">
                            <div className="agileinfo_single">
        
                                <div className="col-md-4 agileinfo_single_left">
                                    <img id="example" src={`Uploads/${info.Picture}`} alt=" " className="img-responsive" />
                                </div>
                                <div className="col-md-8 agileinfo_single_right">
                                    <h2>{info.Productname}</h2>
                                    <div className="w3agile_description">
                                        <h4>Description :</h4>
                                        <p>{info.Description}</p>
                                    </div>
                                    <div className="snipcart-item block">
                                        <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                        <h4 className="m-sing">₹{remcost}/-<span>₹{info.Rate}/-</span></h4>
                                        </div>
                                        <div className="snipcart-details agileinfo_single_right_details">
                                            <form name="form2" onSubmit={Handlecart}>
                                                <fieldset>
                                                   <select name="quantity" onChange={(e)=>setqnty(e.target.value)}> 
                                                    <option value="">Choose Quantity</option>
                                                   {
                                                    availqnty.length>0?
                                                    availqnty.map((st,i)=>
                                                        <option key={i}>{st}</option>
                                                    ):null
                                                        }                               
                                                   </select>  
                                                 <br></br>
                                                <br></br>
                                                    <input type="submit" name="submit" value="Add to cart" className="button" />
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                        </div>
                    </div>
</>
    )
}
export default Proddetails;