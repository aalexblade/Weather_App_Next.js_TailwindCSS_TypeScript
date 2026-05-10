'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { getCitySuggestions } from '@/services/weatherService';
import { CitySuggestion } from '@/types/weather';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialCity?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialCity = '' }) => {
  const [query, setQuery] = useState(initialCity);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState('');
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getCitySuggestions(query);
        setSuggestions(data);
        setIsOpen(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (cityName: string) => {
    if (!cityName.trim()) {
      setValidationError('Please enter a city name');
      return;
    }
    setValidationError('');
    setQuery(cityName);
    setIsOpen(false);
    router.push(`/?city=${encodeURIComponent(cityName)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto z-50">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setValidationError(''); }}
          placeholder="Search city..."
          className="w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-lg"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5 animate-spin" />
        )}
      </form>
      {validationError && (
        <p className="text-red-300 text-sm mt-1 text-left">{validationError}</p>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
          {suggestions.map((city, index) => (
            <li
              key={`${city.name}-${index}`}
              onClick={() => handleSearch(city.name)}
              className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white transition-colors border-b border-white/5 last:border-none"
            >
              <span className="font-medium">{city.name}</span>
              <span className="text-sm text-white/60 ml-2">
                {city.state ? `${city.state}, ` : ''}{city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
