import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { SidebarProps } from '../../models/models';



const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        {['Menü Öğesi 1', 'Menü Öğesi 2', 'Menü Öğesi 3'].map((text, index) => (
          <ListItem  key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Button onClick={onClose} sx={{ margin: 1 }} variant="contained" color="secondary">
        Kapat
      </Button>
    </Drawer>
  );
};

export default Sidebar;
