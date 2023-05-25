import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

interface Channel {
  id: number;
  name: string;
  type: string;
  ownerId: number;
  updatedAt: string;
  createdAt: string;
}

const ChannelPage = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const router = useRouter();
  const { channelId } = router.query;
  const [createError, setCreateError] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:8080/channel/${channelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.status) {
          setChannel(response.data.channel);
        } else {
            setCreateError(true);
        }
      } catch (error) {
        console.error(error);
        setCreateError(true);
        router.push(`/channels/create`)
      }
    };

    if (channelId) {
      fetchChannelData();
    }
  }, [channelId]);

  if (!channel) {
    return <p>Loading...</p>;
  }

  const handleAddMembers = () => {
    router.push(`/channels/channel/${channelId}/members`);
  };

  return (
    <div>
      <Navbar /> {/* Inclure le composant VerticalNavbar ici */}
      <h1>Channel {channel.id}</h1>
      <p>Name: {channel.name}</p>
      <p>Type: {channel.type}</p>
      <p>Owner ID: {channel.ownerId}</p>
      <p>Updated At: {channel.updatedAt}</p>
      <p>Created At: {channel.createdAt}</p>
      <button onClick={handleAddMembers}>Add Members</button>
    </div>
  );
};

export default ChannelPage;
