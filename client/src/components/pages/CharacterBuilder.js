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
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getCharacter, updateCharacter } from '../../actions/characters';

const CharacterBuilder = () => {
  const { worldId, characterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCharacter } = useSelector((state) => state.characters);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    race: '',
    class: '',
    level: 1,
    alignment: '',
    background: '',
    traits: [],
    newTrait: '',
    isPublic: false,
  });

  useEffect(() => {
    if (characterId) {
      dispatch(getCharacter(worldId, characterId));
    }
  }, [dispatch, worldId, characterId]);

  useEffect(() => {
    if (currentCharacter) {
      setFormData({
        name: currentCharacter.name || '',
        description: currentCharacter.description || '',
        race: currentCharacter.race || '',
        class: currentCharacter.class || '',
        level: currentCharacter.level || 1,
        alignment: currentCharacter.alignment || '',
        background: currentCharacter.background || '',
        traits: currentCharacter.traits || [],
        newTrait: '',
        isPublic: currentCharacter.isPublic || false,
      });
    }
  }, [currentCharacter]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onTogglePublic = (e) => {
    setFormData({ ...formData, isPublic: e.target.checked });
  };

  const onAddTrait = () => {
    if (formData.newTrait.trim()) {
      setFormData({
        ...formData,
        traits: [...formData.traits, formData.newTrait.trim()],
        newTrait: '',
      });
    }
  };

  const onDeleteTrait = (index) => {
    setFormData({
      ...formData,
      traits: formData.traits.filter((_, i) => i !== index),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCharacter(worldId, characterId || 'new', formData));
    navigate(`/world-builder/${worldId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {characterId ? 'Edit Character' : 'Create Character'}
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
                label="Race"
                name="race"
                value={formData.race}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class"
                name="class"
                value={formData.class}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Level"
                name="level"
                type="number"
                value={formData.level}
                onChange={onChange}
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Alignment"
                name="alignment"
                value={formData.alignment}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Background"
                name="background"
                value={formData.background}
                onChange={onChange}
                multiline
                rows={3}
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
                  label="Add Trait"
                  value={formData.newTrait}
                  onChange={(e) =>
                    setFormData({ ...formData, newTrait: e.target.value })
                  }
                />
                <IconButton onClick={onAddTrait} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.traits.map((trait, index) => (
                  <Chip
                    key={index}
                    label={trait}
                    onDelete={() => onDeleteTrait(index)}
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
                label="Make this character public"
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
                  {characterId ? 'Update Character' : 'Create Character'}
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

export default CharacterBuilder; 