import React, { useContext, useReducer } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  FlightCustomFilter,
  formState,
  SidebarProps,
} from '../../models/models';
import { AppContext } from '../../contexts/AppContext';
import InputAdornment from '@mui/material/InputAdornment';

// Define the initial form state
const initialState = {
  altitudeMin: 1000,
  altitudeMax: 40000,
  groundSpeedMin: 200,
  groundSpeedMax: 600,
  category: '',
};

// Define the reducer function
const formReducer = (state: formState, action: any) => {
  switch (action.type) {
    case 'SET_ALTITUDE':
      return {
        ...state,
        altitudeMin: action.payload.min,
        altitudeMax: action.payload.max,
      };
    case 'SET_GROUND_SPEED':
      return {
        ...state,
        groundSpeedMin: action.payload.min,
        groundSpeedMax: action.payload.max,
      };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'CLEAR_CATEGORY':
      return { ...state, category: '' };
    default:
      return state;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setIsLoggedIn, principalName } =
    useContext(AppContext);
  // UseReducer hook to manage form state
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const sendFlightCustomFilterData = async () => {
    const FlightCustomFilter: FlightCustomFilter = {
      altitudeMin: formState.altitudeMin,
      altitudeMax: formState.altitudeMax,
      groundSpeedMin: formState.groundSpeedMin,
      groundSpeedMax: formState.groundSpeedMax,
      category: formState.category,
      principalName: principalName,
    };
    var repsonse = await fetch(`${baseUrl}/api/flight/live/filter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(FlightCustomFilter),
    });

    stopLoading();
  };
  // Handle Save functionality
  const handleSave = () => {
    sendFlightCustomFilterData();
    onClose(); // Close the sidebar after saving
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <div style={{ width: 250, padding: 16 }}>
        {/* Close Button at the top right */}
        <IconButton
          onClick={onClose}
          style={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Altitude Range */}
        <div style={{ marginBottom: 16 }}>
          <h4>Altitude Range</h4>
          <Slider
            value={[formState.altitudeMin, formState.altitudeMax]}
            onChange={(event, newValue: number | number[]) => {
              newValue = newValue as number[];
              dispatch({
                type: 'SET_ALTITUDE',
                payload: {
                  min: newValue[0] as number,
                  max: newValue[1] as number,
                },
              });
            }}
            valueLabelDisplay="auto"
            min={1000}
            max={40000}
            valueLabelFormat={(value) => `${value} ft`}
            aria-labelledby="altitude-slider"
          />
        </div>

        {/* Ground Speed Range */}
        <div style={{ marginBottom: 16 }}>
          <h4>Ground Speed Range</h4>
          <Slider
            value={[formState.groundSpeedMin, formState.groundSpeedMax]}
            onChange={(event, newValue) => {
              newValue = newValue as number[];
              dispatch({
                type: 'SET_GROUND_SPEED',
                payload: {
                  min: newValue[0] as number,
                  max: newValue[1] as number,
                },
              });
            }}
            valueLabelDisplay="auto"
            min={200}
            max={600}
            valueLabelFormat={(value) => `${value} km/h`}
            aria-labelledby="ground-speed-slider"
          />
        </div>

        {/* Category Selector */}
        <div style={{ marginBottom: 16 }}>
          <h4>Category</h4>
          <Select
            value={formState.category}
            onChange={(e) => {
              dispatch({ type: 'SET_CATEGORY', payload: e.target.value });
            }}
            fullWidth
            variant="outlined"
            displayEmpty
            inputProps={{
              startAdornment: formState.category && (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => dispatch({ type: 'CLEAR_CATEGORY' })}
                    color="secondary"
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">
              <em>Hiçbiri</em>
            </MenuItem>
            <MenuItem value="H">H</MenuItem>
            <MenuItem value="P">P</MenuItem>
          </Select>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          sx={{ marginTop: 2 }}
          variant="contained"
          color="primary"
          fullWidth
        >
          Kaydet
        </Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
