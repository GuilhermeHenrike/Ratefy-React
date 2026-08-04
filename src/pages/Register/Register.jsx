import { useState } from "react";
import { signUp } from "../../api";

function Register() {
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSignUp = async (e) => {
        e.preventDefault()

        const data = {
            username: username,
            password: password
        }

        try {
            const result = await signUp(data)
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

export default Register