import axios from "axios"

const fetchData = async (api) => {
    const response = await axios.get(api)
    return response.data.hits
}

export default fetchData

