import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';// Importer le composant VerticalNavbar
import Cookies from 'js-cookie'; // Importer le package js-cookie
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  bio: string;
  // Ajoutez d'autres propriétés si nécessaire
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = Cookies.get('token');
          console.log('Token:', token); // Afficher le contenu du cookie "token" dans la console
  
          // Effectuer la requête HTTP avec le token dans l'en-tête
          const response = await axios.get('http://localhost:8080/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.status === 200 && response.data.status) {
            setUser(response.data.user);
          } else {
            // Handle error or redirect to login/signup page
          }
        } catch (error) {
          console.error(error);
          // Handle error or redirect to login/signup page
        }
      };
  
      fetchUserData();
    }, []);
  
    const handleEditProfile = () => {
      // Rediriger vers la page de modification de profil
      router.push('/users/edit');
    };
  
    if (!user) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="container-fluid d-flex">
      <div className="col-md-3 bg-light p-3">
        <Navbar />
      </div>
      <div className="col-md-9 bg-white p-3">
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Bio: {user.bio || 'N/A'}</p>
        <button className="btn btn-primary" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
      // <div>
      //   <Navbar /> {/* Inclure le composant VerticalNavbar ici */}
      //   <h1>Profile</h1>
      //   <p>Name: {user.name}</p>
      //   <p>Email: {user.email}</p>
      //   <p>Bio: {user.bio || 'N/A'}</p>
      //   <button onClick={handleEditProfile}>Edit Profile</button> {/* Bouton d'édition de profil */}
      // </div>
    );
  };

export default ProfilePage;




