import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../Slices/authSlice'
import profileReducer from '../Slices/profileSlice'
import productReducer from '../Slices/productSlice'

const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    product : productReducer,
});

export default rootReducer