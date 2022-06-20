import React from 'react'
import "./Message.css";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

function Message({timestamp, user, message}) {
  return (
    <div className='message'>
      <AccountCircleTwoToneIcon fontSize='large'/>
      <div className='message-info'>
          <h4>{user.displayName}
              <span className='message-timestamp'>
                  {new Date(timestamp?.toDate()).toUTCString()}
              </span>
          </h4>
          <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
