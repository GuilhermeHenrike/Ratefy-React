import { useState, useEffect } from 'react'
import { updateAlbum } from '../../api'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

function UpdateDescriptionModal({ isOpen, onClose, id, album }) {
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (album) {
        setDescription(album.description)
        }
    }, [isOpen, album])

    const editDesc = async (e) => {
        e.preventDefault()

        const albumData = {
            title: album.title,
            artist: album.artist,
            coverUrl: album.coverUrl,
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
        
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Album Description</DialogTitle>
            <form onSubmit={editDesc}>
                <DialogContent>
                    <TextField label="Description" multiline rows={4} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
                    {message && (<Typography>{message}</Typography>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </form>
        </Dialog>

        </>
    )

}

export default UpdateDescriptionModal