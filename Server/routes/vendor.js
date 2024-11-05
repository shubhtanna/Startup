import express from "express"
import { auth, isVendor } from "../middleware/auth.js";
import { updateVendorDetails } from "../controllers/UpdateProfile.js";
import { addPrice, allOtherShopkeepersPrice, deletePrice, editPrice } from "../controllers/interestedProduct.js";
import { getAllInterestedProductsOfShopkeeper, getAllProductsByCity } from "../controllers/Vendor.js";

const router = express.Router();

router.post("/updatevendordetails", auth, isVendor, updateVendorDetails)
router.post("/addprice", auth, isVendor, addPrice)
router.put("/editprice", auth, isVendor, editPrice)
router.delete("/deleteprice", auth, isVendor, deletePrice)
router.get("/getallproducts", auth, isVendor, getAllProductsByCity)
router.get("/interestedproduct", auth, isVendor, getAllInterestedProductsOfShopkeeper); //pending
router.get("/othershopkeeperprice", auth, isVendor, allOtherShopkeepersPrice) //pending

export default router;