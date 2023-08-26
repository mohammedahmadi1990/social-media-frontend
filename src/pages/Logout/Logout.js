import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/logout")
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('authToken');
          navigate('/login');  // Redirect to the login page after logout
        } else {
          console.error("Logout failed.");
        }
      })
      .catch(error => {
        console.error("Error during logout:", error);
      });
  }, [navigate]);

  // Display a message or a loader while the logout process is ongoing.
  return <div>Logging out...</div>;
}

export default Logout;
