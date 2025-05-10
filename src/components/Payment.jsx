import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Button, Modal, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PayPalIcon from "@mui/icons-material/Payment";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Android";

export default function PaymentPage() {
  // Available payment methods
  const paymentMethods = [
    { label: "Credit Card", icon: <CreditCardIcon fontSize="large" />, color: "#3f51b5" },
    { label: "PayPal", icon: <PayPalIcon fontSize="large" />, color: "#009cde" },
    { label: "Apple Pay", icon: <AppleIcon fontSize="large" />, color: "#000" },
    { label: "Google Pay", icon: <GoogleIcon fontSize="large" />, color: "#4285F4" },
  ];

  // Available plans (Individual, Duo, Family, Student)
  const plans = [
    { label: "Individual Plan", price: "$10", description: "Access for one person" },
    { label: "Duo Plan", price: "$20", description: "Access for two people" },
    { label: "Family Plan", price: "$30", description: "Access for up to five people" },
    { label: "Student Plan", price: "$7", description: "Discounted access for students" },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [showScanner, setShowScanner] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setDialogOpen(true);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleFormSubmit = async () => {
    if (!selectedPlan) {
      alert("Please select a plan");
      return;
    }

    // Show scanner image
    setShowScanner(true);

    // Simulate payment processing delay
    setTimeout(async () => {
      // Prepare payment data
      const paymentData = {
        name: userDetails.name,
        email: userDetails.email,
        paymentMethod: selectedPaymentMethod.label,
        plan: selectedPlan.label,
        price: selectedPlan.price,
      };

      try {
        // Simulate sending data to the backend (replace with actual server request)
        const response = await fetch("http://localhost:5000/submit-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (response.ok) {
          setTransactionId(result.transactionId); // Get transaction ID from response
          setPaymentSuccess(true);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        alert("Error submitting payment data.");
      }
      
      setShowScanner(false);
    }, 2000); // 2 seconds delay to simulate payment processing
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",  // Set background color to black
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, color: "white" }}> {/* Change text color to white */}
        Choose a Payment Method
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {paymentMethods.map((method, index) => (
          <Grid item key={index}>
            <Paper
              elevation={3}
              sx={{
                width: 160,
                height: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: method.color,
                color: "white",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handlePaymentMethodSelect(method)}
            >
              {method.icon}
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {method.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for selecting plan and entering user details */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Enter Your Details and Choose a Plan</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Select a Plan
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {plans.map((plan, index) => (
              <Grid item key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    backgroundColor: "#e0e0e0",
                    cursor: "pointer",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#bdbdbd",
                    },
                  }}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <Typography variant="h6">{plan.label}</Typography>
                  <Typography variant="body2">{plan.description}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {plan.price}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show scanner image while processing */}
      {showScanner && (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <img src="https://example.com/scanner.gif" alt="Scanner" width="200" />
          <Typography variant="h6" sx={{ marginTop: 2, color: "white" }}>
            Processing your payment...
          </Typography>
        </Box>
      )}

      {/* Modal for displaying payment success */}
      {paymentSuccess && (
        <Modal
          open={paymentSuccess}
          onClose={() => {}}
          aria-labelledby="payment-modal-title"
          aria-describedby="payment-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
              textAlign: "center",
              width: 400,
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Payment Success
            </Typography>
            <Typography variant="body1">
              Your payment of {selectedPlan?.price} has been successfully processed using {selectedPaymentMethod?.label}.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Transaction ID: {transactionId}
            </Typography>
            <Button
              sx={{ marginTop: 3 }}
              variant="contained"
              color="primary"
              onClick={() => setPaymentSuccess(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
