import{ Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Signup from "./Signup"
import Login from "./Login"
import Thanks from './Thanks';
import SearchUser from './SearchUser';
import ListofUsers from './ListofUsers';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
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
        </Routes>
        </>
    )
}
export default SiteRoutes;