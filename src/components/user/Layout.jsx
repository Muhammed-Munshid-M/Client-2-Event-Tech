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
// import ListItemmenu from '@mui/material/ListItemmenu';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LogoutIcon from '@mui/icons-material/Logout';
import { Checkbox, ListItemText, Radio } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 10,
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
    backgroundColor: 'orange',
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

const settings = [{ label: 'Profile', path: '/profile' }, { label: 'Logout', path: '/' }];

export default function Layout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
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
            name: 'Food Service',
            path: '/manager/dashboard'
        }, {
            name: 'Stage Service',
            path: '/manager/bookings'
        }, {
            name: 'Decoration Service',
            path: '/manager/bookings'
        }, {
            name: 'Audio Service',
            path: '/manager/bookings'
        }, {
            name: 'Video Service',
            path: '/manager/bookings'
        },
    ]

    const locationList = [
        {
            name: 'Kasargod',
            path: '/manager/dashboard'
        }, {
            name: 'Kannur',
            path: '/manager/bookings'
        }, {
            name: 'Wayanad',
            path: '/manager/bookings'
        }, {
            name: 'Kozhikode',
            path: '/manager/bookings'
        }, {
            name: 'Malappuram',
            path: '/manager/bookings'
        }, {
            name: 'Palakkad',
            path: '/manager/dashboard'
        }, {
            name: 'Thrissur',
            path: '/manager/bookings'
        }, {
            name: 'Ernakulam',
            path: '/manager/bookings'
        }, {
            name: 'Idukki',
            path: '/manager/bookings'
        }, {
            name: 'Kottayam',
            path: '/manager/bookings'
        }, {
            name: 'Alappuzha',
            path: '/manager/dashboard'
        }, {
            name: 'Pathanamthitta',
            path: '/manager/bookings'
        }, {
            name: 'Kollam',
            path: '/manager/bookings'
        }, {
            name: 'Thiruvananthapuram',
            path: '/manager/bookings'
        }
    ]

    const location = useLocation();
    const navigate = useNavigate()
    React.useEffect(() => {
        const active = menuList.find(menu => location.pathname.startsWith(menu.path));
        setActiveMenu(active ? active.name : null);
    }, [location.pathname, menuList]);


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <RestaurantMenuIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
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
                                color: 'black',
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
                <h1 className='mt-5 mb-2 ml-4 text-xl font-semibold'>Filter by Services</h1>
                <List>
                    {menuList.map((menu, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                {/* <Radio
                                    checked={selectedValue === 'a'}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <Radio
                                    checked={selectedValue === 'b'}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    value="b"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'B' }}
                                /> */}
                                <ListItemText className='text-xl text-black font-normal underline-offset-0' primary={menu.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <h1 className='mt-5 mb-2 ml-4 text-xl font-semibold'>Filter by Location</h1>
                <List>
                    {locationList.map((menu, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <Radio
                                    checked={selectedValue === 'a'}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    value="a"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                <Radio
                                    checked={selectedValue === 'b'}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    value="b"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'B' }}
                                />
                                <ListItemText className={`text-xl font-normal underline-offset-0 ${activeMenu === menu.name ? 'text-white' : 'text-black'}`} primary={menu.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
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
                    <Box sx={{ overflow: 'auto', marginLeft: '20px' }}>
                        <h1 className='mt-10 mb-2 ml-4 text-xl font-semibold'>Filter by Services</h1>
                        <List>
                            {menuList.map((menu, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <Checkbox />
                                        <ListItemText className={`text-xl font-normal underline-offset-0 ${activeMenu === menu.name ? 'text-white' : 'text-black'}`} primary={menu.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <h1 className='mt-5 mb-2 ml-4 text-xl font-semibold'>Filter by Location</h1>
                        <List>
                            {locationList.map((menu, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <Checkbox/>
                                        <ListItemText className={`text-xl font-normal underline-offset-0 ${activeMenu === menu.name ? 'text-white' : 'text-black'}`} primary={menu.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
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