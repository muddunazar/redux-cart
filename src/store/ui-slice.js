import { createSlice } from "@reduxjs/toolkit";
const initialToggleState = {
    show: true,
    notification: null
}
const initialToggleSlice = createSlice({
    name: 'toggler',
    initialState: initialToggleState,
    reducers: {
        toggle(state) {
            state.show = !state.show
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        }
    }
})
export const toggleActions = initialToggleSlice.actions;

export default initialToggleSlice.reducer;