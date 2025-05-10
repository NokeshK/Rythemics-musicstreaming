import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const getSongsByAgeRange = (ageRange) => {
  const songs = {
    "1-12": ["Baala Tripura Sundari", "Chitti Chilakamma", "Chettu Kinda Doctoru"],
    "12-22": ["Nee Kallu Neeli Samudram", "Samajavaragamana", "Butta Bomma"],
    "22-34": ["Ramuloo Ramulaa", "Inkem Inkem Inkem Kaavaale", "Mellaga Tellarindoi"],
    "25-32": ["Maate Vinadhuga", "Yenti Yenti", "Kanulanu Thaake"],
    "32-44": ["Aakasam Nee Haddura", "Nee Kallalona", "Oke Oka Lokam"],
    "44-56": ["Jaamu Raatiri", "Swathi Muthyapu Jallulalo", "Om Namah Shivaya"],
    "56-66": ["Ee Gaanam", "Allari Priyudu", "Krishna Mukunda Murari"],
    "66-78": ["Yemito Ee Maya", "Manasu Palike Mouna Geetham", "Gopala Gopala"],
    "78-90": ["Ee Vayasulo", "Chitapata Chinukulu", "Raghukula Ranga"],
    "90-100": ["Pavithra Prema", "Oho Meghamala", "Kotha Kotha Bhasha"],
  };
  return songs[ageRange] || [];
};

export default function SongsPage() {
  const { ageRange } = useParams();
  const formattedAgeRange = ageRange.replace("_", "-");
  const [songs, setSongs] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const songList = getSongsByAgeRange(formattedAgeRange);
    setSongs(songList);
    const fetchedImages = {};
    songList.forEach(song => {
      fetchedImages[song] = `https://source.unsplash.com/300x200/?music,song`;
    });
    setImages(fetchedImages);
  }, [formattedAgeRange]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography 
          variant="h4" 
          sx={{ fontWeight: "bold", marginBottom: 3, color: "#ff5722", textAlign: "center" }}
        >
          Telugu Songs for Age {formattedAgeRange}
        </Typography>
      </motion.div>

      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "900px",
        }}
      >
        {songs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card 
                sx={{ 
                  borderRadius: "15px", 
                  boxShadow: 3, 
                  textAlign: "center",
                  width: "250px", /* Ensuring equal width */
                  height: "320px", /* Ensuring equal height */
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={images[song] || "https://via.placeholder.com/300"}
                  alt={song}
                  sx={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                />
                <CardContent>
                  <Typography variant="h6">{song}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
