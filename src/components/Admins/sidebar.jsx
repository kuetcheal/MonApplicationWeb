import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { AccountCircleIcon, MenuIcon } from '@mui/icons-material';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bienvenue sur votre espace personnel
          </Typography>
          <div>
            <IconButton
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
            >
              <MenuItem component={Link} to="/mon-compte">
                Mon compte
              </MenuItem>
              <MenuItem component={Link} to="/parametres">
                Paramètres
              </MenuItem>
              <MenuItem component={Link} to="/deconnexion">
                Déconnexion
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <List>
          <ListItem button component={Link} to="/accueil">
            <ListItemIcon>
              {/* Icone pour la page d'accueil */}
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
          <ListItem button component={Link} to="/tableau-de-bord">
            <ListItemIcon>
              {/* Icone pour le tableau de bord */}
            </ListItemIcon>
            <ListItemText primary="Tableau de bord" />
          </ListItem>
          <ListItem button component={Link} to="/commandes">
            <ListItemIcon>
              {/* Icone pour les commandes */}
            </ListItemIcon>
            <ListItemText primary="Commandes" />
          </ListItem>
          <ListItem button component={Link} to="/produits">
            <ListItemIcon>
              {/* Icone pour les produits */}
            </ListItemIcon>
            <ListItemText primary="Produits" />
          </ListItem>
          <ListItem button component={Link} to="/clients">
            <ListItemIcon>
              {/* Icone pour les clients */}
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;
