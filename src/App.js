import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SiteRoutes from "./Components/SiteRoutes";
import{ ToastContainer } from 'react-toastify';
import { createContext, useEffect, useState } from "react";
const datacontext = createContext(null)
function App() {
  useEffect(()=>{
   if (sessionStorage.getItem("uinfo")!==null)
   {
    setudata(JSON.parse (sessionStorage.getItem("uinfo")))
   }
  },[])
  const [udata,setudata] = useState(null)
  return ( 
  <>
  <ToastContainer theme="colored"></ToastContainer>
<datacontext.Provider value={{udata,setudata}}>
  <Header/>
  <SiteRoutes/>
  <Footer/>
  </datacontext.Provider>
     </>
  )
}

export default App;
export {datacontext}
