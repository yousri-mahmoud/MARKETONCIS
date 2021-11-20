import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.css";
import Navbar from "./shared/navbar";
import Footer from "./shared/footer";
import Home from "./views/home";
import About from "./views/about-us";
import Register from "./views/auth/register";
import Login from "./views/auth/login";
import Market from "./views/market/market";
import Profile from "./views/profile/profile";
import SocialMedia from "./views/social-media/social-media";
import ShopHistory from "./components/Profile/ShopHistory";
import Whislist from "./components/Profile/Whislist";
import BlogActivity from "./components/Profile/BlogActivity";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />}>
          <Route element={<ShopHistory />} path="" />
          <Route element={<Whislist />} path="whislist" />
          <Route element={<BlogActivity />} path="activity" />
        </Route>
        <Route path="/market" element={<Market />} />
        <Route path="/social-media" element={<SocialMedia />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
