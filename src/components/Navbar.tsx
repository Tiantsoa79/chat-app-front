import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import ChannelsPage from '@/pages/channels';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const router = useRouter();
  const [showChannels, setShowChannels] = useState(false);

  const handleLoginClick = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/users/profile');
    } else {
      router.push('/users/login');
    }
  };

  const handleProfileClick = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/users/profile');
    } else {
      router.push('/users/login');
    }
  };

  const handleLogout = () => {
    // Supprimer le cookie "token"
    Cookies.remove('token');

    // Rediriger vers la page de connexion
    router.push('/users/login');
  };

  const handleToggleChannels = () => {
    const token = Cookies.get('token');
    
    if (token) {
      setShowChannels(!showChannels);
    } else {
      router.push('/users/login');
    }
        
  };
    
  const handleCreateChannel = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/channels/create');
    } else {
      router.push('/users/login');
    }
        
  };
  return (
    <div className="vertical-navbar bg-light p-3 d-flex flex-column justify-content-start align-items-start">
    <button onClick={handleLoginClick} className="btn btn-primary mb-3">Login</button>
    <button onClick={handleProfileClick} className="btn btn-primary mb-3">Profile</button>
    <button onClick={handleToggleChannels} className="btn btn-primary mb-3">
      {showChannels ? 'Hide Channels' : 'Show Channels'}
    </button>
    {showChannels && <ChannelsPage /> }
    {<button onClick={handleCreateChannel}>create channel</button>}
    <button onClick={handleLogout} className="btn btn-primary">Déconnexion</button> {/* Bouton de déconnexion */}
  </div>
    // <div className="vertical-navbar">
    //   <button onClick={handleLoginClick}>Login</button>
    //   <button onClick={handleProfileClick}>Profile</button>
    //   <button onClick={handleToggleChannels}>
    //       {showChannels ? 'Hide Channels' : 'Show Channels'}
    //    </button>
    //      {showChannels && <ChannelsPage />}
    //   <button onClick={handleLogout}>Déconnexion</button> {/* Bouton de déconnexion */}
    // </div>
  );
};

export default Navbar;
