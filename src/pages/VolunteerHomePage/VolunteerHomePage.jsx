import MyCalendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import avatar from "../../assets/images/volunteer-avatar.png";

function VolunteerHomePage() {
  return (
    <>
    <Header
        userType="Volunteer"
        userName="John Smith"
        userAvatar={avatar}
      />
      <MyCalendar />
      <Footer />
    </>
  );
}

export default VolunteerHomePage;
