import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/authSlice";
import { setUser } from "../../Slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { contactus } from "../apis";

const { CONTACTUS_API } = contactus;

export function contactUs(email, message) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", CONTACTUS_API, {
        email,
        message,
      });

      console.log("CONTACTUS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Message Send Successfully...");
    } catch (error) {
      console.log("CONTACTUS API ERROR............", error);
      toast.error("Message not send");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
