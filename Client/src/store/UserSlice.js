import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated : false,
    userData : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true,
            state.userData = action.payload
        },
        logout: (state, action) => {
            state.isAuthenticated = false,
            state.userData = null
        },
        update: (state, action) => {
            state.userData = action.payload
        }
    }
})

export default userSlice.reducer; // to inform store

export const { login, logout , update} = userSlice.actions; // for personal usage