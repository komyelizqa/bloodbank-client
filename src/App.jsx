import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import VolunteerHomePage from "./pages/VolunteerHomePage/VolunteerHomePage";
import DoctorHomePage from "./pages/DoctorHomePage/DoctorHomePage";
import LoginPage from "./pages/LoginPage/LoginPage"

function App() {
  const userRole = localStorage.getItem('userRole');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/calendar/*"
          element={
            userRole === 'volunteer' ? (
              <VolunteerHomePage />
            ) : userRole === 'doctor' ? (
              <DoctorHomePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;