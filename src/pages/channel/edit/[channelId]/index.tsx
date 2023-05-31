import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
  id: number;
  name: string;
}

const editChannelForm = () => {
  const router = useRouter();
  const { channelId } = router.query;
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const handleAddMember = async () => {
    if (selectedMembers.length === 0) {
      setError('Please select at least one member');
      return;
    }

    try {
      const token = Cookies.get('token');

      const response = await axios.post(`http://localhost:8080/channels/${channelId}/members`, {
        members: selectedMembers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        setSuccess(true);
        setError('');

        router.push(`/channel/${channelId}`);
        alert("members added successfully");
      
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

  return (
    <div className="container-fluid d-flex flex-row">
    <div className="col-md-3 bg-light p-3">
    <Navbar />
    </div>
    <div className="col-md-9 bg-white p-3">
      <h1>Add Member</h1>
      {success && <p>Member added successfully</p>}
      {error && <p>{error}</p>}
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
      <button onClick={handleAddMember}>Add Member</button>
      </div>
    </div>
  );
};

export default editChannelForm;
