import './App.scss';
import{BrowserRouter, Routes, Route} from "react-router-dom"; 
import HomePage from "./pages/HomePage/HomePage"
import Redirect from "./components/Redirect/Redirect";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import "react-datetime/css/react-datetime.css";

Modal.setAppElement('#root');

function App() {


  return (
    <BrowserRouter>
   <Routes>
   <Route path="/" element={<Redirect />}></Route>
   <Route path="/calendar" element={<HomePage />} />
   </Routes>
   </BrowserRouter>

  )
}

export default App
