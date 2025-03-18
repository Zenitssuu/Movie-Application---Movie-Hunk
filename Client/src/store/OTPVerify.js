import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOTPVerified : false,
}

const otpSlice = createSlice({
    name: "OTP",
    initialState,
    reducers: {
        setVerification: (state, action) => {
            state.isOTPVerified = true;
        },
        unsetVerification: (state, action) => {
            state.isOTPVerified = false;
        }
    }
})

export default otpSlice.reducer

export const { setVerification, unsetVerification } = otpSlice.actions;