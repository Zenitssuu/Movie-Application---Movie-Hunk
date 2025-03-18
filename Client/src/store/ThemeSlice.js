import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme : "light",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = (state.theme === 'light') ? 'dark' : 'light';
        }
    }
})

export default themeSlice.reducer; // to inform store

export const { setTheme } = themeSlice.actions; // for personal usage