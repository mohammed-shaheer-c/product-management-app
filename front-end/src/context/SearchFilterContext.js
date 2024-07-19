import React, { createContext, useState } from 'react';

export const SearchFilterContext = createContext();
// Function for store search data context
const SearchFilterProvider = ({ children }) => {
  const [searchFilterValues, setSearchFilterValues] = useState({
    name: '',
    subCategory: []
  });
  const [store, setStore] = useState([]);
  return (
    <SearchFilterContext.Provider value={{ searchFilterValues, setSearchFilterValues,setStore,store }}>
      {children}
    </SearchFilterContext.Provider>
  );
};

export default SearchFilterProvider;
