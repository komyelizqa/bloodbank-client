import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import VolunteerHomePage from "./pages/VolunteerHomePage/VolunteerHomePage";
import DoctorHomePage from "./pages/DoctorHomePage/DoctorHomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    window.addEventListener('storage', handleStorageChange);
    
    window.addEventListener('userRoleChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userRoleChanged', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<WelcomePage setUserRole={setUserRole} />} />
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