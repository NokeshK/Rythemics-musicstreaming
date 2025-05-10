import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations


function Support() {
  const navigate = useNavigate();

  // List of Spotify supporters
  const supporters = [
    "Rythemics for Artists",
    "Developers",
    "Advertisers",
    "Investors",
    "Vendors",
    "Music Labels",
    "Podcast Creators",
    "Premium Subscribers",
    "Freemium Users",
  ];

  return (
    <div className="support-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Support Page
      </motion.h1>

      <p className="support-text">Thank you to all our supporters who help make Rythemics amazing!</p>

      {/* Supporters List with Animation */}
      <div className="supporters-list">
        {supporters.map((supporter, index) => (
          <motion.div
            key={index}
            className="supporter-box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Delayed animation for each item
          >
            {supporter}
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back to Main Page
      </motion.button>
    </div>
  );
}

export default Support;
