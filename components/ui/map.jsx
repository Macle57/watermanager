import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
require('dotenv').config();
const myApiKey = process.env.mapsapi;

export default function MapComponent () {
    console.log("Hello")
    console.log(myApiKey);
    
    return(
    <APIProvider apiKey={myApiKey}>
        <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 22.54992, lng: 0}}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        />
    </APIProvider>
    )
}