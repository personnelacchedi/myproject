import { useState, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';
import './Profile.css'; 

const Profile = () => {
  const imageInputRef = useRef(null);

  // State variables for the user information
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('JohnDoe');
  const [password, setPassword] = useState('********');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Function to save the edited profile
  const handleSaveProfile = () => {
    // Password validation
    if (password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      alert('Please enter a strong password with at least 8 characters, including uppercase, lowercase, and numbers.');
      return;
    }

    // Username validation
    if (username.length < 4) {
      alert('Username must be at least 4 characters long.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Add your logic to save the profile changes here

    setIsEditing(false);
  };

  // Function to cancel the edit mode
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Add your logic to handle canceling the edit here
  };

  // Function to handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Perform any necessary checks on the file (e.g., size, type) here
    setProfilePicture(file);
  };

  return (
    <Box className="profile-container" >
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Header title="Profile" subtitle="welcome" />
        {isEditing ? (
          <div className="edit-buttons">
            <Button onClick={handleSaveProfile} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleCancelEdit} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditProfile} variant="contained" color="primary">
            Edit Profile
          </Button>
        )}
      </Box>

      {/* Profile Picture */}
      {isEditing ? (
        <div className="profile-picture-container">
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {profilePicture ? (
            <div className="profile-picture-preview">
              <img src={URL.createObjectURL(profilePicture)} alt="Profile Picture Preview" className="profile-picture" />
            </div>
          ) : (
            <Typography variant="body1">No picture selected</Typography>
          )}
          <Button
            onClick={() => imageInputRef.current.click()}
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            Choose Profile Picture
          </Button>
        </div>
      ) : (
        <div className="profile-picture-container">
          {profilePicture ? (
            <div className="profile-picture-preview">
              <img src={URL.createObjectURL(profilePicture)} alt="Profile Picture" className="profile-picture" />
            </div>
          ) : (
            <Typography variant="body1">No picture selected</Typography>
          )}
        </div>
      )}

      {/* Username */}
      {isEditing ? (
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      ) : (
        <Typography variant="h6" className="profile-info">
          Username: {username}
        </Typography>
      )}

      {/* Password */}
      {isEditing ? (
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      ) : (
        <Typography variant="h6" className="profile-info">
          Password: {password}
        </Typography>
      )}

      {/* Email */}
      {isEditing ? (
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      ) : (
        <Typography variant="h6" className="profile-info">
          Email: {email}
        </Typography>
      )}

      {/* Phone Number */}
      {isEditing ? (
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      ) : (
        <Typography variant="h6" className="profile-info">
          Phone Number: {phoneNumber}
        </Typography>
      )}

      {/* Add other profile fields as needed */}
    </Box>
  );
};

export default Profile;
