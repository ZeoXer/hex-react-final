import axios from "axios"

const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        common: {
            "Authorization": ""
        }
    }
})

export default service