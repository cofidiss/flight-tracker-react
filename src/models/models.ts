import { ReactNode } from "react";


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
export type globalCss ={
  componentBackgroundColor:string
    }
export interface AppContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
  setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
  refreshNavbar:() => void;
  setIsLoggedIn:(param:boolean)=>void;
  isLoggedIn:boolean;
  globalCss:globalCss; 
  userRole:string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  principalName:string | null;
  setPrincipalName: React.Dispatch<React.SetStateAction<string | null>>;
};
export interface CustomModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  okButtonText?: string;
  okButtonClick?: () => void;
  leftButtonText?: string;
  leftButtonClick?: () => void;
  rightButtonText?: string;
  rightButtonClick?: () => void;
  children? :ReactNode;
}

export type FlightCustomFilter =  {
  altitudeMin?: number,
          altitudeMax?: number,
          groundSpeedMin?: number,
          groundSpeedMax?: number,
          category?: string ,
          principalName: string | null
        }  ;

        export type FlightCoordinateRangeFilter =  {
       
          latitudeMin?: number,
                  latitudeMax?: number,
                  longitudeMin?: number,
                  longitudeMax?: number
      
                }  ;
        
        export type formState = {
          altitudeMin?: number;
          altitudeMax?: number;
          groundSpeedMin?: number;
          groundSpeedMax?: number;
          category?: string;
          sessionId?: string;
        }
