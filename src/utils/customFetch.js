import axios from "axios";
const url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit'


const customFetch = axios.create({
    baseURL:url
})

export default customFetch