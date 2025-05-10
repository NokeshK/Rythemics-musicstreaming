import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Card, CardContent, CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";

// Mock song data for each language with added image URL for each song
const songsData = {
  english: [
    { title: "Shape of You", artist: "Ed Sheeran", imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png" },
    { title: "Blinding Lights", artist: "The Weeknd", imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png" },
    { title: "Levitating", artist: "Dua Lipa", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjnXQt224PfvS92bia4xoDLJPVvkwF3I_f8g&s" },
    { title: "Rolling in the Deep", artist: "Adele", imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/Adele_-_Rolling_in_the_Deep.png" },
    { title: "Stay", artist: "The Kid LAROI, Justin Bieber", imageUrl: "https://resizing.flixster.com/rPaAh2qh7yfGf7YtLO_7B__VDyk=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p24205057_v_v13_aa.jpg" },
  ],
  hindi: [
    { title: "Tum Hi Ho", artist: "Arijit Singh", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/ff/Tum_Hi_Ho_cover.jpeg" },
    { title: "Tum Jo Aaye", artist: "Rahat Fateh Ali Khan", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7oH22iV6HnNXHu_KLGaSMYJt7RCjak5lafw&s" },
    { title: "Channa Mereya", artist: "Arijit Singh", imageUrl: "https://encxrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLNJD2-76uVwAVgJmuEsAJ3LBncklG9OU7HA&s" },
    { title: "Raabta", artist: "Arijit Singh, Shreya Ghoshal", imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8b/Raabta_poster.jpg" },
    { title: "Galliyan", artist: "Ankit Tiwari", imageUrl: "https://c.saavncdn.com/863/Ek-Villain-Hindi-2014-500x500.jpg" },
  ],
  telugu: [
    { title: "Butta Bomma", artist: "Armaan Malik", imageUrl: "https://m.media-amazon.com/images/M/MV5BMzg1MzJhY2QtMzViMi00Mjk4LWIxNGQtZWZjZWUzZjk2ZmQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { title: "Vachindamma", artist: "Sid Sriram", imageUrl: "https://m.media-amazon.com/images/I/51-8xUWbAgL._UXNaN_FMjpg_QL85_.jpg" },
    { title: "Samajavaragamana", artist: "Sid Sriram", imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/samajavaragamana-et00357284-1681304368.jpg" },
    { title: "Ramuloo Ramulaa", artist: "Anurag Kulkarni", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTz82osmJs6dbKRyZ7M3KIbczkSLyaqm9feQ&s" },
    { title: "Panchasara", artist: "Anirudh Ravichander", imageUrl: "https://images.moviebuff.com/621bc9ca-cab3-4d2b-b014-233dab833839?w=1000" },
  ],
  malayalam: [
    { title: "Entammede Jimikki Kammal", artist: "Vijay Yesudas", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJrVJx5hhWiAYEac3627ehQin8LjtvvgikQg&s" },
    { title: "Manikya Malaraya Poovi", artist: "Arijit Singh", imageUrl: "https://c.saavncdn.com/605/Oru-Adaar-Love-Malayalam-2019-20190226193703-500x500.jpg" },
    { title: "Kudukku", artist: "Vineeth Sreenivasan", imageUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kudukku-2025-et00333132-1661165204.jpg" },
    { title: "Jimmiki Kammal", artist: "Vijay Yesudas", imageUrl: "https://i.pinimg.com/564x/bf/17/e4/bf17e48b94a74adadb435c2522c65835.jpg" },
    { title: "Vannallo Njaan", artist: "Shreya Ghoshal", imageUrl: "https://source.boomplaymusic.com/group10/M00/01/13/6ea2e5af49e6422796ee64c4d1f873c8H3000W3000_320_320.jpg" },
  ],
  tamil: [
    { title: "Vennilave", artist: "A. R. Rahman", imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8405e71577a0c337973e990be8" },
    { title: "Rowdy Baby", artist: "Dhanush", imageUrl: "https://i1.sndcdn.com/artworks-000469784211-x2oxu1-t500x500.jpg" },
    { title: "Pudhuvaial Kaetkudhu", artist: "Hariharan", imageUrl: "https://c.saavncdn.com/810/Kaaki-Sattai-Tamil-2014-500x500.jpg" },
    { title: "Thaarame Thaarame", artist: "Sid Sriram", imageUrl: "https://c.saavncdn.com/640/Kadaram-Kondan-Tamil-2019-20190717173037-500x500.jpg" },
    { title: "Surviva", artist: "Anirudh Ravichander", imageUrl: "https://cdn-images.dzcdn.net/images/cover/77733cab3a21e6b79536e1e594b28b76/1900x1900-000000-80-0-0.jpg" },
  ],
  marathi: [
    { title: "Zingaat", artist: "Ajay-Atul", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW52o4Ddkk7GBGihWEtuImks5xRbP2McEbEw&s" },
    { title: "Madhur Milan", artist: "Sandeep Kulkarni", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdYxcYGd30g6bKXm9pYjQoTiJb-sh-uuIEYw6AbtVshL6uEhl55xABnPVwKk0o6k7xLIs&usqp=CAU" },
    { title: "Kombdi Palali", artist: "Ajay-Atul", imageUrl: "https://c.saavncdn.com/155/Jatra-Marathi-2006-20181122091430-500x500.jpg" },
    { title: "Apsara Aali", artist: "Suresh Wadkar", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUrg48T-cwyMXu-5eaRFlKZU4SQWnYoDvOAg&s" },
    { title: "Nayanthara", artist: "Sonu Nigam", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSzgI4txJM7QTG3-C9Lzs8xhaVtvAPl8KeuR4SCmZcPUnuVAdEcyCGBER6JqMhTGCDDo&usqp=CAU" },
  ],
};

export default function LanguagePage() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSong, setActiveSong] = useState(null); // Track the song currently being played
  const [isIslandVisible, setIslandVisible] = useState(false); // Track visibility of the dynamic island
  const [audio, setAudio] = useState(null); // Audio element to control playback

  useEffect(() => {
    if (songsData[language]) {
      setSongs(songsData[language].slice(0, 6));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [language]);

  const handlePlay = (song) => {
    if (audio) {
      audio.pause(); // Pause the previous song if any
    }

    const newAudio = new Audio(song.audioUrl); // Create a new audio object
    newAudio.play();
    setAudio(newAudio); // Store the audio object to manage playback
    setActiveSong(song);
    setIslandVisible(true); // Show the dynamic island with song info
    newAudio.onended = () => handleCloseIsland(); // Hide island when song ends
  };

  const handleCloseIsland = () => {
    setIslandVisible(false); // Hide the dynamic island
    setActiveSong(null); // Clear active song
  };

  if (loading) {
    return (
      <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "black", color: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "center", padding: "20px", overflowY: "auto" }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
        Welcome to {language} Music
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Discover the best songs in {language}!
      </Typography>

      {/* Back Button */}
      <Button startIcon={<ArrowBackIcon />} variant="contained" onClick={() => navigate("/languages")} sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "gray" } }}>
        Back to Languages
      </Button>

      <Grid container spacing={3} justifyContent="center" sx={{ width: "90%", mt: 4 }}>
        {songs.map((song, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, delay: index * 0.1 } }}>
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.8)", color: "white", borderRadius: "16px", boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.3)", position: "relative", overflow: "hidden", height: "350px", padding: 2 }}>
                <Box component="img" src={song.imageUrl || "https://via.placeholder.com/150"} alt={song.title} sx={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: 2 }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>{song.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem", marginBottom: 2 }}>
                    {song.artist}
                  </Typography>
                  <IconButton onClick={() => handlePlay(song)} sx={{ position: "absolute", bottom: 16, right: 16, backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "gray" } }}>
                    <PlayArrowIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Dynamic Island (Song Playing Popup) */}
      {isIslandVisible && activeSong && (
        <Box
          sx={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            maxWidth: "400px",
            zIndex: 1000,
            boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.3)",
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Box component="img" src={activeSong.imageUrl} alt={activeSong.title} sx={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", marginRight: 2 }} />
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {activeSong.title} - {activeSong.artist}
          </Typography>
          <Button onClick={handleCloseIsland} sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "gray" } }}>
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
}