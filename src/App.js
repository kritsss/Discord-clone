import React, { useEffect } from 'react';
import './App.css';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import {login, logout} from './features/userSlice';

function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectUser);

  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //the user is logged in
        dispatch(
          login({
          photo: authUser.photoURL,
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
        }));
      } else{
        //the user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch])

  return (
    // BEM naming convention
    <div className="app">
      {user ? (
        <>
          <SideBar />
          <ChatWindow />
        </>
      ) : (
        <Login />
      )} 
      
    </div>
  );
}

export default App;
