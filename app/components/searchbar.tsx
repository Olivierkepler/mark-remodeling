'use client'

import { useState, useEffect } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim() !== '') {
      setIsSearching(true);
      onSearch(query); // Call onSearch prop to fetch or filter results
    } else {
      setIsSearching(false);
    }
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setIsSearching(false);
  };

  return (
    <div className="relative flex items-center w-full max-w-md mx-auto bg-gray-800 rounded-full  shadow-lg">
      {/* Search Icon */}
      <div className="absolute left-4">
        <SearchIcon className={`w-6 h-6 text-white transition-transform duration-300 ${isSearching ? 'transform rotate-180' : ''}`} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full py-2 pl-14 pr-4 bg-transparent text-white placeholder-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ease-in-out"
      />

      {/* Clear Icon */}
      {query && (
        <button onClick={clearSearch} className="absolute right-4 text-white hover:text-gray-300 transition duration-300 ease-in-out">
          <XIcon className="w-5 h-5" />
        </button>
      )}

      {/* Loading Spinner */}
      {isSearching && (
        <div className="absolute right-10 animate-spin text-white">
          <div className="w-5 h-5 border-1 border-t-transparent border-white rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
