import React,{useEffect,useRef} from 'react';
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
import {Icon} from 'leaflet'
import { useMapEvents } from 'react-leaflet';
import SearchStatusComponent from './LocationStatus';
import { useRestaurant } from './WifiContext';
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer
import { isStoreOpen } from './Search';

function LocationMarker() {
  const {selectedArea, setSelectedArea,  setSearchResults,  setIsSearching,selectedOption} = useRestaurant();
  async function fetchClosestLocations(latitude, longitude) {
    setIsSearching(true)
    try {
      const response = await fetch(`http://localhost:8080/closestLocations?latitude=${latitude}&longitude=${longitude}&type=${selectedOption}` );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIsSearching(false)
      setSearchResults(data)
      return data;
    } catch (error) {
      console.error('Error fetching closest locations:', error.message);
      setIsSearching(false)
      setSearchResults([])
      throw error;
    }
  }
  const MIN_LATITUDE = 37.663132;
  const MAX_LATITUDE = 37.845245;
  const MIN_LONGITUDE = -122.558459;
  const MAX_LONGITUDE = -122.360466;
  const DEFAULT_LATITUDE = (MIN_LATITUDE + MAX_LATITUDE) / 2;
  const DEFAULT_LONGITUDE = (MIN_LONGITUDE + MAX_LONGITUDE) / 2;
  function getCurrent() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        // Check if the current location is out of bounds
        const isOutOfBounds = !(
          latitude >= MIN_LATITUDE && latitude <= MAX_LATITUDE &&
          longitude >= MIN_LONGITUDE && longitude <= MAX_LONGITUDE
        );
        if (isOutOfBounds) {
          // If out of bounds, set the location to the middle of San Francisco
          const sanFranciscoLocation = { lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE };
          fetchClosestLocations(sanFranciscoLocation.lat,sanFranciscoLocation.lng)
          setSelectedArea(sanFranciscoLocation);
          flyToLocation(sanFranciscoLocation)
          console.warn('Current location is out of bounds. Setting to the middle of San Francisco.');
        } else {
          // If within bounds, set the location to the user's current location
          const userLocation = { lat: latitude, lng: longitude };
          fetchClosestLocations(userLocation.lat,userLocation.lng)
          setSelectedArea(userLocation);
          flyToLocation(userLocation)
        }
      },  
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          console.warn('User refused to allow location access. Defaulting to the middle of San Francisco.');
          // Default to the middle of San Francisco if the user refuses access
          const sanFranciscoLocation = { lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE };
          fetchClosestLocations(sanFranciscoBounds.lat,sanFranciscoBounds.lng)
          setSelectedArea(sanFranciscoLocation);
          flyToLocation(sanFranciscoLocation)
        } else {
          console.error('Error getting user location:', error.message);
        }
      },
    );
  }




  useEffect(() => {
    // Ask for permission to access the user's location'
    setSelectedArea({ lat: 37.7749, lng: -122.4194 })
    getCurrent();
  }, []);

  const map = useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      fetchClosestLocations(clickedLatLng.lat,clickedLatLng.lng)
      setSelectedArea(clickedLatLng);
      flyToLocation(clickedLatLng)
      // Adjust the duration and zoom level as needed
    },
  });

  const flyToLocation = (location) => {
    map.flyTo(location, 14, {
      duration: 1 // Adjust the duration in seconds
    });
  };
  return (
    <>
      {selectedArea && selectedArea.lat && selectedArea.lng && (
        <Marker position={selectedArea} icon={greenIcon}>
          <Popup>Coordinates: {selectedArea.lat}, {selectedArea.lng}</Popup>
        </Marker>
      )}
    </>
  );
}

const ClosestMarkers = () => {
  const {searchResults} = useRestaurant()
  const CustomMarker = ({ number }) => {
    return ( 
    <div className="rounded-full bg-gray-400 text-white p-2 rounded-full shadow-md w-8 h-8 flex items-center justify-center">
      <span className="text-xl font-bold">{number}</span>
    </div>
    )
  ;
  }
  return (
    <>
      {searchResults.map((result, index) => {
        const geo = JSON.parse(result.geo);
        const position = [geo.coordinates[1], geo.coordinates[0]]; // Extracting latitude and longitude
        const customIcon = new L.divIcon({
          className: '',
          html: ReactDOMServer.renderToString(<CustomMarker number={index + 1} />),
        });
        const dic = isStoreOpen(result.hoursList)
        const isOpen = dic.isOpen
        const sched = dic.sched
        const day = dic.day
        return (
          <Marker key={result.id} position={position} icon={customIcon}>
            <Popup className=''>
            <div key={result.id} className='flex rounded-lg w-[250px]'>
            <img src={result.image} className='h-28 border w-1/2'></img>
            <div className='ml-2 '>
            <div className='font-bold'> <h2 className=''>  {result.name}</h2></div>
              <div className='flex items-center'><svg xmlns="http://www.w3.org/2000/svg" className = {'w-6 h-6'}  viewBox="0 0 24 24"><path fill="currentColor" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg><div className='flex items-center'>{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</div></div>
              <div className='font-bold'>{sched.day} </div>
              <div>{sched.open} - {sched.close}</div>
              <div className='flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className = {'w-6 h-6'} width="24" height="24"  viewBox="0 0 24 24"><path fill="currentColor" d="M4.462 20v-1H6V5.115q0-.666.475-1.14q.474-.475 1.14-.475h8.77q.666 0 1.14.475q.475.474.475 1.14V19h1.538v1H4.462ZM15 19h2V5.115q0-.269-.173-.442t-.442-.173h-3.539v-.485q.927.104 1.54.797q.614.692.614 1.615V19Zm-4-6.23q.31 0 .54-.23q.23-.23.23-.54q0-.31-.23-.54q-.23-.23-.54-.23q-.31 0-.54.23q-.23.23-.23.54q0 .31.23.54q.23.23.54.23Z"/></svg>
                {isOpen ? <div className='text-green-500 font-semibold pl-3'>Open</div> : <div className='text-red-500 font-semibold pl-3'> Closed</div>}
              </div>
            </div> 
          </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  )
}

const sanFranciscoBounds = new L.LatLngBounds(
    new L.LatLng(37.663132,-122.558459), // Southwest corner
    new L.LatLng(37.845245,-122.360466)  // Northeast corner
  );
  const initialCoordinates = [37.7749, -122.4194];

  const mapOptions = {
    center: initialCoordinates,
    zoom: 14,
    zoomControl: false,
    maxZoom: 14,
    minZoom : 14
  };  

  // Sample locations with proximity values
  function SanFranciscoMap() {
    return (
      <div className='flex-grow relative'>
          <div className="absolute left-1/2 top-14 transform -translate-x-1/2 z-10 ">
          <SearchStatusComponent/>
        </div>
        <MapContainer {...mapOptions}  className = {'h-screen w-full z-0'} maxBounds={sanFranciscoBounds} >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      <LocationMarker />
      <ClosestMarkers/>
    </MapContainer>
    </div>
    );
  }
  
  export default SanFranciscoMap;
  






  // helper section 



  var greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });