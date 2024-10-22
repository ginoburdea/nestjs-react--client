import axios from 'axios'

export const getAxios = () => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        formSerializer: { indexes: null },
        withCredentials: process.env.NODE_ENV !== 'production',
    })
}
