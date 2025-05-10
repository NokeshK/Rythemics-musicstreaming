import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function Download() {
  const navigate = useNavigate();

  // List of Download options
  const downloadOptions = [
    "Windows",
    "Mac",
    "Linux",
    "iOS",
    "Android",
    "Web Player",
    "Smart TVs",
    "Gaming Consoles",
  ];

  return (
    <div className="download-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Download Rythemics
      </motion.h1>

      <p>Choose your platform to download Rythemics.</p>

      {/* Animated List of Download Options */}
      <div className="download-options">
        {downloadOptions.map((option, index) => (
          <motion.div
            key={index}
            className="download-box"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Delayed animation for each item
          >
            {option}
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

export default Download;
