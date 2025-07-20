import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SiteRoutes from "./Components/SiteRoutes";
import{ ToastContainer } from 'react-toastify';
function App() {
  return ( 
  <>
  <ToastContainer theme="colored"></ToastContainer>
  <Header/>
  <SiteRoutes/>
  <Footer/>
     </>
  )
}

export default App;
