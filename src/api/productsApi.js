import axios from "axios"

// const API_URL = "http://127.0.0.1:8000/api/v1/products/"
const API_URL = `${process.env.REACT_APP_API_URL}/products/`;

export async function getProducts(search, ordering){
    const response = await axios.get(API_URL,{
        params:{
            search: search,
            ordering: ordering,
        }
    })

    return response.data.results
}

export async function getProduct(id){
    const response = await axios.get(`${API_URL}${id}/`)
    return response.data
}