import React from 'react'
import {MovieCard} from "../index.js"

function BestMovies({movie}) {
    return (
        <div>
            <MovieCard movie={movie}/>  
        </div>
    )
}

export default BestMovies
