import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '50%',
  height: '400px',
  align: 'center'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.AIzaSyDlKF3k6lOULnNqmZRxaDxtYx-bD8WM8PA} // Use environment variable
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, can be added here */ }
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
