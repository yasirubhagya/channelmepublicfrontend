import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { NavLink } from 'react-router-dom';
export const mainListItems = (
  <div>
    <NavLink style={{textDecoration : 'none'}} to='/Reports'>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </NavLink>
    <NavLink style={{textDecoration : 'none'}} to='/Doctors'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItem>
    </NavLink>
    <NavLink style={{textDecoration : 'none'}} to='/DoctorsOfChannelCenter'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors Of CC" />
      </ListItem>
    </NavLink>
    <NavLink style={{textDecoration : 'none'}} to='/ConsultantType'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Field of Consulting" />
      </ListItem>
    </NavLink>
    <NavLink style={{textDecoration : 'none'}} to='/City'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="City" />
      </ListItem>
    </NavLink>
    <NavLink style={{textDecoration : 'none'}} to='/Channels'>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Channels" />
      </ListItem>
    </NavLink>
    <NavLink style={{textDecoration : 'none'}} to='/Profile'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </NavLink>
  </div>
);

