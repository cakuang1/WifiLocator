import SanFranciscoMap from './components/Map';
import SearchSection from './components/Search';
import { RestaurantProvider } from './components/WifiContext';





function App() {  
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
