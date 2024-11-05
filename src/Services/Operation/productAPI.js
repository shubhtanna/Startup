import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { product } from "../apis";
import { setLoading } from "../../Slices/authSlice"
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"

const { ADD_PRODUCT_API, UPDATE_PRODUCT_API, DELETE_PRODUCT_API, GET_ALL_BRAND_API, GET_ALL_CATEGORY_API,
    GET_ALL_MY_PRODUCTS, ADD_PRICE, GET_ALL_INTERESTED_SHOP, GET_FULL_DETAILS_OF_PRODUCT
} = product


export const getAllCategory = async (token) => {
    let result = []
    console.log(token)
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/individual/getallcategory',
            headers: { authorization: `Bearer ${token}` },
        });
        console.log("GET_ALL_CATEGORY_API API RESPONSE............", res)
        if (!res?.data?.success) {
            throw new Error("Could Not Fetch Categories")
        }
        result = res?.data?.data
    } catch (error) {
        console.log("GET_ALL_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

export const getAllBrand = async (token) => {
    let result = []
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/individual/getallbrand',
            headers: { authorization: `Bearer ${token}` },
        });
        console.log("GET_ALL_BRAND_API API RESPONSE............", res)
        if (!res?.data?.success) {
            throw new Error("Could Not Fetch Brands")
        }
        result = res?.data?.data
    } catch (error) {
        console.log("GET_ALL_BRAND_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

export const addProduct = async (data, token, navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    console.log("tOKEN.....", token)
    try {
        const response = await apiConnector("POST", ADD_PRODUCT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
        )
        console.log("ADD_PRODUCT_API RESPONSE.....", response)

        if (!response?.data?.success) {
            throw new Error("Could not Add Course Details")
        }
        toast.success("Product added successfully")
        result = response?.data?.data
        navigate("/dashboard/my-products")
    } catch (error) {
        console.log("ADD_PRODUCT_API ERROR.....", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const editProductDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {

        const response = await apiConnector('PUT',
            UPDATE_PRODUCT_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("EDIT PRODUCT API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Product Details");
        }

        toast.success("Product Details Updated Successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error);
        toast.error(error.message);
    }


    toast.dismiss(toastId);
    return result;
}

export const deleteProduct = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE PRODUCT API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Product");
        }
        toast.success("Product Deleted");
    } catch (error) {
        console.log("DELETE PRODUCT API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);

}

export const getAllProductsOfUser = async (token) => {
    let result = [];
    try {

        const res = await axios({
            method: 'get',
            url: BASE_URL + '/individual/getallproductsofuser',
            headers: { authorization: `Bearer ${token}` },
        });

        console.log("GET_ALL_MY_PRODUCTS..............", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all my products")
        }

        result = res?.data?.data?.products

    } catch (error) {
        console.log("GET_ALL_MY_PRODUCTS.............", error);
    }
    return result
}

export const addPrice = async (data, token, navigate) => {
    console.log("DATa..........DAta..............", data)
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const res = await axios.post("http://localhost:5000/api/v1/vendor/addprice", data,
            { headers: { Authorization: `Bearer ${token}` } }
        )

        console.log("ADD_PRICE............", res);

        result = res?.data?.data;
        navigate("/dashboard/intrested-shopkeeper-products")
    } catch (error) {
        console.log("ADD_PRICE.........", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};

export const InterestedProductOfIndividual = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + '/individual/allinterestedproductsofuser',
            headers: { authorization: `Bearer ${token}` },
        });

        console.log("allinterestedproductsofuser..............", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all interested products of user")
        }

        toast.success("Interested Products get successfully");

        result = res?.data?.data;
    } catch (error) {
        console.log("allinterestedproductsofuser....................", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const getAllInterestedVendors = async (token, productId) => {
    let result = [];
    console.log("PRODUCT ID", productId[0]);
    // const id = JSON.stringify(productId);
    // console.log("ID,......................",id)
    const toastId = toast.loading("Loading...");
    console.log(BASE_URL + `/individual/allinterestedshopekeepers/${productId}`)
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + `/individual/allinterestedshopekeepers/${productId}`,
            data: { productId },
            headers: { authorization: `Bearer ${token}` },
        });

        console.log("allinterestedshopekeepers..............", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all interested shopkeeper of Product")
        }

        toast.success("Interested Products get successfully");

        result = res?.data?.data;
        console.log("RESULT..........", result);
    } catch (error) {
        console.log("allinterestedshopekeepers....................", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const getAllDetailsOfProduct = async (token, productId) => {
    const toastId = toast.loading('Loading...');
    let result = null
    try {
        const response = await apiConnector('POST',
            GET_FULL_DETAILS_OF_PRODUCT,
            {
                productId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("GET_FULL_DETAILS_OF_PRODUCT API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data

    } catch (error) {
        console.log("Product_Full API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}
