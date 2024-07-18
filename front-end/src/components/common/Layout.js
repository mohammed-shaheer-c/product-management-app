import React from 'react';
import Header from './Header/Header';
import SearchFilterProvider from '../../context/SearchFilterContext';

function Layout(props) {
  return (
    <SearchFilterProvider>
      <Header />
      {props.children}
    </SearchFilterProvider>
  );
}

export default Layout;
