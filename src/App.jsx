import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Redirect from "./components/Redirect/Redirect";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer" 

function App() {
  return (
    <BrowserRouter>
            <Header />
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/calendar" element={<HomePage />} />
        <Route path="/calendar/:type/:year/:month/:day" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;