import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import Navbar from '@/components/Navbar';

interface User {
  id: number;
  name: string;
}

const createChannelForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [createError, setCreateError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemberSelection = (userId: number) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      const requestData = {
        ...data,
        members: selectedMembers
      };

      const response = await axios.post('http://localhost:8080/channel', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        const channelId = response.data.channel.id;
        router.push(`/channel/${channelId}`);
      } else {
        setCreateError(true);
      }
    } catch (error) {
      console.error(error);
      setCreateError(true);
    }
  };

  return (
    <div className="container-fluid d-flex flex-row">
      <div className="col-md-3 bg-light p-3">
      <Navbar />
      </div>
      <div className="col-md-9 bg-white p-3">
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
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id}>
                <input
                  type="checkbox"
                  onChange={() => handleMemberSelection(user.id)}
                  checked={selectedMembers.includes(user.id)}
                />
                <label>{user.name}</label>
              </div>
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </div>
        <button type="submit">Create Channel</button>
      </form>
      </div>
    </div>
  );
};

export default createChannelForm;
