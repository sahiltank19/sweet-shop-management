import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import studentsApi from '../services/students';

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',

    rollNumber: '',
    course: '',
    track: '',

    tenthPercentage: '',
    tenthYear: '',
    tenthBoard: '',

    twelfthPercentage: '',
    twelfthYear: '',
    twelfthBoard: '',

    ugDegree: '',
    ugBranch: '',
    ugPercentage: '',
    ugPastBacklogs: '',
    ugActiveBacklogs: '',
    ugYear: '',
    ugCollege: '',
    ugUniversity: '',
    ugCity: '',

    pgDegree: '',
    pgBranch: '',
    pgPercentage: '',
    pgYear: '',
    pgCollege: '',
    pgUniversity: '',
    pgCity: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumePath, setResumePath] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { user, student } = await studentsApi.getProfile();
        setFormData((prev) => ({
          ...prev,
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          contactNumber: user?.contactNumber || '',
          rollNumber: student?.rollNumber || '',
          course: student?.course || '',
          track: student?.track || '',
          tenthPercentage: student?.tenthPercentage || '',
          tenthYear: student?.tenthYear || '',
          tenthBoard: student?.tenthBoard || '',
          twelfthPercentage: student?.twelfthPercentage || '',
          twelfthYear: student?.twelfthYear ? student.twelfthYear.substring(0,10) : '',
          twelfthBoard: student?.twelfthBoard || '',
          ugDegree: student?.ugDegree || '',
          ugBranch: student?.ugBranch || '',
          ugPercentage: student?.ugPercentage || '',
          ugPastBacklogs: student?.ugPastBacklogs || '',
          ugActiveBacklogs: student?.ugActiveBacklogs || '',
          ugYear: student?.ugYear || '',
          ugCollege: student?.ugCollege || '',
          ugUniversity: student?.ugUniversity || '',
          ugCity: student?.ugCity || '',
          pgDegree: student?.pgDegree || '',
          pgBranch: student?.pgBranch || '',
          pgPercentage: student?.pgPercentage || '',
          pgYear: student?.pgYear || '',
          pgCollege: student?.pgCollege || '',
          pgUniversity: student?.pgUniversity || '',
          pgCity: student?.pgCity || ''
        }));
        setResumePath(student?.resumePath || '');
      } catch (e) {
        setApiError(e?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setResumeFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccess('');

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== '' && v !== null && v !== undefined) {
          fd.append(k, v);
        }
      });
      if (resumeFile) {
        fd.append('resume', resumeFile);
      }
      await studentsApi.updateProfile(fd);
      setSuccess('Profile updated successfully');
    } catch (e) {
      setApiError(e?.error || 'Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Edit Profile</Typography>
        {apiError && <Typography color="error" sx={{ mt: 2 }}>{apiError}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>Personal Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Academic Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="course-label">Course</InputLabel>
                <Select labelId="course-label" label="Course" name="course" value={formData.course} onChange={handleChange}>
                  <MenuItem value="MSc.CS">MSc.CS</MenuItem>
                  <MenuItem value="MSc.AIML">MSc.AIML</MenuItem>
                  <MenuItem value="MCA">MCA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.course === 'MSc.CS' && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="track-label">Track</InputLabel>
                  <Select labelId="track-label" label="Track" name="track" value={formData.track} onChange={handleChange}>
                    <MenuItem value="Web Technologies">Web Technologies</MenuItem>
                    <MenuItem value="AI & ML">AI & ML</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Secondary (10th)</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Percentage / CGPA" name="tenthPercentage" value={formData.tenthPercentage} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Year of Passing" name="tenthYear" value={formData.tenthYear} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Board" name="tenthBoard" value={formData.tenthBoard} onChange={handleChange} />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Higher Secondary (12th/Diploma)</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Percentage" name="twelfthPercentage" value={formData.twelfthPercentage} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} label="Year of Passing" name="twelfthYear" value={formData.twelfthYear} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Board" name="twelfthBoard" value={formData.twelfthBoard} onChange={handleChange} />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Undergraduate</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Degree" name="ugDegree" value={formData.ugDegree} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Stream/Branch" name="ugBranch" value={formData.ugBranch} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Percentage / CGPI" name="ugPercentage" value={formData.ugPercentage} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Past Backlogs" name="ugPastBacklogs" value={formData.ugPastBacklogs} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Active Backlogs" name="ugActiveBacklogs" value={formData.ugActiveBacklogs} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Year of Passing" name="ugYear" value={formData.ugYear} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="College Name" name="ugCollege" value={formData.ugCollege} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="University" name="ugUniversity" value={formData.ugUniversity} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="City" name="ugCity" value={formData.ugCity} onChange={handleChange} />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Postgraduate</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Degree" name="pgDegree" value={formData.pgDegree} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Stream/Branch" name="pgBranch" value={formData.pgBranch} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Percentage / CGPI" name="pgPercentage" value={formData.pgPercentage} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Year of Passing" name="pgYear" value={formData.pgYear} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="College Name" name="pgCollege" value={formData.pgCollege} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="University" name="pgUniversity" value={formData.pgUniversity} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="City" name="pgCity" value={formData.pgCity} onChange={handleChange} />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 3 }}>Resume Upload</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Button variant="outlined" component="label">
                Choose File
                <input hidden accept=".pdf,.doc,.docx" type="file" onChange={handleFileChange} />
              </Button>
              {resumeFile && <span style={{ marginLeft: 8 }}>{resumeFile.name}</span>}
            </Grid>
            {resumePath && (
              <Grid item xs={12} sm={4}>
                <Button href={resumePath} target="_blank" rel="noopener" variant="contained">View / Download</Button>
              </Grid>
            )}
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 4 }}>Save</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;