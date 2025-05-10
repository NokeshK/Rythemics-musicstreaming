import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Premium from "./components/Premium";
import Support from "./components/Support";
import Download from "./components/Download";
import Home from "./components/Home";
import CredentialsSignInPage from "./components/CredentialsSignInPage";
import WelcomePage from "./components/WelcomePage";
import Languages from "./components/Languages"; // Import Languages Component
import LanguagePage from "./components/LanguagePage";
import SongsPage from "./SongsPage"; // Ensure this is correctly imported
import Payment from "./components/Payment"; // Import Payment component

import { FaInstagram, FaWhatsapp, FaTwitter, FaMusic } from "react-icons/fa";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/support" element={<Support />} />
        <Route path="/download" element={<Download />} />
        <Route path="/signin" element={<CredentialsSignInPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/languages" element={<Languages />} /> 
        <Route path="/languages/:language" element={<LanguagePage />} />
        <Route path="/songs/:ageRange" element={<SongsPage />} /> {/* Fixed the component name */}
        <Route path="/payment" element={<Payment />} /> {/* Added route for Payment */}

      </Routes>
    </Router>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="brand-name">Rythemics <FaMusic /></h2>
        </div>
        <div className="footer-center">
          <div className="footer-column">
            <h3>Company</h3>
            <p>About</p>
            <p>Jobs</p>
            <p>For the Record</p>
          </div>
          <div className="footer-column">
            <h3>Communities</h3>
            <p>For Artists</p>
            <p>Developers</p>
            <p>Advertising</p>
            <p>Investors</p>
            <p>Vendors</p>
          </div>
          <div className="footer-column">
            <h3>Useful Links</h3>
            <p>Support</p>
            <p>Web Player</p>
            <p>Free Mobile App</p>
          </div>
          <div className="footer-column">
            <h3>Rythemics Plans</h3>
            <p>Premium Individual</p>
            <p>Premium Duo</p>
            <p>Premium Family</p>
            <p>Premium Student</p>
          </div>
        </div>
        <div className="footer-right">
          <a href="https://www.instagram.com/nokesh_off.side/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <FaMusic className="footer-music-icon-left" />
        <p>&copy; 2025 Rythemics. All Rights Reserved.</p>
        <FaMusic className="footer-music-icon-right" />
      </div>
    </footer>
  );
}

export default App;