import React, { useState } from 'react';
import logo from '../assets/selogo.jpeg';
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import './navbar.css';

export const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const { logout } = useLogout()
    const { user } = useAuthContext()


    const handleClick = () => {
        logout()

    }

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />,
            destination: "/"
        },
        {
            text: "News",
            icon: <DirectionsCar />,
            destination: "/news"
        },
        {
            text: "Login/SignUp",
            icon: <AccountCircle />,
            destination: "/login"
        },
    ];

    const handleMenuItemClick = (destination) => {
        navigate(destination);
        setOpenMenu(false);
    };

    return (
        <nav>
            <div className='nav-logo-container'>
                <img src={logo} alt="Logo" onClick={() => navigate("/")} />
            </div>
            {user && (
                <div>
                    <button className='primary1-button' onClick={() => navigate("/")}>Home</button>
                    <button className='primary1-button' onClick={() => navigate("/form")}>Form</button>
                    <button className='primary1-button' onClick={() => navigate("/chatbot")}>chatbot</button>
                    <button className='primary1-button' onClick={() => navigate("/subscribe")}>Subscribe</button>
                    <span>{user.email}</span>

                    <button className='primary1-button' onClick={handleClick}>log out</button>
                </div>
            )}
            {!user && (
                <div className='navbar-links-container'>

                    <button className='primary1-button' onClick={() => navigate("/signup")}>Signup</button>
                    <button className='primary1-button' onClick={() => navigate("/login")}>Login</button>
                    <button className='primary1-button' onClick={() => navigate("/UserProfile")}>
                        <AccountCircle sx={{ fontSize: 30 }} />
                    </button>
                </div>
            )}
            <div className='navbar-menu-container'>
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
            </div>
            <Drawer
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                anchor='right'
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} button disablePadding onClick={() => handleMenuItemClick(item.destination)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    );
};

export default Navbar;
