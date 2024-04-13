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

const Navigation = () => {
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
  return (
    <nav>
      <div className="nav-logo-container">
        <img className="bookimg" src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <a href="/">Home</a>
        <a href="/AddBook">Add Book</a>
        <a href="">Register</a>
        <a href="">Contact</a>
        <a href="SimpleUserDashboard">Profile</a>
        <button className="primary-button">Login</button>
      </div>
      
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