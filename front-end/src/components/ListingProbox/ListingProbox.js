import React, { useState ,useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import Pagination from '../common/Pagination/Pagination';
import styles from './ListingProbox.module.css';
import { SearchFilterContext } from '../../context/SearchFilterContext';

const ListingProbox = ({ products, currentPage, totalPages, onPageChange, rowsPerPage, onRowsPerPageChange, totalItems }) => {
  const { store, setStore } = useContext(SearchFilterContext);

  useEffect(() => {
    // Fetch the existing wishlist from local storage
    let existingArray = JSON.parse(localStorage.getItem("wishlist")) || [];
    setStore(existingArray);
  }, []);

  const handleWishlistClick = (product) => {
    // Fetch the existing wishlist from local storage
    var existingArray = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = existingArray.findIndex(item => item._id === product._id);

    if (index > -1) {
      // If the item is already in the wishlist, remove it
      existingArray.splice(index, 1);
    } else {
      // If the item is not in the wishlist, add it
      existingArray.push(product);
    }

    // Update the store state and local storage with the new wishlist
    setStore(existingArray);
    localStorage.setItem("wishlist", JSON.stringify(existingArray));
  };


  if(products.length==0){
    return (
      <div>
        No result found
      </div>
    )
  }

  return (
    <div>
      <div className={styles.listingProbox}>
        {products?.map(product => (
          <div key={product._id} className={styles.productCard}>
            <span style={{border: '1px solid white'}} onClick={() => handleWishlistClick(product)}>
              <svg
                height="25px"
                version="1.1"
                viewBox="0 0 512 512"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
                  fill={store.find(item => item._id === product._id) ? "red" : "black"}
                />
              </svg>
            </span>
            <Link to={`/product-detail/${product._id}`} style={{ textDecoration: 'none' }}>
              <div style={{ maxHeight: '200px', height: '200px' }}>
                <img src={product.images?.[0]?.filename} width={'300px'} height={'300px'} alt={product.title} className={styles.productImage} />
              </div>
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{product.title}</h3>
                {product.variants.length !== 0 && (
                  <>
                    <p className={styles.productName} style={{ color: '#6d6d1a' }}>Price: ${product.variants[0]?.price}</p>
                    <p className={styles.productName} style={{ color: '#6d6d1a' }}>RAM: {product.variants[0]?.ram}</p>
                  </>
                )}
                <div className={styles.productRating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? styles.filledStar : styles.emptyStar}>★</span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        totalItems={totalItems}
      />
    </div>
  );
};

export default ListingProbox;