import { useState, useEffect } from "react"
import { updateAlbum } from "../../api"

function UpdateAlbumModal({isOpen, onClose, id, album}) {
    const [message, setMessage] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setCoverUrl(album.coverUrl)
        setTitle(album.title)
        setArtist(album.artist)
        setDescription(album.description)
    }, [isOpen, album])

    const editAlbum = async (e) => {
        e.preventDefault()

        const albumData = {
            coverUrl: coverUrl,
            title: title,
            artist: artist,
            description: description
        }

        try {
            const result = await updateAlbum(id, albumData)
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

export default UpdateAlbumModal