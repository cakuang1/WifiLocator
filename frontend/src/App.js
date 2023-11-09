import SanFranciscoMap from './components/Map';
import { useState } from 'react';
import SearchSection from './components/Search';
import { RestaurantProvider } from './components/WifiContext';





function App() {

  const [results,setSearch] = useState()
  
  return (
    <RestaurantProvider>
    <div className='flex'>  
    <SearchSection/>  
    <SanFranciscoMap/>
    </div>
    </RestaurantProvider>
  )

}

export default App;
