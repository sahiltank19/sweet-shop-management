// frontend/src/components/SweetCard.js
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const SweetCard = ({ sweet, onPurchase }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {sweet.name}
        </Typography>
        <Typography color="text.secondary">
          {sweet.category}
        </Typography>
        <Typography variant="body2">
          Price: ${sweet.price.toFixed(2)}
        </Typography>
        <Typography variant="body2">
          Quantity: {sweet.quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={() => onPurchase(sweet.id)}
          disabled={sweet.quantity === 0}
        >
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
};

export default SweetCard;