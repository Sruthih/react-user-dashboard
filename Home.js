import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [profiles, setProfiles] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    axios.get('https://randomuser.me/api?results=5')
      .then(response => {
        setProfiles(response.data.results); // Save the fetched data in state
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">User Profiles</h1>
      <div className="row">
        {profiles.map((profile, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <img src={profile.picture.large} className="card-img-top" alt={profile.name.first} />
              <div className="card-body">
                <h5 className="card-title">{profile.name.first} {profile.name.last}</h5>
                <p className="card-text">Email: {profile.email}</p>
                <Link to={`/profile/${profile.login.username}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
