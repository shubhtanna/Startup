import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { vendor } from "../apis";
import axios from "axios";



const BASE_URL = "http://localhost:5000/api/v1"

const {
    GET_ALL_VENDOR,
    GET_ALL_PRODUCTS,
    OTHER_PRICE,
    GET_INTERESTED_PRODUCT,
    EDIT_PRICE,
    DELETE_PRICE
} = vendor

export const getShopbyCity = async (token) => {
    let result = [];
    try {
        const res = await axios({
            method: 'get',
            url: `${BASE_URL}/individual/getshopbycity`,
            headers: { authorization: `Bearer ${token}` },
        });

        console.log("GET_ALL_VENDOR..................", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all shopkeeper")
        }
        result = res?.data?.data
    } catch (error) {
        console.log("GET_ALL_VENDOR.............", error);
    }
    return result
}

export const getAllProductsByCity = async (token) => {
    let result = [];
    try {
        const res = await axios({
            method: 'get',
            url: `${BASE_URL}/vendor/getallproducts`,
            headers: { authorization: `Bearer ${token}` },
        });
        console.log("GET_ALL_PRODUCTS..........", res);
        if (!res?.data?.success) {
            throw new Error("Could not get all products")
        }
        // console.log("ProductDetail",res)
        result = res?.data?.data
    } catch (error) {
        console.log("GET_ALL_PRODUCTS...............", error)
    }
    return result
}

export const allothershopkeeperprice = async (token, productId) => {
    let result = []
    try {
        console.log("productId : ", productId);
        const res = await apiConnector("GET", `${OTHER_PRICE}?productId=${productId}`, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_ALL_OTHER_PRICE..........", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all other price")
        }

        result = res?.data?.data

    } catch (error) {
        console.log("GET OTHER SHOPKEEPER PRICE....", error)
    }
    return result
}

export const getAllInterestedProducts = async (token) => {
    let result = []
    try {
        const res = await apiConnector("GET", GET_INTERESTED_PRODUCT, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET_ALL_INSTRESTED_PRODUCTS..........", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all other price")
        }

        result = res?.data?.data

    } catch (error) {
        console.log("GET_ALL_INSTRESTED_PRODUCTS....", error)
    }
    return result
}

export const editPriceOfProduct = async (token, data) => {
    let result = null;
    try {
        let res = await apiConnector('PUT', EDIT_PRICE, data, {
            Authorization: `Bearer ${token}`
        })

        console.log("EDIT PRICE.....", res);

        if (!res?.data?.success) {
            throw new Error("Could not edit the price of product")
        }
        toast.success("Product price is edited Successfully");
        result = res?.data?.data
        return result;
    }
    catch (error) {
        console.log("ERROR IN EDIT PRICE: ", error);
    }

    return result;
}

export const deletePriceOfProduct = async (token, data) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_PRICE, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE PRICE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Product");
        }
        toast.success("Estimated Price is Deleted");
    } catch (error) {
        console.log("DELETE ESTIMATED PRICE  API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);

}