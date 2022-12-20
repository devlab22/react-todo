import React from 'react'
import { Circles } from 'react-loader-spinner';

export default function LoadingCircle(){

    return (
        <div style={{"margin": "10% 40%"}}>
            <Circles
                height="100"
                width="100"
                color="#008080"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}