import { Axios } from 'axios';

export const serverApi = new Axios({
    baseURL: 'http://localhost:5173/api'
})
