import React, { useState } from 'react';
import { useRestaurant } from './WifiContext';
// when the user clicks on either side bar or on the marker the current should be set to the item. How to handle the fly to case. If the user fl
import moment from 'moment-timezone';


function SearchSection() {
  const { searchResults} = useRestaurant();
  const [showSearchSection,setShowSearchSection] = useState(false);


  const toggleSearchSection = () => {
    setShowSearchSection(!showSearchSection);
  };


  return (
    <div className=''>
      <div //mobile
        className={`fixed bottom-0 left-0 right-0 bg-white p-2 sm:hidden h-auto z-10 transition-transform transform${
          showSearchSection ? ' translate-y-0' : ' translate-y-3/4'
        }`}
      >
        <div className=" overflow-y-auto h-[500px]">
          <div className='flex justify-center items-center' onClick={toggleSearchSection}><svg xmlns="http://www.w3.org/2000/svg" className = {'w-8 h-8'}width="32" height="20" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg></div>
          <RestaurantList />
        </div>
      </div>
      <div className='w-0'>
        <div className=" overflow-y-auto h-screen w-96 p-4 bg-gray-100">
          <RestaurantList />  
        </div>
      </div>
    </div>
  );
}

  function RestaurantList() {
    const { searchResults} = useRestaurant();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const openCardSection = (restaurant) => {
      setSelectedRestaurant(restaurant);
    };
    const closeCardSection = () => {
      setSelectedRestaurant(null);
    };
    return (
<div className=''> 
{selectedRestaurant ? <CardSection restaurant={selectedRestaurant} onClose={closeCardSection}/> : 
<div>
<h1 className="font-bold text-center text-xl">Query Results</h1>
{searchResults.map((restaurant, index) => (
  <div onClick={() => openCardSection(restaurant)}>
  <div key={index} className='flex p-3 rounded-lg border my-2 h-32 bg-white hover:bg-gray-200 '>
    <img src={restaurant.image} style={{ width: '50%', height: 'auto', maxHeight: '100%' }} alt={`Restaurant ${index}`} />
    <div className='ml-2'>
      <div className='flex font-bold text-md'>
        <h2>{index + 1}. {restaurant.name}</h2>
      </div>
      <div className='flex text-gray-400 text-sm'>
        {restaurant.address} , San Francisco, CA
      </div>
    </div>
  </div>
  </div>
))}
</div>
}
</div>
    );
  }

function CardSection({ restaurant, onClose }) {
    // Your card section UI with restaurant details
    return (
      <div className='text-center px-12 mt-2'>
        <button onClick={onClose}>Close</button>
        <div className='title text-2xl text-gray-500 font-bold'> {restaurant.name}</div> 

        <div className='image '><img  className = {"mx-auto "}src={restaurant.image}></img></div>
        <div className='hours mt-4'>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Business Hours</h1>
      <div className="grid grid-cols-2 gap-4">
        {restaurant.hoursList.map((day, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-2">{day.day}</h2>
            <p>
              Open: {day.open} - {day.close}
            </p>
          </div>
        ))}
      </div>
    </div>
    <div></div>

        </div>
        
      </div>
    );
  }



export default SearchSection;


// Helpers


const isBusinessOpen = (schedule) => {
  // Get the current date and time in the Pacific Time Zone
  const pacificTimeZone = 'America/Los_Angeles';
  const currentDateTime = moment().tz(pacificTimeZone);

  // Get the current day and time in the "Monday", "Tuesday", etc. format
  const currentDay = currentDateTime.format('dddd');
  const currentTime = currentDateTime.format('h:mm A');

  // Check if the business is closed for the entire day
  const closedDay = schedule.find(daySchedule => daySchedule.open.toLowerCase() === 'closed');
  if (closedDay && closedDay.day === currentDay) {
      return false;
  }

  // Check if the current time is within the business hours for the current day
  for (const daySchedule of schedule) {
      if (daySchedule.day === currentDay && daySchedule.open.toLowerCase() !== 'closed') {
          const openTime = moment(daySchedule.open, 'h A');
          const closeTime = moment(daySchedule.close, 'h:mm A');

          if (currentDateTime.isBetween(openTime, closeTime, undefined, '[]')) {
              return true;
          }
      }
  }
  return false;
};