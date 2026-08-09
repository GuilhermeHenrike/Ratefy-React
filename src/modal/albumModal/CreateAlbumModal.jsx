import { useState } from "react"
import { createAlbum, searchAlbum } from "../../api"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

function CreateAlbumModal({isOpen, onClose}) {
    const [message, setMessage] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async (query) => {
        setSearchQuery(query)
        if (query.length > 1) {
            try {
                const result = await searchAlbum(query)
                setSearchResults(result.data)
            } catch (e) {
                console.error("Deezer error", e)
            }
        } else {
            setSearchResults([])
        }
    }

    const handleSelectedAlbum = (album) => {
        setCoverUrl(album.cover_url)
        setTitle(album.title)
        setArtist(album.artistName)
        setSearchResults([])
        setSearchQuery('')
    }

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
            setMessage(`${result.data}`)

            setCoverUrl('')
            setTitle('')
            setArtist('')
            setDescription('')

            setTimeout(() => {
                setMessage('')
                onClose()
            }, 2000)

        } catch(e) {
            const error = e.response?.data || 'Could not connect to the API'
            setMessage(`${error}`)
        }

    }

    return (
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Save Album</DialogTitle>
            <DialogContent>
                {message && (<Typography>{message}</Typography>)}
                <form id="confirmed-save" onSubmit={newAlbum}>

                    <TextField margin="normal" fullWidth label="Search on Deezer" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                    
                        {searchResults.length > 0 && (
                            <ul>
                                {searchResults.map((album, index) => (
                                    <li key={index} onClick={() => handleSelectedAlbum(album)}>
                                        <img src={album.cover_url} alt={album.title}></img>
                                        <div><Typography><strong>{album.title} - {album.artistName}</strong></Typography></div>
                                    </li>
                                ))} 
                            </ul>
                        )}

                    <TextField margin="normal" fullWidth label="Cover" type='text' value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Title" type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Artist" type='text' value={artist} onChange={(e) => setArtist(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Description" type='text' value={description} multiline rows={4} onChange={(e) => setDescription(e.target.value)} />
                </form>
            </DialogContent>
            <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="confirmed-save" variant="contained">Confirm</Button>
            </DialogActions>
        </Dialog>
    
        </>
    )


}

export default CreateAlbumModal