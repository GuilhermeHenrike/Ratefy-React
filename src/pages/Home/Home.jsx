import { useState, useEffect } from "react";
import CreateAlbumModal from "../../modal/albumModal/CreateAlbumModal";
import UpdateAlbumModal from "../../modal/albumModal/UpdateAlbumModal";
import DeleteAlbumModal from "../../modal/albumModal/DeleteAlbumModal";
import UpdateDescriptionModal from "../../modal/albumModal/UpdateDescriptionModal";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, AppBar, Toolbar, Rating, TextField } from '@mui/material'
import { allAlbum, updateAlbum, searchUsers } from "../../api";

function Home({onLogout, onProfile}) {
    const [albums, setAlbums] = useState([])
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const [onCreateModal, setOnCreateModal] = useState(false)
    const [onUpdateModal, setOnUpdateModal] = useState(false)
    const [onDeleteModal, setOnDeleteModal] = useState(false)
    const [onEditDescModal, setOnEditDescModal] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState(null)

    const fetchAlbums = async () => {
       try {
            const response = await allAlbum()
            setAlbums(response.data)
       } catch (e) {
            console.error("Failed to fetch albums", e)
       }
    }

    const handleSearchUsers = async (searchTerm) => {
        setQuery(searchTerm)

        if (!searchTerm || searchTerm.trim() === "") {
            setUsers([])
            return
        }

        try {
            const response = await searchUsers(searchTerm)
            setUsers(response.data)
        } catch (e) {
            console.error("Failed to fetch users", e)
        }
    }

    useEffect(() => {
        fetchAlbums()
    }, [])

    const openModalUpdate = (album) => {
        setSelectedAlbum(album)
        setOnUpdateModal(true)
    }

    const openModalDelete = (album) => {
        setSelectedAlbum(album.id)
        setOnDeleteModal(true)
    }

    const openModalDescEdit = (album) => {
        setSelectedAlbum(album)
        setOnEditDescModal(true)
    }

    const handleRating = async (album, newRating) => {
        try {
            const albumData = {
                coverUrl: album.coverUrl,
                title: album.title,
                artist: album.artist,
                description: album.description,
                rating: newRating
            }

            await updateAlbum(album.id, albumData)
            fetchAlbums()
        } catch(e) {
            console.error("Error updating rating", e)
        }
    }

    return (
        <>
        
        <AppBar sx={{ backgroundColor: '#53CA97' }}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Ratefy</Typography>

                <Box>
                    <TextField size="small" label="Search User" type='text' value={query} onChange={(e) => handleSearchUsers(e.target.value)}></TextField>

                    {users.length > 0 && (
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                top: '100%', 
                                left: 170, 
                                right: 170, 
                                backgroundColor: 'white', 
                                '&:hover': {
                                    backgroundColor: '#f0f0f0'
                                },
                                color: 'black',
                                boxShadow: 3, 
                                borderRadius: 1, 
                            }}
                        >
                            {users.map((user) => (
                                <Box 
                                    key={user.id} 
                                    onClick={() => {
                                        console.log("User:", user);
                                        setQuery(user.username); 
                                        setUsers([]);
                                        onProfile(user.id)
                                    }}
                                >
                                    <Typography variant="body2">{user.username}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                <Button sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1f85eb' }}} color='inherit' onClick={() => setOnCreateModal(true)}>Save Album</Button>
                <Button sx={{ backgroundColor: '#c52828', '&:hover': { backgroundColor: '#e02323' } }} color='inherit' onClick={onLogout}>Logout</Button>
            </Toolbar>
        </AppBar>

        <Container sx={{ mt: 12 }}>
            <Grid container spacing={3}>
                {albums.map((album) => (
                  <Grid size={{ xs: 12, md: 6 }} key={album.id}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                            <Card
                                sx={{
                                display: "flex",
                                width: '100%',
                                minHeight: 260,
                                mb: 3,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={album.coverUrl}
                                    alt={album.title}
                                    sx={{
                                        width: 180,
                                        height: 180,
                                        objectFit: "cover",
                                        m: 2,
                                        borderRadius: 2,
                                    }}
                                ></CardMedia>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    textAlign: "center",
                                }}>
                                    <CardContent>
                                        
                                        <Typography sx={{ fontWeight: 'bold' }}>{album.title}</Typography>
                                        <Typography>{album.artist}</Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Rating 
                                                name={`album-rating-${album.id}`}
                                                value={album.rating || 0}
                                                precision={1}
                                                onChange={(event, newValue) => { handleRating(album, newValue) }}
                                            />
                                        </Box>

                                    </CardContent>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flex: 1,
                                        textAlign: "center",
                                        gap: 1.5
                                    }}>
                                        <Button size="small" color='primary' variant="contained" onClick={() => openModalDescEdit(album)}>Description</Button>
                                        <Button size="small" color='warning' variant="contained" onClick={() => openModalUpdate(album)}>Update</Button>
                                        <Button size="small" color='error' variant="contained" onClick={() => openModalDelete(album)}>Delete</Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Grid>
                ))}

            </Grid>
        </Container>

        <CreateAlbumModal isOpen={onCreateModal} onClose={() => { setOnCreateModal(false); fetchAlbums() }} />
        <UpdateAlbumModal isOpen={onUpdateModal} onClose={() => { setOnUpdateModal(false); fetchAlbums() }} id={selectedAlbum?.id} album={selectedAlbum}/>
        <DeleteAlbumModal isOpen={onDeleteModal} onClose={() => { setOnDeleteModal(false); fetchAlbums() }} id={selectedAlbum}/>
        <UpdateDescriptionModal isOpen={onEditDescModal} onClose={() => { setOnEditDescModal(false); fetchAlbums() }} id={selectedAlbum?.id} album={selectedAlbum}/>
        </>
    )
}

export default Home