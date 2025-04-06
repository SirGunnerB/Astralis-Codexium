import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import WorldBuilder from './components/pages/WorldBuilder';
import CharacterBuilder from './pages/CharacterBuilder';
import LocationBuilder from './pages/LocationBuilder';
import ItemBuilder from './pages/ItemBuilder';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/world-builder"
            element={
              <PrivateRoute>
                <WorldBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/world-builder/:id"
            element={
              <PrivateRoute>
                <WorldBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/characters/:id"
            element={
              <PrivateRoute>
                <CharacterBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/locations/:id"
            element={
              <PrivateRoute>
                <LocationBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <PrivateRoute>
                <ItemBuilder />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App; 