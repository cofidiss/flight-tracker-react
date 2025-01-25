import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FlightDataItem } from '../../models/models';
import helicopter from '../../assets/icons/helicopter.png';
import airplane from '../../assets/icons/airplane.png';
// Uçuş verisi tipi


// Uçak ve helikopter ikonlarını tanımla
const airplaneIcon = new L.Icon({
  iconUrl:airplane,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const helicopterIcon = new L.Icon({
  iconUrl: helicopter,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// FlightMarker bileşeni
const FlightMarker: React.FC< {flightDataItem:FlightDataItem }> = ( {flightDataItem }) => {
  // Uçak veya helikopter olup olmadığını belirle
  const isHelicopter = flightDataItem.aircraftType.toLowerCase().startsWith('h');

  return (
    <Marker position={[flightDataItem.latitude, flightDataItem.longitude]} icon={isHelicopter ? helicopterIcon : airplaneIcon}>
      <Popup>
        <div>
          <strong>Flight:</strong> {flightDataItem.flightNumber} <br />
          <strong>Altitude:</strong> {flightDataItem.altitude} ft <br />
          <strong>Speed:</strong> {flightDataItem.groundSpeed} knots
        </div>
      </Popup>
    </Marker>
  );
};

export default FlightMarker;
