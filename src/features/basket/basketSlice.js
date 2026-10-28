import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: [],
  reducers: {
    increaseQuantity: (state, action) => {
      const product = state.find((item) => item.id === action.payload);
      if (product) {
        product.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      const product = state[index];
      if(product.quantity>1){
        product.quantity--;
      }
      else {
        state.splice(index, 1);
      }
    },
    addToBasket: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { increaseQuantity, decreaseQuantity, addToBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
