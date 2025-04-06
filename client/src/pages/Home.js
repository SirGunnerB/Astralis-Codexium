import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  AutoStories,
  Group,
  LocationOn,
  Category,
} from '@mui/icons-material';

const features = [
  {
    title: 'World Building',
    description: 'Create and manage your fantasy worlds with rich details and history.',
    icon: <AutoStories fontSize="large" />,
  },
  {
    title: 'Character Creation',
    description: 'Design complex characters with detailed backgrounds and relationships.',
    icon: <Group fontSize="large" />,
  },
  {
    title: 'Location Mapping',
    description: 'Map out locations and create immersive environments for your stories.',
    icon: <LocationOn fontSize="large" />,
  },
  {
    title: 'Item Management',
    description: 'Track important items, artifacts, and their significance in your world.',
    icon: <Category fontSize="large" />,
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to LoreForge
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Build your fantasy worlds, create compelling characters, and weave intricate stories
            with our comprehensive world-building platform.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/login"
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    {feature.title}
                  </Typography>
                  <Typography align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 