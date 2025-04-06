import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getLocation, updateLocation } from '../../actions/locations';

const LocationBuilder = () => {
  const { worldId, locationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentLocation } = useSelector((state) => state.locations);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    climate: '',
    terrain: '',
    population: '',
    notableFeatures: [],
    newFeature: '',
    isPublic: false,
  });

  useEffect(() => {
    if (locationId) {
      dispatch(getLocation(worldId, locationId));
    }
  }, [dispatch, worldId, locationId]);

  useEffect(() => {
    if (currentLocation) {
      setFormData({
        name: currentLocation.name || '',
        description: currentLocation.description || '',
        type: currentLocation.type || '',
        climate: currentLocation.climate || '',
        terrain: currentLocation.terrain || '',
        population: currentLocation.population || '',
        notableFeatures: currentLocation.notableFeatures || [],
        newFeature: '',
        isPublic: currentLocation.isPublic || false,
      });
    }
  }, [currentLocation]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onTogglePublic = (e) => {
    setFormData({ ...formData, isPublic: e.target.checked });
  };

  const onAddFeature = () => {
    if (formData.newFeature.trim()) {
      setFormData({
        ...formData,
        notableFeatures: [...formData.notableFeatures, formData.newFeature.trim()],
        newFeature: '',
      });
    }
  };

  const onDeleteFeature = (index) => {
    setFormData({
      ...formData,
      notableFeatures: formData.notableFeatures.filter((_, i) => i !== index),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLocation(worldId, locationId || 'new', formData));
    navigate(`/world-builder/${worldId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {locationId ? 'Edit Location' : 'Create Location'}
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={formData.type}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Climate"
                name="climate"
                value={formData.climate}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Terrain"
                name="terrain"
                value={formData.terrain}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Population"
                name="population"
                value={formData.population}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={onChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  label="Add Notable Feature"
                  value={formData.newFeature}
                  onChange={(e) =>
                    setFormData({ ...formData, newFeature: e.target.value })
                  }
                />
                <IconButton onClick={onAddFeature} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.notableFeatures.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => onDeleteFeature(index)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublic}
                    onChange={onTogglePublic}
                    name="isPublic"
                  />
                }
                label="Make this location public"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  {locationId ? 'Update Location' : 'Create Location'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate(`/world-builder/${worldId}`)}
                  size="large"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LocationBuilder; 