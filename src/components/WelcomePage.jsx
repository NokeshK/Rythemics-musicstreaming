import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Dummy User Data
const user = {
  name: "John Doe",
};

// Dummy Recently Played Songs
const recentlyPlayed = [
  { title: "Bujji Thalli", artist: "D.S.P", image: "/src/assets/bujjietallie.jpg" },
  { title: "Degarina Kodi", artist: "Akanksha", image: "/src/assets/DEGARINA.jpEg" },
  { title: "Nuvuntey", artist: "Teenu", image: "/src/assets/nuvuuntey.jpg" },
];

// Dummy Personalized Playlists
const playlists = [
  { name: "Top Hits", image: "/src/assets/tophits.webp" },
  { name: "Chill Vibes", image: "/src/assets/chillvibes.jpeg" },
  { name: "Workout Mix", image: "/src/assets/workoutmix.jpeg" },
];

export default function WelcomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #121212 0%, #000000 100%)",
        color: "#fff",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Container */}
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Top Bar */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {user.name}
          </Typography>
        </Box>

        {/* Recently Played */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Recently Played
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {recentlyPlayed.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    backgroundColor: "#181818",
                    borderRadius: "12px",
                    padding: 2,
                    textAlign: "left",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                    {song.title}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {song.artist}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Personalized Playlists */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 6, mb: 2 }}>
          Made for You
        </Typography>
        <Grid container spacing={3} justifyContent="center" pb={4}>
          {playlists.map((playlist, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    backgroundColor: "#181818",
                    borderRadius: "12px",
                    padding: 2,
                    textAlign: "left",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                    {playlist.name}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
