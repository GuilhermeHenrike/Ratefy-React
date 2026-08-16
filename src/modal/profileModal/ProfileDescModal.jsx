import { Dialog, DialogContent, DialogActions, Button, TextField } from '@mui/material'
function ProfileDescModal({ isOpen, onClose, album }) {
    if (!album) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
                
            <DialogContent>
                    <TextField label="Description" multiline rows={4}
                        fullWidth value={album.description || "No description provided."}
                        InputProps={{ readOnly: true }}></TextField>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
        )
    }

export default ProfileDescModal