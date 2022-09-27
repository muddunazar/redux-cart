import { createSlice } from "@reduxjs/toolkit";
const initialToggleState = {
    show: true,
}
const initialToggleSlice = createSlice({
    name: 'toggler',
    initialState: initialToggleState,
    reducers: {
        toggle(state) {
            state.show = !state.show
        }
    }
})
export const toggleActions = initialToggleSlice.actions;

export default initialToggleSlice.reducer;