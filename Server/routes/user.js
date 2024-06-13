import express from "express"
import { login, sendOtp, signup } from "../controllers/Auth.js"
import { contactUs } from "../controllers/Contact.js";
import { auth } from "../middleware/auth.js";
import { deleteAccount, getProfileData, updateDisplayPicture, updateProfile } from "../controllers/UpdateProfile.js";
import { changePassword } from "../controllers/UpdateProfile.js";
import { resetPasswordToken } from "../controllers/ResetPassword.js";
import { resetPasswordUpdate } from "../controllers/ResetPassword.js";

const router = express.Router()

router.post("/sendotp",sendOtp);
router.post("/signup",signup)
router.post("/login", login)
router.post("/contactus",contactUs)
router.put("/updateprofile",auth,updateProfile)
router.put("/changepassword",auth,changePassword)
router.post("/resetpasswordtoken",resetPasswordToken)
router.post("/resetpassword",resetPasswordUpdate)
router.delete("/deleteaccount",auth,deleteAccount)
router.put("/updatedisplayimage",auth,updateDisplayPicture)
router.get("/getprofiledata",auth,getProfileData)

export default router;