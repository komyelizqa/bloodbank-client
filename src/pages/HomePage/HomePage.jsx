import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./HomePage.scss";
import MyDatePicker from "../../components/DatePicker/DatePicker"
import MyCalendar from "../../components/Calendar/Calendar";

function HomePage() {
  return (
    <>
      <main>
      <MyCalendar />
      </main>
    </>
  );
}

export default HomePage;
