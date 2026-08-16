import { useState, useEffect } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, AppBar, Toolbar, Rating, TextField } from '@mui/material'
import { profile } from "../../api";
import ProfileDescModal from "../../modal/profileModal/ProfileDescModal";

function Profile({ returnHome, id }) {
    const [albums, setAlbums] = useState([])
    const [onProfileDesc, setOnProfileDesc] = useState(false)
    const [selectedAlbum, setSelectedAlbum] = useState(null)

    const fetchAlbums = async () => {
       try {
            const response = await profile(id)
            setAlbums(response.data)

       } catch (e) {
            console.error("Failed to fetch albums", e)
       }
    }

    useEffect(() => {
        fetchAlbums()
    }, [id])

    const openModalDesc = (album) => {
        setSelectedAlbum(album)
        setOnProfileDesc(true)
    }

    return (
        <>
        <AppBar sx={{ backgroundColor: '#53CA97' }}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>Ratefy</Typography>

                <Box>
                    <Button sx={{ border: 'solid 0.5px #ffff', '&:hover': { backgroundColor: '#3ABB83' } }} color='inherit' onClick={returnHome}>Main Page</Button>
                </Box>

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

                                    </CardContent>

                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Rating 
                                                name={`album-rating-${album.id}`}
                                                value={album.rating || 0}
                                                precision={1}
                                                readOnly
                                            />
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flex: 1,
                                        textAlign: "center",
                                        gap: 1.5
                                    }}>
                                        <Button size="small" variant="contained" onClick={() => openModalDesc(album)}>Description</Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                    </Grid>
                ))}

            </Grid>
        </Container>

        <ProfileDescModal isOpen={onProfileDesc} onClose={() => { setOnProfileDesc(false); fetchAlbums() }} id={selectedAlbum?.id} album={selectedAlbum}/>
        </>
    )

}

export default Profile