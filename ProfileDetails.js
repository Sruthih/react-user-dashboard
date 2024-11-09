import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProfileDetails() {
  const { username } = useParams(); // Get the username from the URL
  const [profile, setProfile] = useState(null);

  // Fetch the profile details using the username
  useEffect(() => {
    axios.get(`https://randomuser.me/api?results=5`)
      .then(response => {
        const profileData = response.data.results.find(
          (user) => user.login.username === username
        );
        setProfile(profileData); // Store the profile data in the state
      })
      .catch(error => {
        console.error("Error fetching profile data", error);
      });
  }, [username]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="text-center">Profile Details</h1>
      <div className="card">
        <img src={profile.picture.large} className="card-img-top" alt={profile.name.first} />
        <div className="card-body">
          <h5 className="card-title">{profile.name.first} {profile.name.last}</h5>
          <p className="card-text">Email: {profile.email}</p>
          <p className="card-text">Phone: {profile.phone}</p>
          <p className="card-text">Location: {profile.location.city}, {profile.location.country}</p>
          <a href={`mailto:${profile.email}`} className="btn btn-primary">Send Email</a>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
