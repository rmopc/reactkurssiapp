import axios from 'axios'

//const baseUrl = "https://localhost:44375/api/customers" //läppäri
//const baseUrl = "https://localhost:7229/api/authentication" //pöytäkone
const baseUrl = "https://northwindrestapi.azurewebsites.net/api/authentication" //azure

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default {authenticate}