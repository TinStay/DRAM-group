import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wefontys-default-rtdb.europe-west1.firebasedatabase.app'
})

export default instance;