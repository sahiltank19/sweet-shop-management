import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, MenuItem, Link } from '@mui/material';
import students from '../services/students';

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await students.fetchProfile();
        setProfile({
          ...data,
          twelfth_year: data.twelfth_year ? data.twelfth_year.substring(0, 10) : ''
        });
      } catch (e) {
        setError(e?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleResume = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword'];
    if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Only .pdf/.doc up to 5MB allowed');
      return;
    }
    setError('');
    setResumeFile(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const form = new FormData();
      const fields = [
        'firstName','lastName','contactNumber','roll_number','course','track',
        'tenth_percentage','tenth_year','tenth_board',
        'twelfth_percentage','twelfth_year','twelfth_board',
        'ug_degree','ug_branch','ug_percentage','ug_past_backlogs','ug_active_backlogs','ug_year','ug_college','ug_university','ug_city',
        'pg_degree','pg_branch','pg_percentage','pg_year','pg_college','pg_university','pg_city'
      ];
      fields.forEach(f => {
        if (profile[f] !== undefined && profile[f] !== null) form.append(f, profile[f]);
      });
      if (resumeFile) form.append('resume', resumeFile);
      await students.updateProfile(form);
    } catch (e) {
      setError(e?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Container><Typography>Loading...</Typography></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5">Edit Profile</Typography>
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      <Box component="form" onSubmit={handleSave} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Personal Information</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="First Name" name="firstName" value={profile.firstName || ''} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name" name="lastName" value={profile.lastName || ''} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" name="email" value={profile.email || ''} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Contact Number" name="contactNumber" value={profile.contactNumber || ''} onChange={handleChange} />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Academic Information</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Roll Number" name="roll_number" value={profile.roll_number || ''} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Course" name="course" value={profile.course || ''} onChange={handleChange}>
              <MenuItem value="MSc.CS">MSc.CS</MenuItem>
              <MenuItem value="MSc.AIML">MSc.AIML</MenuItem>
              <MenuItem value="MCA">MCA</MenuItem>
            </TextField>
          </Grid>
          {profile.course === 'MSc.CS' && (
            <Grid item xs={12}>
              <TextField select fullWidth label="Track" name="track" value={profile.track || ''} onChange={handleChange}>
                <MenuItem value="Web Technologies">Web Technologies</MenuItem>
                <MenuItem value="AI & ML">AI & ML</MenuItem>
              </TextField>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Secondary (10th)</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Percentage / CGPA" name="tenth_percentage" value={profile.tenth_percentage || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth type="number" label="Year of Passing" name="tenth_year" value={profile.tenth_year || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Board" name="tenth_board" value={profile.tenth_board || ''} onChange={handleChange} /></Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Higher Secondary (12th/Diploma)</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Percentage" name="twelfth_percentage" value={profile.twelfth_percentage || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth type="date" label="Year of Passing" name="twelfth_year" value={profile.twelfth_year || ''} onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Board" name="twelfth_board" value={profile.twelfth_board || ''} onChange={handleChange} /></Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Undergraduate</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={3}><TextField fullWidth label="Degree" name="ug_degree" value={profile.ug_degree || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="Stream/Branch" name="ug_branch" value={profile.ug_branch || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="Percentage / CGPI" name="ug_percentage" value={profile.ug_percentage || ''} onChange={handleChange} /></Grid>
          <Grid item xs={6} sm={1.5}><TextField fullWidth label="Past Backlogs" name="ug_past_backlogs" value={profile.ug_past_backlogs || ''} onChange={handleChange} /></Grid>
          <Grid item xs={6} sm={1.5}><TextField fullWidth label="Active Backlogs" name="ug_active_backlogs" value={profile.ug_active_backlogs || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth type="number" label="Year of Passing" name="ug_year" value={profile.ug_year || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="College" name="ug_college" value={profile.ug_college || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="University" name="ug_university" value={profile.ug_university || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="City" name="ug_city" value={profile.ug_city || ''} onChange={handleChange} /></Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Postgraduate</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={3}><TextField fullWidth label="Degree" name="pg_degree" value={profile.pg_degree || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="Stream/Branch" name="pg_branch" value={profile.pg_branch || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth label="Percentage / CGPI" name="pg_percentage" value={profile.pg_percentage || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={3}><TextField fullWidth type="number" label="Year of Passing" name="pg_year" value={profile.pg_year || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="College" name="pg_college" value={profile.pg_college || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="University" name="pg_university" value={profile.pg_university || ''} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="pg_city" value={profile.pg_city || ''} onChange={handleChange} /></Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>Resume Upload</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={8}>
            <Button variant="outlined" component="label">
              Choose File
              <input type="file" hidden onChange={handleResume} accept=".pdf,.doc" />
            </Button>
            {resumeFile && <Typography sx={{ ml: 2, display: 'inline' }}>{resumeFile.name}</Typography>}
          </Grid>
          <Grid item xs={12} sm={4}>
            {profile.resume_path && (
              <Button variant="text" component={Link} href={profile.resume_path} target="_blank">View/Download</Button>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;

