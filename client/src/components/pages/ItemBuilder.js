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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getItem, updateItem } from '../../actions/items';

const ItemBuilder = () => {
  const { worldId, itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentItem } = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    rarity: 'common',
    value: 0,
    weight: 0,
    properties: [],
    newProperty: '',
    isPublic: false,
  });

  useEffect(() => {
    if (itemId) {
      dispatch(getItem(worldId, itemId));
    }
  }, [dispatch, worldId, itemId]);

  useEffect(() => {
    if (currentItem) {
      setFormData({
        name: currentItem.name || '',
        description: currentItem.description || '',
        type: currentItem.type || '',
        rarity: currentItem.rarity || 'common',
        value: currentItem.value || 0,
        weight: currentItem.weight || 0,
        properties: currentItem.properties || [],
        newProperty: '',
        isPublic: currentItem.isPublic || false,
      });
    }
  }, [currentItem]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onTogglePublic = (e) => {
    setFormData({ ...formData, isPublic: e.target.checked });
  };

  const onAddProperty = () => {
    if (formData.newProperty.trim()) {
      setFormData({
        ...formData,
        properties: [...formData.properties, formData.newProperty.trim()],
        newProperty: '',
      });
    }
  };

  const onDeleteProperty = (index) => {
    setFormData({
      ...formData,
      properties: formData.properties.filter((_, i) => i !== index),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem(worldId, itemId || 'new', formData));
    navigate(`/world-builder/${worldId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {itemId ? 'Edit Item' : 'Create Item'}
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
              <FormControl fullWidth>
                <InputLabel>Rarity</InputLabel>
                <Select
                  name="rarity"
                  value={formData.rarity}
                  onChange={onChange}
                  label="Rarity"
                >
                  <MenuItem value="common">Common</MenuItem>
                  <MenuItem value="uncommon">Uncommon</MenuItem>
                  <MenuItem value="rare">Rare</MenuItem>
                  <MenuItem value="very-rare">Very Rare</MenuItem>
                  <MenuItem value="legendary">Legendary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Value (in gold)"
                name="value"
                type="number"
                value={formData.value}
                onChange={onChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (in pounds)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={onChange}
                inputProps={{ min: 0, step: 0.1 }}
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
                  label="Add Property"
                  value={formData.newProperty}
                  onChange={(e) =>
                    setFormData({ ...formData, newProperty: e.target.value })
                  }
                />
                <IconButton onClick={onAddProperty} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.properties.map((property, index) => (
                  <Chip
                    key={index}
                    label={property}
                    onDelete={() => onDeleteProperty(index)}
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
                label="Make this item public"
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
                  {itemId ? 'Update Item' : 'Create Item'}
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

export default ItemBuilder; 