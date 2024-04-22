import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navigation from './Navigation';
import MyLibrary from './MyLibrary';
import Wishlist from './Wishlist';
import MessageInbox from './chatComponents/MessageInbox';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            <Box  sx={{ p: 3 }}>
              {children}
            </Box>
          </Container>
        )}
     </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }




const SimpleUserDashboard = () => {
  const [value, setValue] = useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div>
      <Navigation />
        <br/>
    </div>

    <div
            style={{
                marginLeft: "10%",
            }}
        >
            <h1 style={{textAlign: "center"}}>User Dashboard</h1>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' } }>
                <Tabs value={value} onChange={handleChange} aria-label="Not sure what this labels" centered  >
                    <Tab sx={{fontSize: '1.25rem'}} label="Status Tracker" {...a11yProps(0)} />
                    <Tab sx={{fontSize: '1.25rem'}} label="My Library" {...a11yProps(1)} />
                    <Tab sx={{fontSize: '1.25rem'}} label="My WishList" {...a11yProps(2)} />
                    <Tab sx={{fontSize: '1.25rem'}} label="Chat" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Status Tracker
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <MyLibrary />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Wishlist />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <MessageInbox />
            </CustomTabPanel>
        </div>
        </>
    )

}

export default SimpleUserDashboard