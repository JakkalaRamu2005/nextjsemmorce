"use client"
import { useEffect } from "react"
const error = ({error, reset}) => {

    useEffect(() => {
        console.log(error);
    }, [])
    return (
        <div>
            <h1>Error Page</h1>
            <p>Something went wrong.</p>
            <button onClick={()=>reset()}>Try Again</button>
        </div>
    )
}

export default error
