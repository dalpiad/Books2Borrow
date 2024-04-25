import { React, useState, useEffect } from 'react';
import { useQuery } from "react-query";
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
  const [value, setValue] = useState(0);

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
  

  const { data: messageList, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/api/messages/all`, {
          headers: {'Authorization': `${authHeader}`}
        })
      return response.data;
    },
    queryKey: ["messageList"]
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    let message = document.getElementById("message-field").value;
    let interlocutorId = document.getElementById("message-recipient").value;
    event.preventDefault(); 
    await axios.post(
      `http://localhost:8080/api/messages/send`, {
        "recipientId": interlocutorId,
        "content": message
      }, {
        headers: {'Authorization': `${authHeader}`}
      })
      document.getElementById("message-field").value = '';
      await refetch();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <Box sx={{maxHeight: 500, overflow: 'auto', minWidth: '85%'}}>
        {Object.keys(conversationList).map((key, index) => (
          <TabContentPanel value={value} index={index} variant="scrollable" key={key+index}  >
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
            })}
            <form onSubmit={handleSubmit}>
            <Box className="messageInput">
              <TextField id="message-field" label="Type your message here" variant="outlined" />
              <input id="message-recipient" type="hidden" value={key} /> 
              <Button id="send-button" variant='contained' color='success' type="submit" >Send</Button>
            </Box>
            </form>
          </TabContentPanel>
        ))}
      </Box>
    </Box>
  );

};

export default MessageInbox
