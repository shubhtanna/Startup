import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { vendor } from "../apis";
import axios from "axios";


const BASE_URL = "http://localhost:4000/api/v1"

const {
    GET_ALL_VENDOR,
    GET_ALL_PRODUCTS
} = vendor

export const getShopbyCity = async(token) => {
    let result = [];
    try {
        // const response = await apiConnector("GET", GET_ALL_VENDOR,{
        //     Authorization: `Bearer ${token}`
        // })

        const res = await axios({
            method: 'get',
            url: BASE_URL + '/individual/getshopbycity',
            headers: { authorization: `Bearer ${token}` },
        });

        console.log("GET_ALL_VENDOR..................",res);

        if (!res?.data?.success) {
            throw new Error("Could not get all shopkeeper")
        }
        result = res?.data?.data
    } catch(error) {
        console.log("GET_ALL_VENDOR.............",error);
    }
    return result
}

export const getAllProductsByCity = async(token) => {
    let result = [];
    try{
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/vendor/getallproducts',
            headers: { authorization: `Bearer ${token}` },
        });
        console.log("GET_ALL_PRODUCTS..........",res);

        if (!res?.data?.success) {
            throw new Error("Could not get all products")
        }

        result = res?.data?.data
    } catch(error) {
        console.log("GET_ALL_PRODUCTS...............",error)
    }
    return result
}