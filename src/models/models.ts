

export interface BottomMenuProps {
    onMenuClick: () => void;
  }
  

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// FlightData.ts
export interface FlightData {
  data: FlightDataItem[];
}

// FlightDataItem.ts
export interface FlightDataItem {
  flightId: string;        // "fr24Id" mapped to "flightId"
  latitude: number;        // "lat" mapped to "latitude"
  longitude: number;       // "lon" mapped to "longitude"
  altitude: number;        // "alt" mapped to "altitude"
  groundSpeed: number;     // "gspeed" mapped to "groundSpeed"
  track: number;           // "track" mapped to "track"
  timestamp: string;       // "timestamp" mapped to "timestamp"
  flightNumber: string;    // "flight" mapped to "flightNumber"
  callsign: string;        // "callsign" mapped to "callsign"
  hexCode: string;         // "hex" mapped to "hexCode"
  aircraftType: string;    // "type" mapped to "aircraftType"
  registration: string;    // "reg" mapped to "registration"
  originIcao: string;      // "origIcao" mapped to "originIcao"
  destinationIcao: string; // "destIata" mapped to "destinationIcao"
  estimatedArrival: string;
}
