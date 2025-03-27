import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routes
import Auth from "./components/Auth"
import Booking from "./components/Booking.jsx";
import VerifyEmail from "./components/VerifyMail.jsx";

//middleware 
import ProtectedRoute from "./utils/protected.routes.jsx";
import Header from "./utils/Header";

const App = () => {
  const token = localStorage.getItem('authtoken');
  console.log(token)

  return (
    <Router>
     {token != null && <Header />} 
      <Routes>
        <Route path="/" element={ <Auth /> } />
        <Route path="/verify-email" element={ <VerifyEmail /> } />
        <Route path="/booking" element={ <ProtectedRoute><Booking /></ProtectedRoute> } />
      </Routes>
    </Router>
  );
};
export default App;
