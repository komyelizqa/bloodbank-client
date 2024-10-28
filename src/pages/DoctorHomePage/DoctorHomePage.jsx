import MyCalendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import avatar from "../../assets/images/doctor-avatar.png";
import Footer from "../../components/Footer/Footer";


function DoctorHomePage() {
  return (
    <>
     <Header
        userType="Doctor"
        userName="Dr. John Doe"
        userAvatar={avatar}
      />
      <MyCalendar />
      <Footer />
    </>
  );
}

export default DoctorHomePage;
