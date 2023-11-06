import React, { useState } from 'react';

function SearchSection() {
  const [showSearchSection, setShowSearchSection] = useState(false);
  const [items,setItems] = useState();
  const toggleSearchSection = () => {
    setShowSearchSection(!showSearchSection);
  };

  return (
    <div>
      <div onClick={toggleSearchSection}
        className={`fixed bottom-0 left-0 right-0 bg-white p-4 sm:hidden z-10  transition-transform transform${
            showSearchSection ? ' -translate-y-0' : ' translate-y-16'
        }` }
      >
        {/* Close button to hide the search section */}
        <button
          className={`absolute top-2 right-2 text-gray-600 hover:text-gray-800 ${
            showSearchSection ? '' : 'hidden'
        }`}
          onClick={toggleSearchSection}
        >
          Close
        </button>
        {/* Content of the SearchSection */}
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
        <div>Section 3</div>
        <div>Section 3</div>

      </div>
    </div>
  );
}

export default SearchSection;
