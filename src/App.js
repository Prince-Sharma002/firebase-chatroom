import { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import {auth} from './firebase-config'
import { Auth } from './components/Auth';
import { Chat } from './components/Chat';
import './App.css';

import Cookies from "universal-cookie";

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth){
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }

  return (
    <>
      {room ? 
        <Chat room={room}/>
        : 
        <div className='room'>
          <label>Enter Room Name:</label>
          <input type="text" ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div> 
      }

      <div className="sign-out">
        <button onClick={signUserOut}>Sign out</button>
      </div>

    </>
    )
}

export default App;
