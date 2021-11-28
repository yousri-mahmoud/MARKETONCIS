import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Post from "./views/social-media/Post";
import PostDetails from "./views/social-media/PostDetails";

import Sell from "./views/market/sell";
import Buy from "./views/market/buy";
import SingleProduct from "./components/market-component/single-product";
import ShopHistory from "./components/Profile/ShopHistory";
import Whislist from "./components/Profile/Whislist";
import BlogActivity from "./components/Profile/BlogActivity";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogIn);
  return (
    <>
      <Router>
        <main className="main">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            {isLoggedIn && (
              <Route path="/social-media" element={<SocialMedia />} />
            )}
            {isLoggedIn && (
              <Route path="/social-media/post" element={<Post />} />
            )}
            {isLoggedIn && (
              <Route path="/social-media/post/:id" element={<PostDetails />} />
            )}

            {isLoggedIn || <Route path="/register" element={<Register />} />}
            {isLoggedIn || <Route path="/login" element={<Login />} />}

            {isLoggedIn && (
              <Route path="/profile" element={<Profile />}>
                <Route element={<ShopHistory />} path="" />
                <Route element={<Whislist />} path="whislist" />
                <Route element={<BlogActivity />} path="activity" />
              </Route>
            )}
            {isLoggedIn && <Route path="/market" element={<Market />} />}
            {isLoggedIn && <Route path="/market/sell" element={<Sell />} />}
            {isLoggedIn && <Route path="/market/buy/*" element={<Buy />} />}
            {isLoggedIn && (
              <Route path="/market/buy/:id" element={<SingleProduct />} />
            )}

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
