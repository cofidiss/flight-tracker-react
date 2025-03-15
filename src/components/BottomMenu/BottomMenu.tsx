import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuIcon from '@mui/icons-material/Menu';
import { BottomMenuProps } from '../../models/models';

const BottomMenu: React.FC<BottomMenuProps> = ({ onMenuClick }) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center', // Center the content
      }}
    >
      <BottomNavigationAction
        label="Filters"
        icon={<MenuIcon />}
        onClick={onMenuClick}
        sx={{
          '& .MuiBottomNavigationAction-label': {
            display: 'none', // Hide the label
          },
        }}
      />
    </BottomNavigation>
  );
};

export default BottomMenu;
