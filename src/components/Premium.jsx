import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

function Premium() {
  const navigate = useNavigate();

  // List of Spotify Premium Plans
  const premiumPlans = [
    { name: "Individual", price: "$9.99/month", features: "1 account • Ad-free music • Offline playback" },
    { name: "Duo", price: "$12.99/month", features: "2 accounts • Ad-free music • Duo Mix" },
    { name: "Family", price: "$15.99/month", features: "Up to 6 accounts • Ad-free music • Parental control" },
    { name: "Student", price: "$4.99/month", features: "1 account • Discount for students • Ad-free music" },
  ];

  return (
    <div className="premium-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Premium Plans
      </motion.h1>

      <p>Choose the best plan that fits your lifestyle.</p>

      {/* Animated Premium Plans List */}
      <div className="premium-plans">
        {premiumPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="premium-box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered animation
          >
            <h2>{plan.name}</h2>
            <p>{plan.price}</p>
            <p>{plan.features}</p>
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

export default Premium;
