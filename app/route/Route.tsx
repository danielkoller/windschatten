'use client';
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useRef, useState } from 'react';

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

    // Implement this, when the database is ready - so far we only have the possibility to enter the origin and destination manually

    //   async function calculateRoute() {
    // const response = await fetch('/api/user-location'); // replace with your own API endpoint to fetch the user's location
    // const data = await response.json();

    // const { origin, destination } = data; // assuming your API endpoint returns an object with 'origin' and 'destination' properties

    // if (!origin || !destination) {
    //   return;
    // }

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
    setDurationByCar(drivingResults.routes[0].legs[0].duration.text);
  }

  return (
    <div>
      <div>
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: '80%', height: '400px' }}
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
            <span>Duration by Bike: {duration}</span>
            <br />
            <span>Duration by Car: {durationByCar}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
