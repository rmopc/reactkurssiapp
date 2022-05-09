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

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`) //template-stringiksi kutsutaan tuota
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}


export default { getAll, create, remove, update }