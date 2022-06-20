import React, { useEffect, useState } from 'react';
import "./SideBar.css";
import SidebarChannel from "./SidebarChannel.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';


function SideBar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect( () => {
    db.collection('channels').onSnapshot(snapshot => (
      setChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        channel: doc.data(),
      })))
    ));
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Enter the channel name');

    if(channelName){
      db.collection('channels').add({
        channelName : channelName,
      });
    }
  };

  return (
    <div className='sidebar'>

        <div className="sidebar-top">
          <h3>Kerry's Discord</h3>
          <ExpandMoreIcon />
        </div>

        <div className="sidebar-channels">
          <div className="sidebar-channels-header">
            <div className="sidebar-header">
              <ExpandMoreIcon />
              <h4>Text channels</h4>
            </div>

            <AddIcon onClick={handleAddChannel}
            className="sidebar-addChannel" />
          </div>
          
          <div className="sidebar-channelsList">
            {channels.map(({id, channel}) => (
              <SidebarChannel key={id} id={id} channelName={channel.channelName} />
            ))}
          </div>
        </div>

        <div className='sidebar-voice'>
          <SignalCellularAltIcon className='sidebar-voiceIcon' fontSize='large' />
          <div className='sidebar-voiceInfo'>
            <h3>Voice Connected</h3>
            <p>Stream</p>
          </div>

          <div className='sidebar-voiceIcons'>
            <InfoIcon />
            <CallIcon />
          </div>
        </div>
      

      <div className='sidebar-profile'>
        <AccountCircleIcon cursor='pointer' onClick={()=> auth.signOut()} fontSize='large' />
        <div className='sidebar-profileInfo'>
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 6)}</p>
        </div>

        <div className="sidebar-profileIcons">
          <MicIcon />
          <HeadphonesIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default SideBar;
