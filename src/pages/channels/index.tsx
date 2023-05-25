import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface Channel {
  id: number;
  name: string;
  type: string;
  ownerId: number;
  updatedAt: string;
  createdAt: string;
}

const ChannelsPage = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const token = Cookies.get('token');

        const response = await axios.get('http://localhost:8080/channels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.status) {
          setChannels(response.data.channels);
        } else {
          // Handle error or redirect to login/signup page
        }
      } catch (error) {
        console.error(error);
        // Handle error or redirect to login/signup page
      }
    };

    fetchChannels();
  }, []);

  const handleChannelClick = (channelId: number) => {
    router.push(`/channels/channel/${channelId}`);
  };


  const idCurrent = +Cookies.get('id');

  const filteredChannels = channels.filter((channel) => channel.ownerId === idCurrent);

  return (
    <div>
      <h1>Channels</h1>
      {filteredChannels.map((channel) => (
        <div key={channel.id} onClick={() => handleChannelClick(channel.id)}>
          <p>{channel.name}</p>
          <p>{channel.type}</p>
          <p>{channel.ownerId}</p>
          {/* Afficher d'autres détails du canal si nécessaire */}
        </div>
      ))}
    </div>
  );
};

export default ChannelsPage;
