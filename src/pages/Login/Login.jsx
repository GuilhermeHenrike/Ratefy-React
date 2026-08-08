import { useState } from "react";
import { signIn } from "../../api";
import { Container, Box, Paper, Button, Typography, TextField } from '@mui/material';

function Login({onLoginOk}) {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSignIn = async (e) => {
        e.preventDefault()

        const data = {
            username: username,
            password: password
        }

        try {
            const result = await signIn(data)
            setMessage(`Success: ${result.data}`)

            setTimeout(() => {
                setMessage('')
                onLoginOk()
            }, 2000)

        } catch(e) {
            const error = e.response?.data || 'Error: could not connect to the API'
            setMessage(`Error: ${error}`)
        }
    }

    return (
        <>
        
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Login</Typography>
                {message && (<Typography component="h4">{message}</Typography>)}

                <Box sx={{ width: '100%', mt: 1 }}>
                    <form id="submit-login" onSubmit={onSignIn}>
                        <TextField margin="normal" fullWidth label="Username" type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField margin="normal" fullWidth label="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </form>

                    <Button sx={{ backgroundColor: '#44C58D', "&:hover": { backgroundColor: '#3ABB83' } }} type="submit" form="submit-login" variant="contained">Sign In</Button>
                </Box>
            </Paper>
        </Container>

        </>
    )

}

export default Login