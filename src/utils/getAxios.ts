import axios from 'axios'

export const getAxios = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        formSerializer: { indexes: null },
        withCredentials: process.env.NODE_ENV !== 'production',
    })

    axiosInstance.interceptors.request.use(config => {
        config.headers['accept-language'] = 'ro'
        return config
    })

    return axiosInstance
}
