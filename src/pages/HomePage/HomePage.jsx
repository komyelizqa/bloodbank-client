import React from 'react';
import VolunteerHomePage from '../VolunteerHomePage/VolunteerHomePage';
import DoctorHomePage from '../DoctorHomePage/DoctorHomePage';

const HomePage = () => {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole === 'volunteer') {
    return <VolunteerHomePage />;
  } else if (userRole === 'doctor') {
    return <DoctorHomePage />;
  } else {
    return null;
  }
};

export default HomePage;

