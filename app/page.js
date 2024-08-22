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
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
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
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Choose PRO
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
