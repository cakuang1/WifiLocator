import React, { useState } from 'react';
import { useRestaurant } from './WifiContext';





function SearchSection() {
  const [showSearchSection, setShowSearchSection] = useState(false);
  const toggleSearchSection = () => {
    setShowSearchSection(!showSearchSection);
  };
  return (
    <div>
      <div
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
          <h1 className="font-bold text-center text-xl">Search Results</h1>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
}




const restaurants = [
    {
      id: 1,
      name: 'Restaurant A',
      image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Iy0bBuL4LZ9thDqevB_5bw/348s.jpg', // Replace with the actual image URL
    },
    {
        id: 1,
        name: 'Restaurant A',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Iy0bBuL4LZ9thDqevB_5bw/348s.jpg', // Replace with the actual image URL
      },
      {
        id: 1,
        name: 'Restaurant A',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Iy0bBuL4LZ9thDqevB_5bw/348s.jpg', // Replace with the actual image URL
      },  {
        id: 1,
        name: 'Restaurant A',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Iy0bBuL4LZ9thDqevB_5bw/348s.jpg', // Replace with the actual image URL
      },{
        id: 1,
        name: 'Restaurant A',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Iy0bBuL4LZ9thDqevB_5bw/348s.jpg', // Replace with the actual image URL
      },{
        id: 1,
        name: 'Restaurant A',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/Iy0bBuL4LZ9thDqevB_5bw/348s.jpg', // Replace with the actual image URL
      }
  ];



  function RestaurantList() {
    return (
      <div className=''>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className='flex p-3 rounded-lg border my-2'>
            <img src={restaurant.image} className='h-20'></img>
            <div className='ml-2 '>
              <div className='flex font-bold'>  <h2 className=''> {restaurant.id}. {restaurant.name}</h2></div>
            </div>  
          </div>
        ))}
      </div>
    );
  }




export default SearchSection;
