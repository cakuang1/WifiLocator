import React, { useState } from 'react';
import { useRestaurant } from './WifiContext';
// when the user clicks on either side bar or on the marker the current should be set to the item. How to handle the fly to case. If the user fl


function SearchSection() {
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
          <div className='flex justify-center items-center' onClick={toggleSearchSection}><svg xmlns="http://www.w3.org/2000/svg" className = {'w-8 h-8'} width="32" height="20" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg></div>
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
    const { searchResults,} = useRestaurant();
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
<h1 className='flex justify-center gap-2'>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6.35 15.35l-2.1-2.15q1.55-1.55 3.55-2.375T12 10q2.2 0 4.213.838t3.537 2.412l-2.1 2.1q-1.125-1.125-2.588-1.738T12 13q-1.6 0-3.063.613T6.35 15.35ZM2.1 11.1L0 9q2.375-2.425 5.488-3.713T12 4q3.4 0 6.513 1.288T24 9l-2.1 2.1q-1.975-1.975-4.538-3.038T12 7Q9.2 7 6.637 8.063T2.1 11.1ZM12 21l-3.525-3.55q.7-.7 1.613-1.075T12 16q1 0 1.913.375t1.612 1.075L12 21Z"/></svg>
      <div className='font-bold'>RemoteSF</div>
</h1>
<h1 className="font-bold text-center text-lg mt-2">Query Results</h1>
{searchResults.map((restaurant, index) => {
  const isOpen = isStoreOpen(restaurant.hoursList).isOpen;
  return (
    <div key={index} onClick={() => openCardSection(restaurant)} className='cursor-pointer relative'>
      <div className='flex p-3 rounded-lg border my-2 h-32 bg-white hover:bg-gray-200'>
        <img src={restaurant.image} style={{ width: '50%', height: 'auto', maxHeight: '100%' }} alt={`Restaurant ${index}`} />
        <div className='ml-2'>
          <div className='flex font-bold text-md'>
            <h2>{index + 1}. {restaurant.name}</h2>
          </div>
          <div className='flex text-gray-400 text-sm'>
            {restaurant.address}, San Francisco, CA
          </div>
          <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4.462 20v-1H6V5.115q0-.666.475-1.14q.474-.475 1.14-.475h8.77q.666 0 1.14.475q.475.474.475 1.14V19h1.538v1H4.462ZM15 19h2V5.115q0-.269-.173-.442t-.442-.173h-3.539v-.485q.927.104 1.54.797q.614.692.614 1.615V19Zm-4-6.23q.31 0 .54-.23q.23-.23.23-.54q0-.31-.23-.54q-.23-.23-.54-.23q-.31 0-.54.23q-.23.23-.23.54q0 .31.23.54q.23.23.54.23Z" />
            </svg>
            {isOpen ? <div className='text-green-500 font-medium text-sm pl-3'>Open</div> : <div className='text-red-500 font-medium text-sm pl-3'> Closed</div>}
          </div>
          
        </div>
      </div>
      <div className="absolute bottom-0 right-0 mb-2 mr-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6.35 15.35l-2.1-2.15q1.55-1.55 3.55-2.375T12 10q2.2 0 4.213.838t3.537 2.412l-2.1 2.1q-1.125-1.125-2.588-1.738T12 13q-1.6 0-3.063.613T6.35 15.35ZM2.1 11.1L0 9q2.375-2.425 5.488-3.713T12 4q3.4 0 6.513 1.288T24 9l-2.1 2.1q-1.975-1.975-4.538-3.038T12 7Q9.2 7 6.637 8.063T2.1 11.1ZM12 21l-3.525-3.55q.7-.7 1.613-1.075T12 16q1 0 1.913.375t1.612 1.075L12 21Z"/></svg>
      </div>
    </div>
  );
})}

</div>
}
</div>
    );
  }




