import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let initialState = {
    productList: [],
    cartItem: []
}
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action)=>{
            // console.log(action);
            state.productList = [...action.payload];
        },
        addCartItems: (state, action)=>{
            const check = state.cartItem.some(el => el._id === action.payload._id);
            console.log(check)

            if(check){
                toast("Already added item in Cart")
            }else{
           toast("One Item Added to the cart Succesfully..")

                const total  = action.payload.price
                state.cartItem = [...state.cartItem, {...action.payload, qty: 1, total: total}]
            }
         
         
        },
        deleteCartItems: (state, action)=>{
           toast("One Item Deleted")
           const index = state.cartItem.findIndex((el)=> el._id === action.payload)
           state.cartItem.splice(index, 1)
        },
        increaseQty: (state, action)=>{
            const index = state.cartItem.findIndex((el)=> el._id === action.payload);
           let qty =  state.cartItem[index].qty
           let qtyInc = ++qty
          state.cartItem[index].qty = qtyInc
          const price = state.cartItem[index].price;
          const total = price * qtyInc
          state.cartItem[index].total = total

        },
        decreaseQty: (state, action)=>{
            const index = state.cartItem.findIndex((el)=> el._id === action.payload);
            let qty =  state.cartItem[index].qty
            if(qty > 1){
                let qtyInc = --qty
          state.cartItem[index].qty = qtyInc
          const price = state.cartItem[index].price;
          const total = price * qtyInc
          state.cartItem[index].total = total
            }
        }
    }
})


export const {setDataProduct, addCartItems, deleteCartItems, increaseQty, decreaseQty} = productSlice.actions;

export default productSlice.reducer;