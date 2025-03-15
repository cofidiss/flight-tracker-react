import React, { useState, useEffect, useContext, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import BottomMenu from '../BottomMenu/BottomMenu';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import FlightMarker from './FlightMarker';
import { FlightCoordinateRangeFilter, FlightData } from '../../models/models';
import { AppContext } from '../../contexts/AppContext';
import { Map } from 'leaflet';

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [flights, setFlights] = useState<FlightData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { userRole, principalName, setPrincipalName } = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const stompClientRef = useRef<Client | null>(null);

  // İlk useEffect: stompClient'ı oluştur ve bağlantıyı etkinleştir

  useEffect(() => {
    const socketUrl = `${baseUrl}/ws`;
    const socket = new SockJS(socketUrl);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });
    console.log('socketUrl' + socketUrl);
    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      console.log('Connected to WebSocket');

      console.log('stompClient.activate');

      // getSessionIdiçin abone ol
      stompClient.subscribe('/user/topic/getSessionId', (messageOutput) => {
        try {
          console.log('stompClient. getSessionId' + messageOutput.body);
          setPrincipalName(messageOutput.body);
        } catch (error) {
          console.error('getSessionId error:', error, messageOutput.body);
        }
        stompClient.unsubscribe('/topic/getSessionId');
      });

      // Live flight verileri için abone ol
      stompClient.subscribe('/user/topic/liveflight', (messageOutput) => {
        try {
          console.log('stompClient.subscribe');
          const flightData = JSON.parse(messageOutput.body);
          console.log('Live flight data:', flightData);
          setFlights(flightData);
        } catch (error) {
          console.error('JSON parse error:', error, messageOutput.body);
        }
      });

      // İlk filtre gönderimi
      if (mapRef.current) {
        let curentBounds = mapRef.current.getBounds();
        console.log('curentBounds', curentBounds);
        sendflightCoordinateRangeFilterData(stompClient, {
          latitudeMax: curentBounds.getNorthEast().lat,
          latitudeMin: curentBounds.getSouthWest().lat,
          longitudeMax: curentBounds.getNorthEast().lng,
          longitudeMin: curentBounds.getSouthWest().lng,
        });
      }
      stompClient.publish({
        destination: '/app/getSessionId',
      });
    };
    stompClient.activate();
    return () => {
      console.log('Disconnected from WebSocket');
      stompClient.deactivate();
    };
  }, []);

  function sendflightCoordinateRangeFilterData(
    stompClient: Client | null,
    filter: FlightCoordinateRangeFilter | null,
  ) {
    if (
      filter == null ||
      stompClient == null ||
      stompClient.connected == false
    ) {
      return;
    }
    console.log('sendflightCoordinateRangeFilterData');
    stompClient.publish({
      destination: '/app/live',
      body: JSON.stringify(filter),
    });
  }

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
