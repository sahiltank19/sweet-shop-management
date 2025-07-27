// frontend/src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import SweetForm from '../components/SweetForm';
import SweetCard from '../components/SweetCard';
import sweetsService from '../services/sweets';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      const data = await sweetsService.getAllSweets();
      setSweets(data);
    } catch (error) {
      console.error('Failed to load sweets:', error);
    }
  };

  const handleAddSweet = () => {
    setCurrentSweet(null);
    setOpenForm(true);
  };

  const handleEditSweet = (sweet) => {
    setCurrentSweet(sweet);
    setOpenForm(true);
  };

  const handleDeleteSweet = async (id) => {
    try {
      await sweetsService.deleteSweet(id);
      loadSweets();
    } catch (error) {
      console.error('Failed to delete sweet:', error);
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await sweetsService.restockSweet(id, quantity);
      loadSweets();
    } catch (error) {
      console.error('Failed to restock:', error);
    }
  };

  const handleSubmit = async (sweetData) => {
    try {
      if (currentSweet) {
        await sweetsService.updateSweet(currentSweet.id, sweetData);
      } else {
        await sweetsService.createSweet(sweetData);
      }
      setOpenForm(false);
      loadSweets();
    } catch (error) {
      console.error('Failed to save sweet:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      <Button variant="contained" onClick={handleAddSweet} sx={{ mb: 3 }}>
        Add New Sweet
      </Button>
      
      <Grid container spacing={3}>
        {sweets.map((sweet) => (
          <Grid item xs={12} sm={6} md={4} key={sweet.id}>
            <SweetCard 
              sweet={sweet} 
              onEdit={() => handleEditSweet(sweet)}
              onDelete={() => handleDeleteSweet(sweet.id)}
              onRestock={(quantity) => handleRestock(sweet.id, quantity)}
              isAdmin
            />
          </Grid>
        ))}
      </Grid>
      
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{currentSweet ? 'Edit Sweet' : 'Add New Sweet'}</DialogTitle>
        <DialogContent>
          <SweetForm 
            sweet={currentSweet} 
            onSubmit={handleSubmit} 
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;