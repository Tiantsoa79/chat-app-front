import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Navbar from '@/components/Navbar';

const CreateChannelPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [createError, setCreateError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post('http://localhost:8080/channel', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        const channelId = response.data.channel.id;
        router.push(`/channels/channel/${channelId}`);
      } else {
        setCreateError(true);
      }
    } catch (error) {
      console.error(error);
      setCreateError(true);
    }
  };

  return (
    <div>
      <Navbar /> {/* Inclure le composant VerticalNavbar ici */}
      <h1>Create Channel</h1>
      {createError && <p>Error occurred while creating channel</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name', { required: true })} />
          {errors.name && <p>Name is required</p>}
        </div>
        <div>
          <label>Type</label>
          <select {...register('type', { required: true })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          {errors.type && <p>Type is required</p>}
        </div>
        <div>
          <label>Members</label>
          <input {...register('members')} />
        </div>
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
};

export default CreateChannelPage;
