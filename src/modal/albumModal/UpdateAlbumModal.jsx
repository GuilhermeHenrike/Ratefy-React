import { useState, useEffect } from "react"
import { updateAlbum } from "../../api"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

function UpdateAlbumModal({isOpen, onClose, id, album}) {
    const [message, setMessage] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (album) {
            setCoverUrl(album.coverUrl)
            setTitle(album.title)
            setArtist(album.artist)
            setDescription(album.description)
        }
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
            setMessage(`${result.data}`)

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
            <DialogTitle>Update Album</DialogTitle>
            <DialogContent>
                {message && (<Typography>{message}</Typography>)}
                <form id="confirmed-update" onSubmit={editAlbum}>
                    <TextField margin="normal" fullWidth label="Cover" type='text' value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Title" type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Artist" type='text' value={artist} onChange={(e) => setArtist(e.target.value)} />
                    <TextField margin="normal" fullWidth label="Description" type='text' value={description} multiline rows={4} onChange={(e) => setDescription(e.target.value)} />
                </form>
            </DialogContent>
            <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="confirmed-update" variant="contained">Confirm</Button>
            </DialogActions>
        </Dialog>

        </>
    )


}

export default UpdateAlbumModal