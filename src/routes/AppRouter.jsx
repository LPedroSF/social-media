import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import InfluencerProfile from "../pages/InfluencerProfile";
import NavBar from "../components/NavBar";
import Search from "../pages/Search";

const AppRouter = () => (
  <Router> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search" element={<Search />} />
      <Route path="/influencer/:id" element={<InfluencerProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <NavBar />
  </Router>
);

export default AppRouter;