import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getWorlds } from '../actions/worlds';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const worlds = useSelector((state) => state.worlds.worlds);

  useEffect(() => {
    dispatch(getWorlds());
  }, [dispatch]);

  const handleCreateWorld = () => {
    navigate('/worlds/new');
  };

  const handleEditWorld = (id) => {
    navigate(`/worlds/${id}`);
  };

  const handleDeleteWorld = (id) => {
    // Implement delete world functionality
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">Your Worlds</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateWorld}
        >
          Create New World
        </Button>
      </Box>

      <Grid container spacing={3}>
        {worlds.map((world) => (
          <Grid item key={world._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {world.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {world.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Characters: {world.characters?.length || 0}
                  </Typography>
                  <Typography variant="body2">
                    Locations: {world.locations?.length || 0}
                  </Typography>
                  <Typography variant="body2">
                    Items: {world.items?.length || 0}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleEditWorld(world._id)}
                >
                  View Details
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  size="small"
                  onClick={() => handleEditWorld(world._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteWorld(world._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 