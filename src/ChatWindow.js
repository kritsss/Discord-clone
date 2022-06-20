import React, { useEffect, useState } from 'react'
import "./ChatWindow.css";
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message.js';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';

function ChatWindow() {

  const channelId=useSelector(selectChannelId);
  const user=useSelector(selectUser);
  const channelName=useSelector(selectChannelName);
  const [input, setInput]=useState('');
  const [messages, setMessages]=useState([]);


  useEffect(() => {

    if(channelId){
      db.collection('channels').doc(channelId).collection("messages").orderBy('timestamp').onSnapshot((snapshot) => 
      setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
    
    
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('channels').doc(channelId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };

  return (
    <div className='chat'>
        <ChatHeader channelName={channelName} />

        <div className='chat-messages'>
          {messages.map((message) => (
            <Message 
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
            /> 
          ))}

        </div>

        <div className='chat-input'>
          <AddCircleIcon />
          <form>
            <input value={input}  disabled={!channelId} onChange={e => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
            <button type='submit' disabled={!channelId} className='chat-inputButton' onClick={sendMessage}>Send Message</button>
          </form>

          <div className='chat-inputIcons'>
            <CardGiftcardIcon fontSize='large'/>
            <GifIcon fontSize='large'/>
            <EmojiEmotionsIcon fontSize='large'/>
          </div>
        </div>
      
    </div>
  )
}

export default ChatWindow
