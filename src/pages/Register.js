import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Link,
  Grid,
  MenuItem
} from '@mui/material';
import students from '../services/students';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    rollNumber: '',
    course: '',
    track: ''
  });
  
  // Initialize errors state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    rollNumber: '',
    course: '',
    track: ''
  });
  
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
      rollNumber: '',
      course: '',
      track: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (formData.contactNumber && !/^\+?[0-9\-\s]{7,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
      valid = false;
    }

    if (!formData.course) {
      newErrors.course = 'Course is required';
      valid = false;
    }
    if (formData.course === 'MSc.CS' && !formData.track) {
      newErrors.track = 'Track is required for MSc.CS';
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    try {
      await students.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
        rollNumber: formData.rollNumber,
        course: formData.course,
        track: formData.course === 'MSc.CS' ? formData.track : ''
      });
      navigate('/login');
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography component="h1" variant="h5">
          Student Registration
        </Typography>
        
        {apiError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {apiError}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography variant="subtitle1">Personal Information</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="firstName" label="First Name" name="firstName" autoFocus value={formData.firstName} onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="lastName" label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="contactNumber" label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} error={!!errors.contactNumber} helperText={errors.contactNumber} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Academic Information</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth id="rollNumber" label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} error={!!errors.rollNumber} helperText={errors.rollNumber} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required select fullWidth id="course" label="Course" name="course" value={formData.course} onChange={handleChange} error={!!errors.course} helperText={errors.course} >
                <MenuItem value="MSc.CS">MSc.CS</MenuItem>
                <MenuItem value="MSc.AIML">MSc.AIML</MenuItem>
                <MenuItem value="MCA">MCA</MenuItem>
              </TextField>
            </Grid>
            {formData.course === 'MSc.CS' && (
              <Grid item xs={12}>
                <TextField select fullWidth id="track" label="Track" name="track" value={formData.track} onChange={handleChange} error={!!errors.track} helperText={errors.track} >
                  <MenuItem value="Web Technologies">Web Technologies</MenuItem>
                  <MenuItem value="AI & ML">AI & ML</MenuItem>
                </TextField>
              </Grid>
            )}
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;