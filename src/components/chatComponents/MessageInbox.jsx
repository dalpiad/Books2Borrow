import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const MessageInbox = () => {

  const authHeader = localStorage.getItem('jwt');
  const [conversationList, setConversationList]= useState({});
  const [messageList, setMessageList]= useState({});
  const [value, setValue] = useState(0);
  const [messageContent, setMessageContent] = useState("");
  const formatter = new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'short'});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
      `http://localhost:8080/api/messages/conversations`, {
        headers: {'Authorization': `${authHeader}`}
      })
      setConversationList(response.data);
    };
    fetchData();
  },[]);
  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
      `http://localhost:8080/api/messages/all`, {
        headers: {'Authorization': `${authHeader}`}
      })
      setMessageList(response.data);
    };
    fetchData();
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function assignInterlocutor(key) {
    const interlocutorId = key;
    console.log(interlocutorId);
  };

  const handleSearch = (interlocutorId, message) => {
    // setMessageContent(document.getElementById("message-field").value);
   // console.log(message);
      axios.post(
      `http://localhost:8080/api/messages/send`, {
        "recipientId": interlocutorId,
        "content": message
      }, {
        headers: {'Authorization': `${authHeader}`}
      })
      document.getElementById("message-field").value = '';
  };

  function TabContentPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '85%' }}
        className='messageStyle'
      >
        {value === index && <Box >{children}</Box>}
      </div>
    );
  }
  
  TabContentPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (

    <Box
      sx={{ bgcolor: 'background.paper', display: 'flex', height: 500 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '15%' }}
      >
        {Object.keys(conversationList).map((key, index) => (
          <Tab key={index} label={conversationList[key]} />
        ))}
      </Tabs>
      {Object.keys(conversationList).map((key, index) => (
        <TabContentPanel value={value} index={index} variant="scrollable" overflow='auto' height='500px' >
          {messageList.map((message) => {
            if (key == message.recipientId ) {
              return (
                <div key={message.id} >
                <p className="sentMessages"> {message.content} </p>
                <p className="sentInfo"> Sent: {message.sentAt} </p>
                </div>
              )
            } else if (key == message.senderId) {
              return (
                <div key={message.id} >
                <p className="recievedMessages" > {message.content} </p>
                <p className="recievedInfo"> Recieved: {message.sentAt} </p>
                </div>
              )
            }
          }
          )}
          <Box className="messageInput">
            <TextField id="message-field" label="Type your message here" variant="outlined" ></TextField>
            <Button id="send-button" variant='contained' color='success' onClick={() => {handleSearch(key, document.getElementById("message-field").value)}}>Send</Button>
          </Box>
        </TabContentPanel>
      ))}
        {/* <div>
            <TextField
              id="message-field"
              label="Search"
              variant="outlined"
            />
          </div>
          <div>
            <Button variant="contained" onClick={() => handleSearch(interlocutorId)} style={{
                  }}>
              Search
            </Button>
          </div> */}
    </Box>
  );

};

export default MessageInbox
