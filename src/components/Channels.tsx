import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Channel {
  id: number;
  name: string;
  type: string;
  ownerId: number;
  updatedAt: string;
  createdAt: string;
}

const Channels = () => {
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
    router.push(`/channel/${channelId}`);
  };


  const idCurrent = +Cookies.get('id');

  const filteredChannels = channels.filter((channel) => channel.ownerId === idCurrent);

  return (
    <div>
      {filteredChannels.map((channel) => (
        <div className="list-group" key={channel.id} onClick={() => handleChannelClick(channel.id)}>
          <p className="list-group-item h6">{channel.name}
          <br />
          <small> ({channel.type})</small>
          </p>
          {/* Afficher d'autres détails du canal si nécessaire */}
        </div>
      ))}
    </div>
  );
};

export default Channels;
