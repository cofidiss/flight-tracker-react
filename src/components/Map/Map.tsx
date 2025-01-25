import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import BottomMenu from '../BottomMenu/BottomMenu';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import FlightMarker from './FlightMarker';
import { FlightData } from '../../models/models';



const MapComponent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
const [flights,setFlights] = useState<FlightData>();

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

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
         {flights?.data.map((flight) => (
          <FlightMarker key={flight.flightId} flightDataItem={flight} />
        ))}
        <Marker position={[42.3, 32.2]}>
          <Popup>
            Bu benim konumum!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;

