import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Importer le package js-cookie
import Navbar from '@/components/Navbar';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', data);
      if (response.status === 200) {
        const token = response.data.user.token;
        //id
        const idUser = response.data.user.id;
        Cookies.set('id', idUser);
        
        // Stocker le jeton dans un cookie
        Cookies.set('token', token);

        // Authentifié, redirection vers la page de profil
        router.push('/users/profile');
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {loginError && <p>Incorrect email or password</p>}
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/users/signup">Sign up</a></p>
    </div>
  );
};

export default LoginPage;
