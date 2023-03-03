'use client';
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useRef, useState } from 'react';
import styles from './page.module.scss';

// Define types for the response of the Directions API
interface DirectionsResponse {
  routes: google.maps.DirectionsRoute[];
}

// Set the center of the map to Vienna, Austria
const center = { lat: 48.20849, lng: 16.373819 };

export default function Map() {
  // Load the Google Maps JavaScript API and the Places library using the useJsApiLoader hook
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // Define the state variables
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [durationByCar, setDurationByCar] = useState<string>('');
  const [directionsResponse, setDirectionsResponse] =
    useState<DirectionsResponse | null>(null);
  const [emissions, setEmissions] = useState<string>('');
  const [gasCost, setGasCost] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // If the Google Maps JavaScript API and the Places library are not loaded yet, show a loading message
  if (!isLoaded) {
    return <>Loading...</>;
  }

  // Define the calculateRoute function, which is called when the user clicks the "Calculate Route" button
  async function calculateRoute() {
    // Check if the origin and destination inputs are filled out
    if (
      !originRef.current ||
      !destinationRef.current ||
      originRef.current.value === '' ||
      destinationRef.current.value === ''
    ) {
      return;
    }

    // Create a new DirectionsService object
    const directionsService = new google.maps.DirectionsService();

    // Calculate duration by Bike
    const bicyclingResults = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.BICYCLING,
    });

    // Set the state variables for the directions response, distance, and duration by bike
    setDirectionsResponse(bicyclingResults);
    setDistance(bicyclingResults.routes[0].legs[0].distance.text);
    setDuration(bicyclingResults.routes[0].legs[0].duration.text);

    // Calculate the duration by car
    const drivingResults = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    // Set the state variable for the duration by car
    const durationByCar = drivingResults.routes[0].legs[0].duration.value / 60;
    setDurationByCar(drivingResults.routes[0].legs[0].duration.text);

    // Calculate the average CO2 emissions for a car ride based on the duration of the trip in minutes
    const averageEmissionsPerMinute = 0.195;
    const emissions = (durationByCar * averageEmissionsPerMinute).toFixed(2);
    setEmissions(emissions);

    // Calculate the gas cost for the car ride based on the duration of the trip in minutes
    const averageFuelConsumption = 7.4; // liters per 100 km
    const fuelPrice = 1.5; // Euro per liter
    const distanceInKm = drivingResults.routes[0].legs[0].distance.value / 1000;
    const fuelConsumption = (distanceInKm / 100) * averageFuelConsumption;
    const gasCost = (
      fuelConsumption *
      fuelPrice *
      (durationByCar / 60)
    ).toFixed(2);
    setGasCost(gasCost);
  }

  return (
    <div>
      <div className={styles.googleMap}>
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: '80%', height: '500px' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={() => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div>
        <div>
          <Autocomplete>
            <input placeholder="Origin" ref={originRef} />
          </Autocomplete>
        </div>
        <div>
          <Autocomplete>
            <input placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
        </div>

        <div>
          <button onClick={calculateRoute}>Calculate Route</button>
        </div>
      </div>
      <div>
        <div>
          <div>
            <span>Distance: {distance}</span>
            <br />
            <span>🚲 Duration by Bike: {duration}</span>
            <br />
            <span>🚗 Duration by Car: {durationByCar}</span>
            <br />
            <span>🏭 CO2 Emissions: {emissions} kg</span>
            <br />
            <span>💶 Gas Cost: {gasCost} Euro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
