import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Importer le package js-cookie

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [signupError, setSignupError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8080/users/', data);
      if (response.status === 201) {
        const token = response.data.user.token;

        // Stocker le jeton dans un cookie
        Cookies.set('token', token);

        // Rediriger vers la page de profil
        router.push('/users/profile');
      } else {
        setSignupError(true);
      }
    } catch (error) {
      console.error(error);
      setSignupError(true);
    }
  };

  const handleLoginClick = () => {
    router.push('/users/login');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {signupError && <p>Error occurred while signing up</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <p>Email is required</p>}
        </div>
        <div>
          <label>Password</label>
          <input {...register('password', { required: true })} />
          {errors.password && <p>Password is required</p>}
        </div>
        <div>
          <label>Name</label>
          <input {...register('name', { required: true })} />
          {errors.name && <p>Name is required</p>}
        </div>
        <div>
          <label>Bio</label>
          <textarea {...register('bio')} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <button onClick={handleLoginClick}>Login</button></p> {/* Bouton de demande de connexion */}
    </div>
  );
};

export default SignUpPage;
