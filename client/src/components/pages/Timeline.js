import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { getWorld } from '../../actions/worlds';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/events';

const TimelinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentWorld } = useSelector((state) => state.worlds);
  const { events } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: 'event',
    characters: [],
    locations: [],
    items: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getWorld(id));
      dispatch(getEvents(id));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateEvent(id, selectedEvent._id, formData));
    } else {
      dispatch(createEvent(id, formData));
    }
    resetForm();
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      type: event.type,
      characters: event.characters,
      locations: event.locations,
      items: event.items,
    });
    setEditMode(true);
  };

  const handleDelete = (eventId) => {
    setDeleteDialog({ open: true, id: eventId });
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteEvent(id, deleteDialog.id));
    setDeleteDialog({ open: false, id: '' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      type: 'event',
      characters: [],
      locations: [],
      items: [],
    });
    setEditMode(false);
    setSelectedEvent(null);
  };

  const renderEventForm = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editMode ? 'Edit Event' : 'Add New Event'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Event Type"
              >
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="birth">Birth</MenuItem>
                <MenuItem value="death">Death</MenuItem>
                <MenuItem value="battle">Battle</MenuItem>
                <MenuItem value="discovery">Discovery</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
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
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {editMode ? 'Update Event' : 'Add Event'}
              </Button>
              {editMode && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );

  const getTimelineDotColor = (type) => {
    switch (type) {
      case 'birth':
        return 'success';
      case 'death':
        return 'error';
      case 'battle':
        return 'warning';
      case 'discovery':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Timeline
      </Typography>

      {renderEventForm()}

      <Timeline>
        {events
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((event) => (
            <TimelineItem key={event._id}>
              <TimelineOppositeContent color="text.secondary">
                {new Date(event.date).toLocaleDateString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={getTimelineDotColor(event.type)} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" component="span">
                    {event.title}
                  </Typography>
                  <Typography>{event.description}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(event)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(event._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: '' })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this event? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: '' })}>
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

export default TimelinePage; 