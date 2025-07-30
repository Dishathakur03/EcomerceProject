import { Link } from "react-router-dom";
function Adminhome(){
    return(
        <>
        <div className="login">
            <div className="container">
                <h2>Welcome Admin!</h2>
                <br></br>
                <p>Tap links below to add products/Categories</p>
                <br></br>
                <Link to="/Managecat">Manage Categories</Link>
                <br></br>
                <Link to="/Manageproducts">Manage Products</Link>
            </div>
        </div>
       
        </>
    ) 
}
export default Adminhome;