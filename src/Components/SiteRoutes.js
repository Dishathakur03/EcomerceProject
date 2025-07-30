import{ Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Signup from "./Signup"
import Login from "./Login"
import Thanks from './Thanks';
import SearchUser from './SearchUser';
import ListofUsers from './ListofUsers';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
import Adminhome from './Adminhome';
import Products from './Products';
import Categories from './Categories';
import Proddetails from './Proddetails';
import Changepass from './Changepass';

import Showcart from './Showcart';
import Checkout from './Checkout';
function SiteRoutes() {
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/homepage" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
           <Route path="/thanks" element={<Thanks/>}></Route>
           <Route path="/SearchUser" element={<SearchUser/>}></Route>
           <Route path="/Listofusers" element={<ListofUsers/>}></Route>
           <Route path="/Managecat" element={<ManageCategory/>}></Route>
           <Route path="/Manageproducts" element={<ManageProducts/>}></Route>
          <Route path="/adminhome" element={<Adminhome/>}></Route>
          <Route path="/Products" element={<Products/>}></Route>
          <Route path="/categories" element={<Categories/>}></Route>
          <Route path="/Details" element={< Proddetails/>}></Route>
          <Route path="/Changepassword" element={<Changepass/>}></Route>
          <Route path="/showcart" element={<Showcart/>}></Route>
          <Route path="/Checkout" element={<Checkout/>}></Route>
        </Routes>
        </>
    )
}
export default SiteRoutes;