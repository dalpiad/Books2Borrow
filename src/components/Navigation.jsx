import React, { useState } from "react";
import Logo from "../assets/BookLogo.jpg";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { BiSolidBookAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


const Navigation = () => {
  const auth = localStorage.getItem('jwt')
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />,
          },
          {
            text: "MyBooks",
            icon: <InfoIcon />,
          },
          {
            text: "Register",
            icon: <AppRegistrationIcon />,
          },
          {
            text: "Contact",
            icon: <PhoneRoundedIcon />,
          },
          {
            text: "AddBook",
            icon: <BiSolidBookAdd />,
          },
          {
            text: "Profile",
            icon: <AccountBoxIcon />,
          },
  ];

  const logout = () =>{
    console.log("auth", auth)
    console.log("LocalStorage",localStorage)
    localStorage.clear();
    console.log("LocalStorage post clear",localStorage)
    navigate("/")
  }

  return (
    <nav>
      <div className="nav-logo-container">
        <img className="bookimg" src={Logo} alt="" />
        <ReactNotifications />
      </div>


      {auth ?  
        
        <div className="navbar-links-container">
          <Link to ="/">Home</Link>
          <Link to="/AddBook">Add Book</Link>
          <Link to="/SimpleUserDashboard">Profile</Link>
          <Link onClick={logout} to="/login">Logout</Link>
        </div>

            : 
            
            <div className="navbar-links-container">
            <Link to ="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        }
      


        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navigation;