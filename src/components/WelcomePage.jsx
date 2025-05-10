import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Delete,
  Edit,
  AddCircleOutline,
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function WelcomePage() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [currentSongHighlighted, setCurrentSongHighlighted] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // State for play/pause
  const [songs, setSongs] = useState([
    { id: 1, title: "Bujji Thalli", artist: "D.S.P", image: "/src/assets/bujjietallie.jpg", audio: "https://mp3teluguwap.net/mp3/2024/Thandel/Thandel%20-%20HQ/Bujji%20Thalli.mp3" },
    { id: 2, title: "Degarina Kodi", artist: "Akanksha", image: "/src/assets/DEGARINA.jpEg", audio: "/src/assets/audio/song2.mp3" },
    { id: 3, title: "Nuvuntey", artist: "Teenu", image: "/src/assets/nuvuuntey.jpg", audio: "/src/assets/audio/song3.mp3" },
    { id: 4, title: "Oo Antava", artist: "Indravathi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2qYj1xnhEwqS-HdTW9ovT65Zom4v3QvemA&s", audio: "/src/assets/audio/song4.mp3" },
    { id: 5, title: "Samajavaragamana", artist: "Sid Sriram", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8SObCBJaqhAtinKx-Ibm0RdcXWJA_mGxvg&s", audio: "/src/assets/audio/song5.mp3" },
    { id: 6, title: "Butta Bomma", artist: "Armaan Malik", image: "https://upload.wikimedia.org/wikipedia/en/5/51/Butta_Bomma.jpg", audio: "/src/assets/audio/song6.mp3" },
    { id: 7, title: "Vikram Title Track", artist: "Anirudh", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmzN47J0AOGYaQGlcqOorzfya0LibSvX51cw&s", audio: "/src/assets/audio/song7.mp3" },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState({ id: null, title: "", artist: "", image: "" });

  const playlists = [
    { name: "Top Hits", image: "/src/assets/tophits.webp" },
    { name: "Chill Vibes", image: "/src/assets/chillvibes.jpeg" },
    { name: "Workout Mix", image: "/src/assets/workoutmix.jpeg" },
  ];

  const libraryItems = [
    "Discover New Music",
    "Top Music",
    "Albums",
    "Spotlight",
    "Genres",
    "Playlists",
    "Stations",
    "Earn Points",
  ];

  const toggleLike = (song) => {
    const isLiked = likedSongs.some((s) => s.id === song.id);
    setLikedSongs((prev) =>
      isLiked ? prev.filter((s) => s.id !== song.id) : [...prev, song]
    );
  };

  const openAddDialog = () => {
    setCurrentSong({ id: null, title: "", artist: "", image: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (song) => {
    setCurrentSong(song);
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleDialogSave = () => {
    if (!currentSong.title || !currentSong.artist || !currentSong.image) return;

    if (currentSong.id) {
      setSongs((prev) =>
        prev.map((s) => (s.id === currentSong.id ? currentSong : s))
      );
    } else {
      const newSong = {
        ...currentSong,
        id: Math.max(0, ...songs.map((s) => s.id)) + 1,
      };
      setSongs((prev) => [...prev, newSong]);
    }

    setDialogOpen(false);
  };

  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((s) => s.id !== id));
    setLikedSongs((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSongClick = (song) => {
    setCurrentSongHighlighted(song);
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSkipNext = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSongHighlighted.id
    );
    if (currentIndex < songs.length - 1) {
      setCurrentSongHighlighted(songs[currentIndex + 1]);
    }
  };

  const handleSkipPrevious = () => {
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSongHighlighted.id
    );
    if (currentIndex > 0) {
      setCurrentSongHighlighted(songs[currentIndex - 1]);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#fff",
        paddingTop: "70px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", height: "calc(100vh - 70px)" }}>
        {/* Left Panel */}
        <Box sx={{ flex: 3, p: 4, overflowY: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5">Recently Played</Typography>
            <Button
              startIcon={<AddCircleOutline />}
              variant="outlined"
              onClick={openAddDialog}
              sx={{ color: "#1db954", borderColor: "#1db954" }}
            >
              Add Song
            </Button>
          </Box>
          <Grid container spacing={3}>
            {songs.map((song) => {
              const isLiked = likedSongs.some((s) => s.id === song.id);
              return (
                <Grid item xs={12} sm={6} md={4} key={song.id}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Box
                      sx={{
                        backgroundColor: "#181818",
                        borderRadius: 2,
                        p: 2,
                        position: "relative",
                      }}
                      onClick={() => handleSongClick(song)}
                    >
                      <img
                        src={song.image}
                        alt={song.title}
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                      <Typography sx={{ mt: 1, fontWeight: 600 }}>
                        {song.title}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {song.artist}
                      </Typography>
                      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                        <IconButton
                          onClick={() => toggleLike(song)}
                          sx={{ color: isLiked ? "#1db954" : "#aaa" }}
                        >
                          {isLiked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <IconButton
                          onClick={() => openEditDialog(song)}
                          sx={{ color: "#fff" }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteSong(song.id)}
                          sx={{ color: "#ff4c4c" }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>

          {/* Made for You Section */}
          <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
            Made for You
          </Typography>
          <Grid container spacing={3}>
            {playlists.map((playlist, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Box
                    sx={{ backgroundColor: "#181818", borderRadius: 2, p: 2 }}
                  >
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        height: 200,
                        objectFit: "cover",
                      }}
                    />
                    <Typography sx={{ mt: 1, fontWeight: 600 }}>
                      {playlist.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Right Panel with Scroll */}
        <Box
          sx={{
            flex: 1.2,
            borderLeft: "1px solid #333",
            backgroundColor: "#000",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Your Library
          </Typography>
          <List>
            <ListItem
              sx={{ mb: 1, cursor: "pointer" }}
              onClick={() => setShowLiked(!showLiked)}
            >
              <Avatar sx={{ mr: 2, backgroundColor: "#1db954" }}>💜</Avatar>
              <ListItemText
                primary="Liked Songs"
                secondary={`Playlist • ${likedSongs.length} song${likedSongs.length !== 1 ? "s" : ""}`}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>

            {showLiked &&
              likedSongs.map((song) => (
                <ListItem key={song.id} sx={{ ml: 4 }}>
                  <Avatar
                    src={song.image}
                    alt={song.title}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <ListItemText primary={song.title} secondary={song.artist} />
                </ListItem>
              ))}

            {libraryItems.map((item, idx) => (
              <ListItem key={idx} sx={{ mb: 1, cursor: "pointer" }}>
                <Avatar sx={{ mr: 2, backgroundColor: "#1db954" }}>
                  {item.charAt(0)}
                </Avatar>
                <ListItemText
                  primary={item}
                  secondary="Library"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Dynamic Highlighted Song Section at the Bottom */}
      {currentSongHighlighted && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#181818",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={currentSongHighlighted.image}
              alt={currentSongHighlighted.title}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                objectFit: "cover",
                marginRight: 15,
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {currentSongHighlighted.title}
              </Typography>
              <Typography variant="body2" color="gray">
                {currentSongHighlighted.artist}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleSkipPrevious}
              sx={{ color: "#fff" }}
            >
              <SkipPrevious />
            </IconButton>
            <IconButton
              onClick={handlePlayPause}
              sx={{ color: "#fff", margin: "0 15px" }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleSkipNext}
              sx={{ color: "#fff" }}
            >
              <SkipNext />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{currentSong.id ? "Edit Song" : "Add Song"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={currentSong.title}
            onChange={(e) =>
              setCurrentSong({ ...currentSong, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Artist"
            fullWidth
            value={currentSong.artist}
            onChange={(e) =>
              setCurrentSong({ ...currentSong, artist: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={currentSong.image}
            onChange={(e) =>
              setCurrentSong({ ...currentSong, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
