<<<<<<< HEAD
import React, { useState,useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 08d9210376ffc6e992d3a6c1efc4514bef91438a
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import BottomMenu from '../BottomMenu/BottomMenu';
<<<<<<< HEAD
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import FlightMarker from './FlightMarker';
import { FlightData } from '../../models/models';

const MapComponent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [flights, setFlights] = useState<FlightData>();
=======

const MapComponent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
>>>>>>> 08d9210376ffc6e992d3a6c1efc4514bef91438a

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

<<<<<<< HEAD
  useEffect(() => {
    const session = generateSessionId();

    const socketUrl = 'http://localhost:8080/ws';
    const socket = new SockJS(socketUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = (frame) => {
      console.log('Connected: ', frame);

      stompClient.publish({
        destination: '/app/live',
        body: session,
      });

      stompClient.subscribe(`/topic/${session}`, (messageOutput) => {
        const flightData = JSON.parse(messageOutput.body);
        console.log(flightData);
        setFlights(flightData);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  function generateSessionId() {
    return Math.random().toString(36).substr(2, 9);
  }
debugger;
=======
>>>>>>> 08d9210376ffc6e992d3a6c1efc4514bef91438a
  return (
    <div>
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <BottomMenu onMenuClick={handleMenuClick} />
      <MapContainer
        center={[42.3, 32.2]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
<<<<<<< HEAD
         {flights?.data.map((flight) => (
          <FlightMarker key={flight.flightId} flightDataItem={flight} />
        ))}
=======
        <Marker position={[42.3, 32.2]}>
          <Popup>
            Bu benim konumum!
          </Popup>
        </Marker>
>>>>>>> 08d9210376ffc6e992d3a6c1efc4514bef91438a
      </MapContainer>
    </div>
  );
};

<<<<<<< HEAD
export default MapComponent;
=======
export default MapComponent;
>>>>>>> 08d9210376ffc6e992d3a6c1efc4514bef91438a
