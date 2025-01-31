import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
    const [, setMap] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Map container style
    const containerStyle = {
        width: '100%',
        height: '70%',
        align: 'center',
        margin: '100px 10px',
        
    };

    const center = {
        lat: 31.15,
        lng: 75.42
    };

    // Error fallback component
    const ErrorFallback = ({ error }) => (
        <div className="map-error">
            <h3>Error loading map</h3>
            <p>{error.message}</p>
        </div>
    );

    // Loading component
    const LoadingFallback = () => (
        <div className="map-loading">
            <p>Loading map...</p>
        </div>
    );

    const onLoad = useCallback((map) => {
        setMap(map);
        setIsLoading(false);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const onError = useCallback((error) => {
        console.error('Google Maps Error:', error);
        setError(error);
        setIsLoading(false);
    }, []);

    if (error) {
        return <ErrorFallback error={error} />;
    }

    return (
        <div className="map-container">
            {isLoading && <LoadingFallback />}
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                onError={onError}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullscreenControl: true
                    }}
                >
                    <Marker
                        position={center}
                        title="Current Location"
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
