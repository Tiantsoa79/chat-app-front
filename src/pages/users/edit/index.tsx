import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const EditProfilePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [editError, setEditError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.put('http://localhost:8080/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        router.push('/users/profile');
      } else {
        setEditError(true);
      }
    } catch (error) {
      console.error(error);
      setEditError(true);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {editError && <p>Error occurred while editing profile</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} />
          {errors.name && <p>Name is required</p>}
        </div>
        <div>
          <label>Old Password</label>
          <input {...register('oldPassword')} />
          {errors.oldPassword && <p>Old Password is required</p>}
        </div>
        <div>
          <label>New Password</label>
          <input {...register('password')} />
          {errors.password && <p>New Password is required</p>}
        </div>
        <div>
          <label>Bio</label>
          <textarea {...register('bio')} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
