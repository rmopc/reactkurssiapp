import axios from "axios"

//const baseUrl = "https://localhost:44375/api/products" //läppäri
const baseUrl = "https://localhost:7229/api/products" //pöytäkone

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newProduct => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newProduct, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (id, object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${id}`, object, config)
}

// Tsekkaapa customerista noi token-hommat jos tarvis
export default { getAll, create, remove, update, setToken }