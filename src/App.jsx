import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import './App.css'
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';

function App() {
  const [activeScreen, setActionScreen] = useState('login')
  return (
    <>

      {activeScreen !== 'home' && (
      <AppBar position="static" sx={{ backgroundColor: '#53CA97' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>Ratefy</Typography>
          <Button sx={{ hover: { backgroundColor: '#3ABB83' } }} color="inherit" onClick={() => setActionScreen('login')}>Login</Button>
          <Button sx={{ hover: { backgroundColor: '#3ABB83' } }} color="inherit" onClick={() => setActionScreen('register')}>Register</Button>
        </Toolbar>
      </AppBar>
    )}

    <main>
      
      {activeScreen === "login" && <Login onLoginOk={() => setActionScreen('home')} />}
      {activeScreen === "register" && <Register onRegisterOk={() => setActionScreen('login')}/>}
      {activeScreen === "home" && <Home onLogout={() => setActionScreen('login')} />}
    </main>

    </>
  )
}

export default App
