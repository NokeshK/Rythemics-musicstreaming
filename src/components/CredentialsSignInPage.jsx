import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Box, CssBaseline } from "@mui/material";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const signIn = async (provider, formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert("Successful Login!");
        resolve();
        navigate("/welcome"); // Redirect to Welcome Page
      }, 300);
    });
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

      {/* Centered Sign-In Box */}
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
        <Box sx={{ padding: "30px", borderRadius: "8px" }}>
          <SignInPage signIn={signIn} providers={providers} slotProps={{ emailField: { autoFocus: false } }} />
        </Box>
      </Box>
    </AppProvider>
  );
}
