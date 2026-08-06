import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
})

    // AUTH

export const signIn = (data) => {
    return api.post(`/signIn`, data)
}

export const signUp = (data) => {
    return api.post(`/signUp`, data)
}

    // ALBUM

export const allAlbum = () => {
    return api.get(`/album`)
}

export const createAlbum = (data) => {
    return api.post(`/album`, data)
}

export const updateAlbum = (id, data) => {
    return api.put(`/album/${id}`, data)
}

export const deleteAlbum = (id) => {
    return api.delete(`/album/${id}`)
}

    // DEZZER

export const searchAlbum = (query) => {
    return api.get(`/deezer/search?query=${query}`)
}