function CardSection({ restaurant, onClose }) {
  const dic = isStoreOpen(restaurant.hoursList)
  const isOpen = dic.isOpen
  const sched = dic.sched
  const day = dic.day
    // Your card section UI with restaurant details
    return (
      <div className='text-center px-4 mt-2   rounded-2xl'>
        <button onClick={onClose} className='border mb-4 rounded-full p-2 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m4 10l-.707.707L2.586 10l.707-.707L4 10Zm17 8a1 1 0 1 1-2 0h2ZM8.293 15.707l-5-5l1.414-1.414l5 5l-1.414 1.414Zm-5-6.414l5-5l1.414 1.414l-5 5l-1.414-1.414ZM4 9h10v2H4V9Zm17 7v2h-2v-2h2Zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V9Z"/></svg></button>
        <div className='title text-2xl font-bold'> {restaurant.name}</div> 
        <div className='image '><img  className = {"mx-auto rounded"}src={restaurant.image}></img></div>
        <div className='flex mt-4 items-center '>
          <div><svg xmlns="http://www.w3.org/2000/svg" className = {"h-7 w-7"} width="512" height="512" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137Z"/><circle cx="256" cy="192" r="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg></div>
          <div className='text-center mx-auto'>{restaurant.address}</div>
        </div>
        <div className='hours mt-4'>
        <div className="flex">
          <div><svg xmlns="http://www.w3.org/2000/svg"  className = {"h-7 w-7"} width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm-5 4a1 1 0 1 0-1-1a1 1 0 0 0 1 1Zm5 0a1 1 0 1 0-1-1a1 1 0 0 0 1 1ZM7 14a1 1 0 1 0-1-1a1 1 0 0 0 1 1ZM19 4h-1V3a1 1 0 0 0-2 0v1H8V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9h16Zm0-11H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1ZM7 18a1 1 0 1 0-1-1a1 1 0 0 0 1 1Z"/></svg></div>
      <div className=" mx-auto">
        {restaurant.hoursList.map((day, index) => (
          
          <div key={index} className='flex'>
            <h2 className=" font-semibold mb-2 mr-4 w-20">{day.day}  </h2>
            <p>
              {day.open} - {day.close}
            </p>
          </div>
        ))}
      </div>
    </div>
    <div className='status flex mt-2'>
      <div> <svg xmlns="http://www.w3.org/2000/svg" className = {'w-7 h-7'} width="24" height="24"  viewBox="0 0 24 24"><path fill="currentColor" d="M4.462 20v-1H6V5.115q0-.666.475-1.14q.474-.475 1.14-.475h8.77q.666 0 1.14.475q.475.474.475 1.14V19h1.538v1H4.462ZM15 19h2V5.115q0-.269-.173-.442t-.442-.173h-3.539v-.485q.927.104 1.54.797q.614.692.614 1.615V19Zm-4-6.23q.31 0 .54-.23q.23-.23.23-.54q0-.31-.23-.54q-.23-.23-.54-.23q-.31 0-.54.23q-.23.23-.23.54q0 .31.23.54q.23.23.54.23Z"/></svg></div>
      {isOpen ? <div className='text-green-500 font-semibold  text-center flex-grow'>Open</div> : <div className='text-red-500 font-semibold pl-3 text-center flex-grow'> Closed</div>}
    </div>
    <div className='status flex mt-2'>
    <svg xmlns="http://www.w3.org/2000/svg" className = {'w-7 h-7'} width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6.35 15.35l-2.1-2.15q1.55-1.55 3.55-2.375T12 10q2.2 0 4.213.838t3.537 2.412l-2.1 2.1q-1.125-1.125-2.588-1.738T12 13q-1.6 0-3.063.613T6.35 15.35ZM2.1 11.1L0 9q2.375-2.425 5.488-3.713T12 4q3.4 0 6.513 1.288T24 9l-2.1 2.1q-1.975-1.975-4.538-3.038T12 7Q9.2 7 6.637 8.063T2.1 11.1ZM12 21l-3.525-3.55q.7-.7 1.613-1.075T12 16q1 0 1.913.375t1.612 1.075L12 21Z"/></svg>      
    <div className='flex-grow text-center font-bold'>Has Wifi</div>
    </div>
        </div>
        <a href={restaurant.google} target="_blank" rel="noopener noreferrer" >
      <div className='directions flex items-center justify-center mt-5'>
      <div className='bg-gray-600 p-2 flex text-white rounded-lg hover:bg-gray-700 hover:cursor-pointer' >
      <svg xmlns="http://www.w3.org/2000/svg"  className = {"mr-2 "} width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 15h2v-3h3.5v2.5L17 11l-3.5-3.5V10H9q-.425 0-.713.288T8 11v4Zm4 7q-.375 0-.738-.15t-.662-.45l-8-8q-.3-.3-.45-.663T2 12q0-.375.15-.738t.45-.662l8-8q.3-.3.663-.45T12 2q.375 0 .738.15t.662.45l8 8q.3.3.45.663T22 12q0 .375-.15.738t-.45.662l-8 8q-.3.3-.663.45T12 22Zm-4-6l4 4l8-8l-8-8l-8 8l4 4Zm4-4Z"/></svg>
        Directions</div>
      </div>
      </a>

      </div>
    );
  }



export default SearchSection;



 export function isStoreOpen(hoursList) {
  const currentDateTime = new Date();
  const currentDay = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase().trim();
  const todaySchedule = hoursList.find(daySchedule => daySchedule.day.toLowerCase().trim() === currentDay);
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

