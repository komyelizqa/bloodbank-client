import "./HomePage.scss";
import MyCalendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer" 

function HomePage() {
  return (
    <>
        <Header />
      <MyCalendar />
      <Footer />
    </>
  );
}

export default HomePage;
