import { useState } from "react";
import { signIn } from "../../api";

function Login() {
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

        } catch(e) {
            const error = e.response?.data || 'Error: could not connect to the API'
            setMessage(`Error: ${error}`)
        }
    }

    return (
        <>
        
        
        
        </>
    )

}

export default Login