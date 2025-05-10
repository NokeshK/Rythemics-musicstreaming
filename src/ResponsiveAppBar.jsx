import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("isSignedIn") === "true");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("isSignedIn", isSignedIn);
  }, [isSignedIn]);

  const handleNavigate = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("isSignedIn");
    navigate("/");
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    const routes = {
      premium: "/premium",
      download: "/download",
      support: "/support",
      languages: "/languages",
      payment: "/payment",
    };

    if (routes[query]) {
      navigate(routes[query]);
    } else if (query !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black", width: "100%" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* App Name */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            RYTHEMICS
          </Typography>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search songs..."
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "350px",
              "& .MuiOutlinedInput-root": {
                paddingRight: "5px",
              },
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Navigation & Profile Section */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {isSignedIn ? (
              <>
                <Button onClick={() => handleNavigate("download")} sx={{ color: "white" }}>Download</Button>
                <Button onClick={() => handleNavigate("support")} sx={{ color: "white" }}>Support</Button>
                <Button onClick={() => handleNavigate("languages")} sx={{ color: "white" }}>Languages</Button>
                <Button onClick={() => handleNavigate("payment")} sx={{ color: "white" }}>Payment</Button> {/* Added Payment Button */}
                <Button onClick={() => handleNavigate("premium")} sx={{ color: "white" }}>Premium</Button> {/* Added Premium Button */}
                <Button onClick={handleSignOut} sx={{ color: "white" }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleNavigate("premium")} sx={{ color: "white" }}>Premium</Button>
                <Button onClick={() => handleNavigate("support")} sx={{ color: "white" }}>Support</Button>
                <Button onClick={() => handleNavigate("download")} sx={{ color: "white" }}>Download</Button>
                <Button onClick={() => handleNavigate("languages")} sx={{ color: "white" }}>Languages</Button>
                <Tooltip title="Sign In">
                  <IconButton onClick={() => navigate("/signin")} sx={{ p: 0 }}>
                    <Avatar alt="Sign In" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
