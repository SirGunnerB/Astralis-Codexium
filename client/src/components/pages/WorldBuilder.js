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
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Sort as SortIcon,
} from '@mui/icons-material';
import { getWorld, updateWorld } from '../../actions/worlds';
import { getCharacters, deleteCharacter } from '../../actions/characters';
import { getLocations, deleteLocation } from '../../actions/locations';
import { getItems, deleteItem } from '../../actions/items';
import { getEvents } from '../../actions/events';

const ITEMS_PER_PAGE = 9;

const WorldBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentWorld } = useSelector((state) => state.worlds);
  const { characters } = useSelector((state) => state.characters);
  const { locations } = useSelector((state) => state.locations);
  const { items } = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [],
    newTag: '',
    isPublic: false,
  });

  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    type: '',
    id: '',
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getWorld(id));
      dispatch(getCharacters(id));
      dispatch(getLocations(id));
      dispatch(getItems(id));
      dispatch(getEvents(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentWorld) {
      setFormData({
        name: currentWorld.name || '',
        description: currentWorld.description || '',
        tags: currentWorld.tags || [],
        newTag: '',
        isPublic: currentWorld.isPublic || false,
      });
    }
  }, [currentWorld]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onTogglePublic = (e) => {
    setFormData({ ...formData, isPublic: e.target.checked });
  };

  const onAddTag = () => {
    if (formData.newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: '',
      });
    }
  };

  const onDeleteTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateWorld(id || 'new', formData));
    navigate('/dashboard');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const handleDeleteClick = (type, itemId) => {
    setDeleteDialog({ open: true, type, id: itemId });
  };

  const handleDeleteConfirm = () => {
    const { type, id: itemId } = deleteDialog;
    switch (type) {
      case 'character':
        dispatch(deleteCharacter(id, itemId));
        break;
      case 'location':
        dispatch(deleteLocation(id, itemId));
        break;
      case 'item':
        dispatch(deleteItem(id, itemId));
        break;
      default:
        break;
    }
    setDeleteDialog({ open: false, type: '', id: '' });
  };

  const filterAndSortEntities = (entities) => {
    if (!entities) return [];

    let filtered = entities.filter((entity) =>
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortBy]?.toLowerCase() || '';
      const bValue = b[sortBy]?.toLowerCase() || '';
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return filtered;
  };

  const getPaginatedEntities = (entities) => {
    const filtered = filterAndSortEntities(entities);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  };

  const renderEntityList = (entities, type) => {
    const filteredEntities = getPaginatedEntities(entities);
    const totalPages = Math.ceil(filterAndSortEntities(entities).length / ITEMS_PER_PAGE);

    return (
      <Box>
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="description">Description</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          {filteredEntities.map((entity) => (
            <Grid item xs={12} sm={6} md={4} key={entity._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{entity.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entity.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/${type}-builder/${id}/${entity._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDeleteClick(type, entity._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/${type}-builder/${id}`)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <AddIcon fontSize="large" />
                  <Typography variant="h6">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit World' : 'Create World'}
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
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
                  label="Add Tag"
                  value={formData.newTag}
                  onChange={(e) =>
                    setFormData({ ...formData, newTag: e.target.value })
                  }
                />
                <IconButton onClick={onAddTag} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => onDeleteTag(index)}
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
                label="Make this world public"
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
                  {id ? 'Update World' : 'Create World'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/dashboard')}
                  size="large"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {id && (
        <Box sx={{ mt: 4 }}>
          <Paper>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Characters" />
              <Tab label="Locations" />
              <Tab label="Items" />
              <Tab label="Timeline" />
            </Tabs>
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && renderEntityList(characters, 'character')}
              {activeTab === 1 && renderEntityList(locations, 'location')}
              {activeTab === 2 && renderEntityList(items, 'item')}
              {activeTab === 3 && <TimelinePage />}
            </Box>
          </Paper>
        </Box>
      )}

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, type: '', id: '' })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {deleteDialog.type}? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, type: '', id: '' })}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorldBuilder; 