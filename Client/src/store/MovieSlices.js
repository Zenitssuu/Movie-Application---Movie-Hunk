import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:[]
}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        setMovies:(state,action)=>{
            state.movies = action.payload;
        },
        deleteMovie:(state,action)=>{
            state.movies.filter(movies => movies._id !== action.payload);
        }
    }
}) 

export const {setMovies,deleteMovie} = movieSlice.actions;

export default movieSlice.reducer