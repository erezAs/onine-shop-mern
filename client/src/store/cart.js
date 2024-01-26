import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        products:[],
        quantity: 0,
        total:0
    },
    reducers:{
        addProduct:(state, action) =>{
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity
            return state
        },
        updateProduct:(state, action) =>{
            const {sku,color,size} = action.payload
            //mapping the changes on cart
            state.products.map((item) => {
                if (sku === item.sku && color === item.color && size === item.size){
                    item.quantity += action.payload.quantity;
                    state.total += item.price * action.payload.quantity
                }
                return item
              }); 
            return state
        }
    }
})

export const {addProduct,updateProduct} = cartSlice.actions;
export default cartSlice.reducer




