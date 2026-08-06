import { useState } from "react"
import { deleteAlbum } from "../../api"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function DeleteAlbumModal({isOpen, onClose, id}) {
    const [message, setMessage] = useState('')

    const delAlbum = async () => {

        try {
            const result = await deleteAlbum(id)
            setMessage(`Success: ${result.data}`)

            setTimeout(() => {
                setMessage('')
                onClose()
            }, 2000)

        } catch(e) {
            const error = e.response?.data || 'Error: could not connect to the API'
            setMessage(`Error: ${error}`)
        }

    }

    return(
        <>
        
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Delete Album</DialogTitle>
            <DialogContent>
                {message ? (
                    <Typography>{message}</Typography>
                ) : (
                    <Typography>Are you sure you want to delete this album?</Typography>
                    )}
            </DialogContent>
            <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={delAlbum} color="error" variant="contained">Confirm</Button>
            </DialogActions>
        </Dialog>

        </>
    )

}

export default DeleteAlbumModal