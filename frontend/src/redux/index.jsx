import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the reducer from userSlice
import productSliceReducer from './productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // Use the reducer from userSlice
    product: productSliceReducer
  },
});
