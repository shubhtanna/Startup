import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { product } from "../apis";
import { setLoading } from "../../Slices/authSlice"
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1"

const { ADD_PRODUCT_API, UPDATE_PRODUCT_API, DELETE_PRODUCT_API, GET_ALL_BRAND_API, GET_ALL_CATEGORY_API,
    GET_ALL_MY_PRODUCTS, ADD_PRICE , GET_ALL_INTERESTED_SHOP
} = product



export const getAllCategory = async (token) => {
    let result = []
    console.log(token)
    try {
        // const response = await apiConnector("GET",GET_ALL_CATEGORY_API,{
        //     Authorization: `Bearer ${token}`
        // })
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
        // const response = await apiConnector("GET",GET_ALL_BRAND_API,{
        //     Authorization: `Bearer ${token}`
        // })

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

// export function addProduct(data,token) {
//     let result = null;
//     console.log(token);
//     const toastId = toast.loading("Loading...")
//     return async () => {
//         console.log(data);
//         try {
//             // console.log("START",invoiceImage);
//             const response = await apiConnector("POST", ADD_PRODUCT_API, {
//                data
//             }, 
//                 {"Contect-Type":"multipart/form-data",
//                 Authorization: `Bearer ${token}`}
//             )

//             console.log("ADD PRODUCT API RESPONSE............", response)

//             if (!response.data.success) {
//                 throw new Error(response.data.message)
//             }

//             toast.success("Product Add Successfully")
//             result = response?.data?.data;
//         } catch (error) {
//             console.log("PRODUCT ADD ERROR............", error)
//             toast.error("Product is not added")
//         }
//         toast.dismiss(toastId)
//         return result;
//     }
// }

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

// export const addPrice = async (token, data) => {
//     let result = null;
//     const toastId = toast.loading("Loading...")
//     try {

//         const res = await apiConnector("POST", ADD_PRICE, data,
//             { Authorization: `Bearer ${token}` }
//         );

//         console.log("ADD_PRICE............", res);

//         if (!res?.data?.success) {
//             throw new Error("Could not add Intrest")
//         }

//         result = res?.data?.data;
//     } catch (error) {
//         console.log("ADD_PRICE.........", error);
//         toast.error(error.message)
//     }
//     toast.dismiss(toastId);
//     return result
// }
 // Ensure this path is correct

export const addPrice = async (data,token,navigate) => {
console.log("DATa..........DAta..............",data)
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    // const res = await apiConnector("POST", "/dashboard/add-price", data, {
    //   Authorization: `Bearer ${token}`
    // });

    const res = await axios.post("http://localhost:4000/api/v1/vendor/addprice", data,
       {headers: {Authorization: `Bearer ${token}`}}
    )

    console.log("ADD_PRICE............", res);

    // if (!res?.data?.success) {
    //   throw new Error("Could not add Interest");
    // }

    result = res?.data?.data;
    navigate("/dashboard/intrested-shopkeeper-products")
  } catch (error) {
    console.log("ADD_PRICE.........", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const InterestedProductOfIndividual = async(token) => {
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

        result = res?.data?.data?.products;
    } catch(error) {
        console.log("allinterestedproductsofuser....................",error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const getAllInterestedVendors = async(token,productId) => {
    let result = [];
    console.log("PRODUCT ID",productId[0]);
    // const id = JSON.stringify(productId);
    // console.log("ID,......................",id)
    const toastId = toast.loading("Loading...");
    console.log(BASE_URL + `/individual/allinterestedshopekeepers/${productId}`)
    try {
        const res = await axios({
            method: 'get',
            url: BASE_URL + `/individual/allinterestedshopekeepers/${productId}`,
            data:{productId},
            headers: { authorization: `Bearer ${token}` },
        });

        console.log("allinterestedshopekeepers..............", res);

        if (!res?.data?.success) {
            throw new Error("Could not get all interested shopkeeper of Product")
        }

        toast.success("Interested Products get successfully");

        result = res?.data?.data?.estimatedPrice;
        console.log("RESULT..........",result);
    } catch (error) {
        console.log("allinterestedshopekeepers....................",error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}


