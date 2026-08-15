import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import './App.css'
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';

function App() {
  const [activeScreen, setActiveScreen] = useState('login')
  const [selectedUserId, setSelectedUserId] = useState(null)

  return (
    <>

    {activeScreen !== 'home' && activeScreen !== 'profile' && (
      <AppBar position="static" sx={{ backgroundColor: '#53CA97' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>Ratefy</Typography>
          <Button sx={{ hover: { backgroundColor: '#3ABB83' } }} color="inherit" onClick={() => setActiveScreen('login')}>Login</Button>
          <Button sx={{ hover: { backgroundColor: '#3ABB83' } }} color="inherit" onClick={() => setActiveScreen('register')}>Register</Button>
        </Toolbar>
      </AppBar>
    )}

    <main>
      
      {activeScreen === "login" && <Login onLoginOk={() => setActiveScreen('home')} />}
      {activeScreen === "register" && <Register onRegisterOk={() => setActiveScreen('login')}/>}

      {activeScreen === "home" && (
        <Home onLogout={() => {
           setActiveScreen("login")
        }} onProfile={(id) => {
          setSelectedUserId(id)
          setActiveScreen("profile")
        }}
        />
    )}

      {activeScreen === "profile" && <Profile id={selectedUserId} returnHome={() => setActiveScreen('home')}/>}

    </main>

    </>
  )
}

export default App