import { useContext } from 'react';
import{ Link, useNavigate } from 'react-router-dom';
import { datacontext } from '../App';
import { toast } from 'react-toastify';
function Header() {
	const navigate = useNavigate()
	const{udata,setudata}= useContext(datacontext)
	function Handlelogout() {
		setudata(null)
		navigate('/login')
		sessionStorage.removeItem("uinfo");
		toast.info("You have succesfully logged out")
		
	}
return(
    <>
     <div className="agileits_header">
		<div className="container">
			<div className="w3l_offers">
				<p>Welcome {udata===null? "Guest": udata.name}</p>
			</div>
			<div className="agile-login">
				<ul>
					{
						udata==null?
						<>
					<li><Link to ="/signup">" Create Account</Link></li>
					<li><Link to ="/login"> Login</Link></li>
					<li><a href="contact.html">Help</a></li>
					
					</>:
					<>
					
					<li><Link to ="/Changepassword">Change Password</Link></li>
					<button className='btn btn-primary' onClick={Handlelogout}>Logout</button>
					
					</>	
					}
					<li>Help</li>
					</ul>
			</div>
			<div className="product_list_header">  
					<form action="#" method="post" className="last"> 
						<input type="hidden" name="cmd" value="_cart"></input>
						<input type="hidden" name="display" value="1"></input>
						{udata!==null?
						<button className="w3view-cart" onClick={()=>navigate('/showcart')} type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>:null}
					</form>  
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="logo_products">
		<div className="container">
		<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
					<li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : (+0123) 234 567</li>
					
				</ul>
			</div>
			<div className="w3ls_logo_products_left">
				<h1><a href="index.html">super Market</a></h1>
			</div>
		<div className="w3l_search">
			<form action="#" method="post">
				<input type="search" name="Search" placeholder="Search for a Product..." required=""/>
				<button type="submit" className="btn btn-default search" aria-label="Left Align">
					<i className="fa fa-search" aria-hidden="true"> </i>
				</button>
				<div className="clearfix"></div>
			</form>
		</div>
			
			<div className="clearfix"> </div>
		</div>
	</div>
	<div className="navigation-agileits">
		<div className="container">
			<nav className="navbar navbar-default">
							<div className="navbar-header nav_2">
								<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
							</div> 
							<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
								<ul className="nav navbar-nav">
									<li className="active"><Link to="/" className="act">Home</Link></li>
									
									
									<li><Link to ="/categories">Categories</Link></li>
									<li><a href="gourmet.html">Gourmet</a></li>
									<li><a href="offers.html">Offers</a></li>
									<li><a href="contact.html">Contact</a></li>
								</ul>
							</div>
							</nav>
			</div>
		</div>
   
    </>
)
}
export default Header