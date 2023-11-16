
import { useRestaurant } from './WifiContext';
 
export default function SearchStatusComponent() {
  const {isSearching,setSelectedOption,selectedOption } = useRestaurant(
  );

  return (
    <>
    <div className=" bg-gray-100 rounded-lg  p-2 text-gray-400 flex px-5 text-center ">
      {isSearching ?     <p className='flex items-center justify-center'>Searching near <img height = {10} width = {15} className='mx-2' src='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'></img><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21" opacity="0"><animate id="svgSpinnersWifi0" fill="freeze" attributeName="opacity" begin="0;svgSpinnersWifi1.end+0.2s" calcMode="discrete" dur="0.25s" values="0;1"/><animate id="svgSpinnersWifi1" fill="freeze" attributeName="opacity" begin="svgSpinnersWifi3.end+0.5s" dur="0.001s" values="1;0"/></path><path fill="currentColor" d="M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" opacity="0"><animate id="svgSpinnersWifi2" fill="freeze" attributeName="opacity" begin="svgSpinnersWifi0.end" calcMode="discrete" dur="0.25s" values="0;1"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersWifi3.end+0.5s" dur="0.001s" values="1;0"/></path><path fill="currentColor" d="M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3" opacity="0"><animate id="svgSpinnersWifi3" fill="freeze" attributeName="opacity" begin="svgSpinnersWifi2.end" calcMode="discrete" dur="0.25s" values="0;1"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersWifi3.end+0.5s" dur="0.001s" values="1;0"/></path></svg></p>
  : <p className='flex items-center gap-4 '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.904 17.563a1.2 1.2 0 0 0 2.228.308l2.09-3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047-1.047a1.067 1.067 0 0 0 0-1.509l-4.907-4.907l3.113-2.09a1.2 1.2 0 0 0-.309-2.228L4 4l3.904 13.563z"/></svg>Click to Search</p> 
  }
    </div>
    <div className='flex  bg-white items-center border rounded-2xl mt-2 text-center text-gray-400'>
      <div
        className={`cursor-pointer  border-r w-1/3 p-2  rounded-l-2xl ${selectedOption === 'public' ? 'bg-gray-200 font-medium' : ''}`}
        onClick={() => setSelectedOption('public')}
      >
        Public
      </div>
      <div
        className={` cursor-pointer text-center w-1/3 p-2 ${selectedOption === 'private' ? 'bg-gray-200 font-medium' : ''}`}
        onClick={() => setSelectedOption('private')}
      >
        Private
      </div>
      <div
        className={` cursor-pointer text-center w-1/3 p-2 border-l  rounded-r-2xl ${selectedOption === '' ? 'bg-gray-200 font-medium' : ''}`}
        onClick={() => setSelectedOption('')}
      >
        All
      </div>
    </div>
    </>
  );
}