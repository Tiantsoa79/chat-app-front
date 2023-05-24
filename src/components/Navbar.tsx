import React from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/users/login');
  };

  const handleSignupClick = () => {
    router.push('/users/signup');
  };

  const handleProfileClick = () => {
    router.push('/users/profile');
  };

  return (
    <div className="vertical-navbar">
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleSignupClick}>Signup</button>
      <button onClick={handleProfileClick}>Profile</button>
    </div>
  );
};

export default Navbar;
