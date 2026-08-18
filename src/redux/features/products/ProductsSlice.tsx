import { createSlice } from "@reduxjs/toolkit";
import type { INITIALSTATES } from "./ProductsType";
import { GetProductsAction } from "./ProductsService";


const initialState:INITIALSTATES = {
    products:[],
    filteredItems:[],
}

const ProductsSlice = createSlice({
    name:'ProductsSlice',
    initialState,
    reducers:{
        changefilteredItems(state , action){
            state.filteredItems = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(GetProductsAction.fulfilled , (state, action)=>{
            state.products = action.payload
        })
    }
})

export default ProductsSlice.reducer
export const {changefilteredItems} = ProductsSlice.actions