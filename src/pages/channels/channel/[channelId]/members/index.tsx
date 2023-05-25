import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

interface AddMemberResponse {
  status: boolean;
  userAdded: number[];
}

const AddMemberPage = () => {
  const [members, setMembers] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [userAdded, setUserAdded] = useState<number[]>([]);
  const router = useRouter();
  const { channelId } = router.query;

  const handleAddMember = async () => {
    if (members.length === 0) {
      setError('Please enter a member ID');
      return;
    }

    try {
      const token = Cookies.get('token');

      const response = await axios.post<AddMemberResponse>(`http://localhost:8080/channels/${channelId}/members`, {
        members: members,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        setSuccess(true);
        setUserAdded(response.data.userAdded);
        setError('');
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const memberId = parseInt(event.target.value);
    setMembers([memberId]);
  };

  return (
    <div>
      <Navbar /> {/* Inclure le composant VerticalNavbar ici */}
      <h1>Add Member</h1>
      {success && <p>Member added successfully</p>}
      {error && <p>{error}</p>}
      <div>
        <label>Member ID</label>
        <input type="number" onChange={handleChange} />
      </div>
      <button onClick={handleAddMember}>Add Member</button>

      {userAdded.length > 0 && (
        <div>
          <h2>Members Added:</h2>
          <ul>
            {userAdded.map((userId) => (
              <li key={userId}>{userId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddMemberPage;
