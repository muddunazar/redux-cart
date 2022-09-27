import toggleReducer from './ui-slice';
import cartReducer from './cart-slice';
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
    // reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
    reducer: { toggler: toggleReducer, cart: cartReducer },

});
export default store;