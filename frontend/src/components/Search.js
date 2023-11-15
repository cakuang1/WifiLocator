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
      <div className={'w-0 sm:w-96'}>
        <div className=" overflow-y-auto h-screen  p-4 bg-gray-100">
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
      <div className='flex text-gray-400 text-sm'>
        {console.log(isStoreOpen(restaurant.hoursList).isOpen)  }
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
      <div className='text-center px-4 mt-2   rounded-2xl'>
        <button onClick={onClose} className=''><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m4 10l-.707.707L2.586 10l.707-.707L4 10Zm17 8a1 1 0 1 1-2 0h2ZM8.293 15.707l-5-5l1.414-1.414l5 5l-1.414 1.414Zm-5-6.414l5-5l1.414 1.414l-5 5l-1.414-1.414ZM4 9h10v2H4V9Zm17 7v2h-2v-2h2Zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V9Z"/></svg></button>
        <div className='title text-2xl font-bold'> {restaurant.name}</div> 
        <div className='image '><img  className = {"mx-auto rounded"}src={restaurant.image}></img></div>
        <div className='hours mt-4'>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Business Hours</h1>
      <div className="grid grid-cols-2 gap-4">
        {restaurant.hoursList.map((day, index) => (
          <div key={index}>
            <h2 className=" font-semibold mb-2">{day.day}</h2>
            <p>
              {day.open} - {day.close}
            </p>
          </div>
        ))}
      </div>
    </div>
    <div className='status'></div>
        </div>
      <div className='directions'>

      </div>
      </div>
    );
  }



export default SearchSection;



 export function isStoreOpen(hoursList) {
  const currentDateTime = new Date();
  const currentDay = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().trim();
  const todaySchedule = hoursList.find(daySchedule => daySchedule.day.toLowerCase().trim() === currentDay);
  console.log(todaySchedule)
  if (todaySchedule) {
    if (todaySchedule.open.toLowerCase() === 'closed' || todaySchedule.close.toLowerCase() === 'closed') {
      return {
        day: currentDay,
        isOpen: false,
        sched : todaySchedule
      };
    }
    const openTime = parseTime(todaySchedule.open);
    const closeTime = parseTime(todaySchedule.close);
    const currentTime = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
    return {
      day: currentDay,
      isOpen: currentTime >= openTime && currentTime <= closeTime,
      sched : todaySchedule
    };
  } else {
    return {
      day: currentDay,
      isOpen: false,
      sched : todaySchedule
    };
  }
}

function parseTime(timeString) {
  const timeComponents = timeString.match(/(\d+)(?::(\d+))? (\w+)/);
  if (timeComponents === null || timeComponents.length < 4) {
    return undefined; // Return undefined for invalid time strings
  }

  let hours = parseInt(timeComponents[1]);
  const minutes = timeComponents[2] ? parseInt(timeComponents[2]) : 0;
  const period = timeComponents[3].toLowerCase();
  
  if (period === 'pm' && hours < 12) {
    hours += 12;
  } else if (period === 'am' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

