import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  State: "State",
  City: "City",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.State = action.payload;
    },
    setCity:(state,action)=>{
      state.City = action.payload;
    },
    removeLocation: (state, action) => {
      (state.City = "City"), (state.State = "State");
    },
  },
});

export const { setState,setCity, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
