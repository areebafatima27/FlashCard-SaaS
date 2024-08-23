"use client";
import getStripe from "@/utils/get-stripe";
import "./globals.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    try {
      // Make the API call to create a checkout session
      const checkoutSession = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          origin: "http://localhost:3002/",
        },
      });

      // Check if the response is OK (status in the range 200-299)
      if (!checkoutSession.ok) {
        const errorMessage = await checkoutSession.text(); // Get the error message
        console.error(`Error creating checkout session: ${errorMessage}`);
        return;
      }

      // Check if the response has content to parse
      const textResponse = await checkoutSession.text();
      if (!textResponse) {
        console.error("Empty response received from server.");
        return;
      }

      // Parse the response JSON
      let checkoutSessionJson;
      try {
        checkoutSessionJson = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        return;
      }

      // Get the Stripe instance
      const stripe = await getStripe();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      // Handle any error from the redirect
      if (error) {
        console.warn(`Stripe redirect error: ${error.message}`);
      }
    } catch (error) {
      // Catch and handle any errors during the fetch or Stripe operations
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Container maxWidth="lg" className="container">
      <Head>
        <title>FlashCard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      <AppBar position="static" className="appbar">
        <Toolbar variant="dense" className="toolbar">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            FlashCard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "center",
          my: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom>
          {""}
          The easiest way to make flashcards from our text.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4">Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              {" "}
              Simply input your text and let our software do the rest. Creating
              Flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              {" "}
              Our AI intelligently breaks down your text into concise
              flashcards, perfect for studying
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              {" "}
              Access your flashcards from any device, at any time, Study on the
              go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        {" "}
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>{" "}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h5" gutterBottom>
                $5 per month
              </Typography>
              <Typography gutterBottom>
                {" "}
                Access to Basic flashcard feature and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>
                PRO
              </Typography>
              <Typography variant="h5" gutterBottom>
                $10 per month
              </Typography>
              <Typography gutterBottom>
                {" "}
                Get your Pro version now with unlimited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Choose PRO
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
