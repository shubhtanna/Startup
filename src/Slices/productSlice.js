import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product:null,
  editProduct:false,
}

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers: {
    setProduct: (state,action) => {
      state.product = action.payload
    },
    setEditProduct: (state,action) => {
      state.editProduct = action.payload
    },
    resetProductState: (state) => {
      state.product = null
      state.editProduct = null
    },
  },
})

export const {setProduct,setEditProduct,resetProductState} = productSlice.actions

export default productSlice.reducer