import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuIcon from '@mui/icons-material/Menu';
import { BottomMenuProps } from '../../models/models';


const BottomMenu: React.FC<BottomMenuProps> = ({ onMenuClick }) => {
  return (
    <BottomNavigation
      showLabels
      sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000 }}
    >
      <BottomNavigationAction
        label="Menüyü Aç"
        icon={<MenuIcon />}
        onClick={onMenuClick}
      />
    </BottomNavigation>
  );
};

export default BottomMenu;
