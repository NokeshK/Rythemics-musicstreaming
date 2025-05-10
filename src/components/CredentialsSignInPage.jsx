import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const handleSignIn = () => {
    if (email && password && ageRange) {
      alert("Successful Login!");
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("ageRange", ageRange);  // Store age range in localStorage
      navigate("/welcome");
    } else {
      alert("Please fill in all fields (Email, Password, Age).");
    }
  };

  return (
    <AppProvider theme={theme}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "black", width: "100%" }}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>

      {/* Sign-In Form */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            width: "350px",
          }}
        >
          <Typography variant="h5" mb={2} textAlign="center">Sign In</Typography>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Age Range Dropdown */}
            <FormControl fullWidth variant="outlined">
              <InputLabel>Age Range</InputLabel>
              <Select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                label="Age Range"
              >
                <MenuItem value="1-10">1-10</MenuItem>
                <MenuItem value="20-30">20-30</MenuItem>
                <MenuItem value="30-40">30-40</MenuItem>
                <MenuItem value="40-50">40-50</MenuItem>
                <MenuItem value="60-70">60-70</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSignIn}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Box>
    </AppProvider>
  );
}
