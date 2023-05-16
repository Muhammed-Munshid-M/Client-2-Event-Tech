import * as React from 'react';
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
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemText } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

const settings = [{ label: 'Profile', path: '/manager/profile' }, { label: 'Logout', path: '/manager' }];

export default function Layout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const Services = useSelector((state) => state.services);
    console.log(Services.service);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const RoutePath = (setting) => {
        if (setting.label == 'Logout') {
            localStorage.clear()
        }
    }

    const [activeMenu, setActiveMenu] = React.useState(null);

    const menuList = [
        {
            name: 'Dashboard',
            icon: 'fa-solid fa-calendar-lines-pen',
            path: '/manager/dashboard'
        }, {
            name: 'Bookings',
            icon: 'fa-solid fa-calendar-lines-pen',
            path: '/manager/bookings'
        }, {
            name: 'Menu List',
            icon: 'fa-solid fa-calendar-lines-pen',
            path: '/manager/menu-list'
        }, {
            name: 'Services',
            icon: 'fa-solid fa-calendar-lines-pen',
            path: '/manager/services'
        }, {
            name: 'Sales Report',
            icon: 'fa-solid fa-calendar-lines-pen',
            path: '/manager/sales-report'
        },
    ]

        const location = useLocation();
        const navigate = useNavigate()
    // if (menuList.name == 'Services') {
    //     if (Services.services == false) {
    //        navigate('/manager/add-services')
    //     } else {
    //         navigate('/manager/services')
    //     }
    // }
    React.useEffect(() => {
        const active = menuList.find(menu => location.pathname.startsWith(menu.path));
        setActiveMenu(active ? active.name : null);
    }, [location.pathname, menuList]);

    const handleLogout = () => {
        localStorage.clear()
        navigate('/manager')
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="xl">
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
                        <Box sx={{ flexGrow: 0 }} className='ms-auto'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.label} component={Link} to={setting.path} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={() => RoutePath(setting)} >{setting.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
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
                                    {menu.name == 'Bookings' && <EditCalendarIcon />}
                                    {menu.name == 'Menu List' && <ListAltIcon />}
                                    {menu.name == 'Services' && <MiscellaneousServicesIcon />}
                                    {menu.name == 'Sales Report' && <AssessmentIcon />}
                                </ListItemIcon>
                                <ListItemText className='text-xl text-black font-normal underline-offset-0' primary={menu.name} />
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
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'lightseagreen' },
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
                                            {menu.name == 'Bookings' && <EditCalendarIcon />}
                                            {menu.name == 'Menu List' && <ListAltIcon />}
                                            {menu.name == 'Services' && <MiscellaneousServicesIcon />}
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