import React, { useState } from 'react';
import { useRestaurant } from './WifiContext';
// when the user clicks on either side bar or on the marker the current should be set to the item. How to handle the fly to case. If the user fl


function SearchSection() {
  const { searchResults, setSearchResults,current,setCurrent} = useRestaurant();
  const [showSearchSection,setShowSearchSection] = useState(false);
  const toggleSearchSection = () => {
    setShowSearchSection(!showSearchSection);
  };

  return (
    <div className=''>
      <div //mobile
        onClick={toggleSearchSection}
        className={`fixed bottom-0 left-0 right-0 bg-white p-4 sm:hidden h-auto z-10 transition-transform transform${
          showSearchSection ? ' translate-y-0' : ' translate-y-3/4'
        }`}
      >
        <button
          className={`absolute top-2 right-2 text-gray-600 hover:text-gray-800 ${
            showSearchSection ? '' : 'hidden'
          }`}
          onClick={toggleSearchSection}
        >
          Close
        </button>
        <div className=" overflow-y-auto h-[500px]">
          <h1 className="font-bold text-center text-xl">Query Results</h1>
          <RestaurantList />
        </div>
      </div>
      <div>
        <div className=" overflow-y-auto h-screen w-96 p-4 bg-gray-100">
          <h1 className="font-bold text-center text-xl">Query Results</h1>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
}
  function RestaurantList() {
    const { searchResults, setSearchResults,current,setCurrent} = useRestaurant();
    return (
<div className=''>
  {searchResults.map((restaurant, index) => (
    <div key={index} className='flex p-3 rounded-lg border my-2 h-32 bg-white'>
      <img src={restaurant.image} style={{ width: '50%', height: 'auto', maxHeight: '100%' }} alt={`Restaurant ${index}`} />
      <div className='ml-2'>
        <div className='flex font-bold'>
          <h2>{index + 1}. {restaurant.name}</h2>
        </div>
        <div className='flex text-gray-400'>
          {restaurant.address} , San Francisco, CA
        </div>

      </div>
    </div>
  ))}
</div>

    );
  }




export default SearchSection;
