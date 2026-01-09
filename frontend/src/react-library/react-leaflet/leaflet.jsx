import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const bangladeshDivisions = [
    {
        division: "Dhaka",
        latitude: 24.1667,
        longitude: 90.4167
    },
    {
        division: "Chittagong",
        latitude: 22.9167,
        longitude: 91.5000
    },
    {
        division: "Khulna",
        latitude: 22.8088,
        longitude: 89.2467
    },
    {
        division: "Rajshahi",
        latitude: 25.0000,
        longitude: 89.0000
    },
    {
        division: "Sylhet",
        latitude: 24.5000,
        longitude: 91.6667
    },
    {
        division: "Rangpur",
        latitude: 25.8483,
        longitude: 88.9414
    },
    {
        division: "Barisal",
        latitude: 22.3811,
        longitude: 90.3372
    },
    {
        division: "Mymensingh",
        latitude: 24.1667,
        longitude: 90.4167
    }
];


export const Divisions = () => {

    return (
        <MapContainer center={[23.505, 90.09]} zoom={6} scrollWheelZoom={false} className='h-100 w-100' >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {bangladeshDivisions && bangladeshDivisions.map(center => (
                <Marker key={center.division} position={[center.latitude, center.longitude]}>
                    <Popup>
                        {center.division}
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    )
}


const SearchDivisions = () => {

    const mapRef = useRef(null);
    const inputRef = useRef(null);

    function Search ( ) {
        let city = inputRef.current.value;
        let division = bangladeshDivisions.find( x => x.division.toLowerCase().includes( city.toLowerCase() ) )
        if(division)
        {
            let coord = [ division.latitude, division.longitude ]
            mapRef.current.flyTo( coord, 8 );
        }
    }


    return (
        <div className='flex flex-col' >
            <input placeholder='Type your division' ref={inputRef} />
            <button onClick={Search} >Search</button>
            
            <MapContainer ref={mapRef} center={[23.505, 90.09]} zoom={4} scrollWheelZoom={false} className='h-100 w-300' >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                

            </MapContainer>
        </div>
    )
}


export const Leaflet = () => {


    return (

        <div>
            <SearchDivisions />
        </div>

    );
};

