import { useState } from "react"
import { deleteAlbum } from "../../api"

function DeleteAlbumModal({isOpen, onClose, id}) {
    const [message, setMessage] = useState('')

    const delAlbum = async () => {

        try {
            const result = await deleteAlbum(id)
            setMessage(`Success: ${result.data}`)

            setTimeout(() => {
                onClose()
                setMessage('')
            }, 2000)

        } catch(e) {
            const error = e.response?.data || 'Error: could not connect to the API'
            setMessage(`Error: ${error}`)
        }

    }

    return(
        <>
        


        </>
    )

}

export default DeleteAlbumModal