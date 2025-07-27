// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import SweetCard from '../components/SweetCard';
import sweetsService from '../services/sweets';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

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

  const handleSearch = async () => {
    try {
      const params = {
        name: searchParams.name || undefined,
        category: searchParams.category || undefined,
        minPrice: searchParams.minPrice || undefined,
        maxPrice: searchParams.maxPrice || undefined
      };
      
      const data = await sweetsService.searchSweets(params);
      setSweets(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await sweetsService.purchaseSweet(id);
      loadSweets(); // Refresh the list
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Sweet Shop</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Name"
            fullWidth
            value={searchParams.name}
            onChange={(e) => setSearchParams({...searchParams, name: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Category"
            fullWidth
            value={searchParams.category}
            onChange={(e) => setSearchParams({...searchParams, category: e.target.value})}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <TextField
            label="Min Price"
            type="number"
            fullWidth
            value={searchParams.minPrice}
            onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <TextField
            label="Max Price"
            type="number"
            fullWidth
            value={searchParams.maxPrice}
            onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" onClick={handleSearch} fullWidth sx={{ height: '100%' }}>
            Search
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {sweets.map((sweet) => (
          <Grid item xs={12} sm={6} md={4} key={sweet.id}>
            <SweetCard 
              sweet={sweet} 
              onPurchase={handlePurchase}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;