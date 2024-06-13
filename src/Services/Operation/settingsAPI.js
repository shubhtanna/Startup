import toast from "react-hot-toast";
import { settings } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser} from "../../Slices/profileSlice";
import { logout } from "./authAPI";
import axios from "axios";


const BASE_URL = "http://localhost:4000/api/v1"

const {
    UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API,UPDATE_VENDOR_DETAILS_API
} = settings 

export function updateDisplayImage(token,formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{
                "Content-Type" : "multipart/form-data",
                Authorization: `Bearer ${token}` 
            })
            console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
            response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            // console.log(response.data.data)
            dispatch(setUser(response.data.data))
            // console.log(response.data.data)
            localStorage.setItem("user", JSON.stringify(response.data.data))
        } catch(error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token,formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT",UPDATE_PROFILE_API,formData,{
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser({...response.data.data
            }));
            localStorage.setItem("user", JSON.stringify(response.data.data))
            toast.success("Profile Updated Successfully")
        }  catch(error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("COuld Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token,formData) {
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , CHANGE_PASSWORD_API,formData,{
            Authorization: `Bearer ${token}`
        })
        console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password Changed Successfully")
    }
    catch(error) {
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteAccount(token,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization: `Bearer ${token}`
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        }
        catch(error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}

export function updateVendorDetais(token,formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            // const response = await apiConnector("PUT",UPDATE_VENDOR_DETAILS_API,formData,{
            //     "Content-Type" : "multipart/form-data",
            //     Authorization: `Bearer ${token}` 
            // })
            
            const res = await axios({
                method: 'put',
                url: BASE_URL + '/vendor/updatevendordetials',
                data:{formData},
                headers: { authorization: `Bearer ${token}` },
            });

            console.log("UPDATE_VENDOR_DETAILS_API API RESPONSE............",
            res)

            if(!res.data.success) {
                throw new Error(res.data.message)
            }
            toast.success("Vendor Detials updated successfully")
            // console.log(response.data.data)
            dispatch(setUser(res.data.data))
            // console.log(response.data.data)
        } catch(error) {
            console.log("UPDATE_VENDOR_DETAILS_API API ERROR............", error)
            toast.error("Could Not Update Vendor Details")
        }
        toast.dismiss(toastId)
    }
}