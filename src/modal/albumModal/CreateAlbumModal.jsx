import { useState } from "react"
import { createAlbum } from "../../api"

function CreateAlbumModal({isOpen, onClose}) {
    const [message, setMessage] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')

    const newAlbum = async (e) => {
        e.preventDefault()

        const albumData = {
            coverUrl: coverUrl,
            title: title,
            artist: artist,
            description: description
        }

        try {
            const result = await createAlbum(albumData)
            setMessage(`Success: ${result.data}`)

            setCoverUrl('')
            setTitle('')
            setArtist('')
            setDescription('')

            setTimeout(() => {
                onClose()
                setMessage('')
            }, 2000)

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

export default CreateAlbumModal