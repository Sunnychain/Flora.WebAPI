import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const containerStyle = {
  width: '700px',
  height: '400px'
};

const center = {
  lat: 41.194204,
  lng: -8.6286117
};

function Locations () {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCk84-i_RX2tUW5KMWgiGmxu70gGF5tFEY'
  });

  return (
        <div className="mapa">
        {
          isLoaded
            ? <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={20}
            >
                <Marker position={center} />
            </GoogleMap>
            : ''
        }
        </div>
  );
}

export default Locations;
