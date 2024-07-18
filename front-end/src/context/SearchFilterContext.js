import React, { createContext, useState } from 'react';

export const SearchFilterContext = createContext();

const SearchFilterProvider = ({ children }) => {
  const [searchFilterValues, setSearchFilterValues] = useState({
    name: '',
    subCategory: []
  });

  return (
    <SearchFilterContext.Provider value={{ searchFilterValues, setSearchFilterValues }}>
      {children}
    </SearchFilterContext.Provider>
  );
};

export default SearchFilterProvider;
