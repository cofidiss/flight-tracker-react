import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import BottomMenu from '../BottomMenu/BottomMenu';
import { Client } from '@stomp/stompjs';
import FlightMarker from './FlightMarker';
import { FlightCoordinateRangeFilter, FlightData } from '../../models/models';
import { AppContext } from '../../contexts/AppContext';
import { Map } from 'leaflet';
import {
  connectToFlightStream,
  sendflightCoordinateRangeFilterData,
} from '../../services/flighDataService';

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  console.log('MapComponent renderer');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [flights, setFlights] = useState<FlightData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { userRole, principalName, setPrincipalName ,isLoggedIn} = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const stompClientRef = useRef<Client | null>(null);
  console.log('MapComponent renderer', stompClientRef.current);
  // İlk useEffect: stompClient'ı oluştur ve bağlantıyı etkinleştir

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return undefined;
    }

    const cleanup = connectToFlightStream({
      baseUrl,
      stompClientRef,
      onSessionIdReceived: (sessionId) => {
        setPrincipalName(sessionId);
      },
      onFlightsReceived: (flightData) => {
        setFlights(flightData);
      },
      onInitialFilterSend: (stompClient) => {
        if (!mapRef.current) {
          return;
        }

        const currentBounds = mapRef.current.getBounds();
        console.log('currentBounds', currentBounds);
        sendflightCoordinateRangeFilterData(stompClient, {
          latitudeMax: currentBounds.getNorthEast().lat,
          latitudeMin: currentBounds.getSouthWest().lat,
          longitudeMax: currentBounds.getNorthEast().lng,
          longitudeMin: currentBounds.getSouthWest().lng,
        });
      },
      onError: (error) => {
        console.error('WebSocket connection error:', error);
      },
    });

    return cleanup;
  }, []);


  useEffect(() => {
    const refreshMap = () => {
      if (!mapRef.current) {
        return;
      }

      mapRef.current.invalidateSize();
      window.setTimeout(() => mapRef.current?.invalidateSize(), 100);
      window.setTimeout(() => mapRef.current?.invalidateSize(), 400);
    };

    refreshMap();
    window.addEventListener('resize', refreshMap);

    const frame = window.requestAnimationFrame(refreshMap);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', refreshMap);
    };
  }, []);

  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    const latitudeMax = bounds.getNorthEast().lat; // Maksimum enlem
    const latitudeMin = bounds.getSouthWest().lat; // Minimum enlem
    const longitudeMax = bounds.getNorthEast().lng; // Maksimum boylam
    const longitudeMin = bounds.getSouthWest().lng; // Minimum boylam

    console.log('Latitude Max:', latitudeMax);
    console.log('Latitude Min:', latitudeMin);
    console.log('Longitude Max:', longitudeMax);
    console.log('Longitude Min:', longitudeMin);
    sendflightCoordinateRangeFilterData(stompClientRef.current, {
      latitudeMax: latitudeMax,
      latitudeMin: latitudeMin,
      longitudeMax: longitudeMax,
      longitudeMin: longitudeMin,
    });
  };

  function MapEvents() {
    const map = useMap();
    useEffect(() => {
      const updateBounds = () => handleBoundsChange(map.getBounds());
      map.on('moveend', updateBounds);
      return () => {
        map.off('moveend', updateBounds);
      };
    }, [map]);
    return null;
  }
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const resizeMap = () => {
      map.invalidateSize({ animate: false });
    };

    // İlk render sonrasında
    setTimeout(resizeMap, 100);
    setTimeout(resizeMap, 500);
    setTimeout(resizeMap, 1000);

    window.addEventListener('resize', resizeMap);

    return () => {
      window.removeEventListener('resize', resizeMap);
    };
  }, [map]);

  return null;
}
  return (
 <div className="asde">
      {userRole == 'PremiumUser' ? (
        <BottomMenu onMenuClick={() => setSidebarOpen(true)} />
      ) : null}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <MapContainer
        center={[42.3, 32.2]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents />
        {flights?.data.map((flight) => (
          <FlightMarker key={flight.flightId} flightDataItem={flight} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
