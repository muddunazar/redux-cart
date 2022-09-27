import { createSlice } from "@reduxjs/toolkit"
import { toggleActions } from "./ui-slice";

const initialCart = {
    items: [],
    totalQuantity: 0,
    changed: false,
    // totalAmount: 6
}
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        // increment(state) {
        //     state.totalQuantity++;
        //     state.totalAmount += 6
        // },
        // decrement(state) {
        //     state.totalQuantity--;
        //     state.totalAmount -= 6
        // }
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                state.changed = true;

                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;