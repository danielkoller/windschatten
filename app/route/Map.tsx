'use client';
import {
  faBicycle,
  faCar,
  faDollarSign,
  faFire,
  faMap,
  faRoad,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    const durationByCarValue =
      drivingResults.routes[0].legs[0].duration.value / 60;
    setDurationByCar(drivingResults.routes[0].legs[0].duration.text);

    // Calculate the average CO2 emissions for a car ride based on the duration of the trip in minutes
    const averageEmissionsPerMinute = 0.195;
    const emissionsValue = (
      durationByCarValue * averageEmissionsPerMinute
    ).toFixed(2);
    setEmissions(emissionsValue);

    // Calculate the gas cost for the car ride based on the duration of the trip in minutes
    const averageFuelConsumption = 7.4; // liters per 100 km
    const fuelPrice = 1.5; // Euro per liter in Austria
    const distanceInKm = drivingResults.routes[0].legs[0].distance.value / 1000;
    const fuelConsumption = (distanceInKm / 100) * averageFuelConsumption;
    const gasCostValue = (
      fuelConsumption *
      fuelPrice *
      (durationByCarValue / 60)
    ).toFixed(2);
    setGasCost(gasCostValue);
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-4/5 h-96 mr-8">
        <div className="rounded-lg overflow-hidden h-full">
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '100%' }}
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
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faMap} className="text-4xl" />
          <h2 className="text-lg font-bold my-4 items-center">
            Find your fastest route here
          </h2>
        </div>
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Autocomplete>
              <input
                placeholder="Origin"
                className="input input-bordered w-full max-w-xs"
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div className="mr-4">
            <Autocomplete>
              <input
                placeholder="Destination"
                className="input input-bordered w-full max-w-xs"
                ref={destinationRef}
              />
            </Autocomplete>
          </div>
          <div>
            <button className="btn" onClick={calculateRoute}>
              Calculate Route
            </button>
          </div>
        </div>
        <div className="bg-gray-600 rounded-lg p-4">
          <div>
            <span className="font-bold">
              <FontAwesomeIcon icon={faRoad} className="mr-3" />
              Distance:
            </span>{' '}
            {distance}
          </div>
          <div className="border-t border-white pt-1 mt-1">
            <span className="font-bold">
              <FontAwesomeIcon icon={faBicycle} className="mr-1" /> Duration by
              Bike:
            </span>{' '}
            {duration}
          </div>
          <div className="border-t border-white  pt-1 mt-1">
            <div>
              <span className="font-bold">
                <FontAwesomeIcon icon={faCar} className="mr-2" /> Duration by
                Car:
              </span>{' '}
              {durationByCar}
            </div>
            <div>
              <span className="font-bold">
                {' '}
                <FontAwesomeIcon icon={faFire} className="mr-3" /> CO2
                Emissions:
              </span>{' '}
              {emissions} kg
            </div>
            <div>
              <span className="font-bold">
                <FontAwesomeIcon icon={faDollarSign} className="mr-4" /> Gas
                Cost:
              </span>{' '}
              {gasCost} Euro
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
