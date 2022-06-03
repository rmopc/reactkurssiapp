import axios from "axios"

//const baseUrl = "https://localhost:44375/api/users" //läppäri
const baseUrl = "https://localhost:7229/api/users" //pöytäkone

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`) //template-stringiksi kutsutaan tuota
}

const update = (id, object) => {
    return axios.put(`${baseUrl}/${id}`, object)
}


export default { getAll, create, remove, update }