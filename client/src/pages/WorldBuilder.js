import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getWorld, updateWorld } from '../actions/worlds';

const WorldBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const world = useSelector((state) => state.worlds.currentWorld);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: false,
    tags: [],
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getWorld(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (world) {
      setFormData({
        name: world.name,
        description: world.description,
        isPublic: world.isPublic,
        tags: world.tags || [],
      });
    }
  }, [world]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === 'new') {
      // Handle create new world
    } else {
      dispatch(updateWorld(id, formData));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id === 'new' ? 'Create New World' : 'Edit World'}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="World Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublic}
                    onChange={handleSwitchChange}
                    name="isPublic"
                  />
                }
                label="Make this world public"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  label="Add Tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={handleAddTag}
                  disabled={!newTag}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                {id === 'new' ? 'Create World' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {id !== 'new' && (
        <Box>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="Characters" />
            <Tab label="Locations" />
            <Tab label="Items" />
            <Tab label="Timeline" />
          </Tabs>

          {tabValue === 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Characters
              </Typography>
              {/* Character list component will go here */}
            </Paper>
          )}

          {tabValue === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Locations
              </Typography>
              {/* Location list component will go here */}
            </Paper>
          )}

          {tabValue === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              {/* Item list component will go here */}
            </Paper>
          )}

          {tabValue === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Timeline
              </Typography>
              {/* Timeline component will go here */}
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

export default WorldBuilder; 