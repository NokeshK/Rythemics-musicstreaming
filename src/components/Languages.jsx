import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Updated Language Data with first 6 languages only
const languages = [
  { name: "English", image: "/images/english.jpg" },
  { name: "Hindi", image: "/images/hindi.jpg" },
  { name: "Telugu", image: "/images/telugu.jpg" },
  { name: "Malayalam", image: "/images/malayalam.jpg" },
  { name: "Tamil", image: "/images/tamil.jpg" },
  { name: "Marathi", image: "/images/marathi.jpg" },
];

export default function Languages() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate loading
  }, []);

  return (
    <Box
      sx={{
        height: "100vh", // Increased height
        width: "100vw",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Explore Songs by Language
      </Typography>

      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              width: "80%", // Decreased width to make the containers narrower
              maxWidth: "1200px", // Limit the maximum width
            }}
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {languages.map((lang, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
                  }}
                  animate={{
                    rotate: [0, 3, -3, 3, 0], // Dance effect
                    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  }}
                  onClick={() => navigate(`/languages/${lang.name.toLowerCase()}`)}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${lang.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "250px", // Increased height of the language containers
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)",
                      cursor: "pointer",
                      transition: "transform 0.3s ease-in-out",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(to top, rgba(255, 250, 250, 0.7), rgba(255, 249, 249, 0))",
                        borderRadius: "16px",
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        position: "relative",
                        zIndex: 1,
                        color: "white",
                        letterSpacing: "1px",
                      }}
                    >
                      {lang.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Back Button */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 4,
                backgroundColor: "#ff4081",
                color: "white",
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#ff79b0",
                },
              }}
              onClick={() => navigate("/welcome")}
            >
              Back to Rythemics
            </Button>
          </motion.div>
        </>
      )}
    </Box>
  );
}
