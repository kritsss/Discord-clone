import React from 'react'
import "./ChatHeader.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import { Send } from '@mui/icons-material';



function ChatHeader({ channelName }) {
  return (
    <div className='chat-header'>
      <div className='chat-headerLeft'>
        <h3>
            <span className='chat-headerHash'>
                #
            </span>
            {channelName}
        </h3>
      </div>
      <div className='chat-headerRight'>
        <NotificationsIcon />
        <EditLocationAltIcon />
        <PeopleAltIcon />

        <div className='chat-headerSearch'>
            <input placeholder='Search' />
            <SearchIcon />
        </div>
        <SendIcon />
        <HelpIcon />

      </div>
    </div>
  )
}

export default ChatHeader
