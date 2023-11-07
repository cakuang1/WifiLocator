import React from 'react';
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import {Icon} from 'leaflet'
import { useMapEvents } from 'react-leaflet';
import SearchStatusComponent from './LocationStatus';
import SearchSection from './Search';

function LocationMarker() {
  const [clickedPosition, setClickedPosition] = React.useState(null);

  const map = useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      setClickedPosition(clickedLatLng);
  
      // Adjust the duration and zoom level as needed
      map.flyTo(clickedLatLng, 14, {
        duration: 1 // Adjust the duration in seconds
      });
    },
  });

  return (
    <>
      {clickedPosition && (
        <Marker position={clickedPosition} >
          <Popup>Coordinates: {clickedPosition.lat}, {clickedPosition.lng}</Popup>
        </Marker>
      )}
    </>
  );
}


const sanFranciscoBounds = new L.LatLngBounds(
    new L.LatLng(37.700421, -122.569245), // Southwest corner
    new L.LatLng(37.834375, -122.349586)  // Northeast corner
  );


  const exampleLocations = [
    { name: 'Golden Gate Bridge', coordinates: [37.8199, -122.4783] },
    { name: "Fisherman's Wharf", coordinates: [37.8083, -122.4150] },
    { name: 'Union Square', coordinates: [37.7881, -122.4076] },
    { name: 'Alcatraz Island', coordinates: [37.8267, -122.4233] },
    { name: 'Chinatown', coordinates: [37.7941, -122.4078] },
  ];



  const initialCoordinates = [37.7749, -122.4194];
  const mapOptions = {
    center: initialCoordinates,
    zoom: 14,
    zoomControl: false,
    maxZoom: 14,
    minZoom : 14
  };

  const customIcon = new L.Icon({
    iconUrl: '/test.png',
    iconSize: [35, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  // Sample locations with proximity values
  const locations = [
    { position: [37.8199, -122.4783], proximity: 100 },
    { position: [37.8083, -122.4150], proximity: 200 },
    { position: [37.7881, -122.4076], proximity: 300 },
    // Add more locations with proximity values
  ];





  
  function SanFranciscoMap() {
    return (
      <div className='relative'>
          <div className="absolute left-1/2 top-14 transform -translate-x-1/2 z-10 ">
          <SearchStatusComponent/>
        </div>
        <MapContainer {...mapOptions}  className = {'h-screen w-screen z-0'} maxBounds={sanFranciscoBounds} >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      <LocationMarker />
    </MapContainer>
    </div>

    );
  }
  
  export default SanFranciscoMap;
  

  // helper section 
  const calculateDistance = (coord1, coord2) => {
    const radianFactor = Math.PI / 180;
    const earthRadius = 6371000; // Radius of the Earth in meters
    const lat1 = coord1[0] * radianFactor;
    const lat2 = coord2[0] * radianFactor;
    const diffLat = (coord2[0] - coord1[0]) * radianFactor;
    const diffLon = (coord2[1] - coord1[1]) * radianFactor;
    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
  };

 


  const legalIcon = new Icon ({
    iconUrl : '/test.png',
    iconSize : [35,35], // size of the icon
    iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  })
