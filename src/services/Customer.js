import axios from "axios"

//const baseUrl = "https://localhost:44375/api/customers" //läppäri
const baseUrl = "https://localhost:7229/api/customers" //pöytäkone

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}


export default { getAll, create }