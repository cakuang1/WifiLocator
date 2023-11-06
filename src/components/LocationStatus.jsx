
import { useRestaurant } from './WifiContext';





export default function SearchStatusComponent() {
  const { searchLocation, isSearching } = useRestaurant(
  );
  return (
    <div className="text-center bg-gray-100 rounded-sm p-2 text-gray-400">
      <p>Searching near  {searchLocation}</p>
    </div>
  );
}