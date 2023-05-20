/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ApprovalIcon from '@mui/icons-material/Approval';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, ListItemText } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 8,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activeMenu, setActiveMenu] = React.useState(null);

  const menuList = [
    {
      name: 'Dashboard',
      icon: 'fa-solid fa-calendar-lines-pen',
      path: '/admin/dashboard',
    }, {
      name: 'Users',
      icon: 'fa-solid fa-calendar-lines-pen',
      path: '/admin/users',
    }, {
      name: 'Managers',
      icon: 'fa-solid fa-calendar-lines-pen',
      path: '/admin/managers',
    }, {
      name: 'Approval List',
      icon: 'fa-solid fa-calendar-lines-pen',
      path: '/admin/approval-list',
    }, {
      name: 'Sales Report',
      icon: 'fa-solid fa-calendar-lines-pen',
      path: '/admin/sales-report',
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const active = menuList.find((menu) => location.pathname.startsWith(menu.path));
    setActiveMenu(active ? active.name : null);
  }, [location.pathname, menuList]);

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <RestaurantMenuIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              menuDecoration: 'none',
            }}
          >
            EVENT TECH
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              menuDecoration: 'none',
            }}
          >
            EVENT TECH
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuList.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={menu.path}>
                <ListItemIcon>
                  {menu.name == 'Dashboard' && <DashboardIcon />}
                  {menu.name == 'Users' && <GroupIcon />}
                  {menu.name == 'Managers' && <ManageAccountsIcon />}
                  {menu.name == 'Approval List' && <ApprovalIcon />}
                  {menu.name == 'Sales Report' && <AssessmentIcon />}
                </ListItemIcon>
                <ListItemText className="text-xl text-black font-normal underline-offset-0" primary={menu.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="logout" disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'mediumpurple' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuList.map((menu, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component={Link} to={menu.path}>
                    <ListItemIcon>
                      {menu.name == 'Dashboard' && <DashboardIcon />}
                      {menu.name == 'Users' && <GroupIcon />}
                      {menu.name == 'Managers' && <ManageAccountsIcon />}
                      {menu.name == 'Approval List' && <ApprovalIcon />}
                      {menu.name == 'Sales Report' && <AssessmentIcon />}
                    </ListItemIcon>
                    <ListItemText className={`text-xl font-normal underline-offset-0 ${activeMenu === menu.name ? 'text-white' : 'text-black'}`} primary={menu.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem key="logout" disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
      <Main open={open}>
        {children}
      </Main>
    </Box>
  );
}
