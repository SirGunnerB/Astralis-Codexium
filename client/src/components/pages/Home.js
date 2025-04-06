import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              Astralis Codex
            </Typography>
            <Typography variant="h5" gutterBottom>
              Build your world, craft your story
            </Typography>
            <Typography variant="body1" paragraph>
              Create and manage your fantasy worlds, characters, locations, and items
              in one place. Bring your stories to life with our powerful
              world-building tools.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/register"
                sx={{ mr: 2 }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <ul>
                <li>Create and manage multiple worlds</li>
                <li>Design detailed characters and locations</li>
                <li>Track items and their properties</li>
                <li>Build interactive timelines</li>
                <li>Share your worlds with others</li>
                <li>Export your content</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 