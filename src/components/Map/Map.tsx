import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import BottomMenu from '../BottomMenu/BottomMenu';

const MapComponent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

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
