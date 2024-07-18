import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from '../common/Pagination/Pagination';
import styles from './ListingProbox.module.css';

// const products = [
//   { id: 1, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 2, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 3, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 4, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 5, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 6, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 7, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 8, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 9, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 10, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 11, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 12, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 13, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   { id: 14, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
//   // Add more products here...
// ];

const ListingProbox = ({products}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const displayedProducts = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  console.log("displayedProducts",displayedProducts);
  return (
    <div>
    
      <div className={styles.listingProbox}>
        {displayedProducts?.map(product => (
          <Link to={`/product-detail/${product._id}`} style={{ textDecoration: 'none' }}>
            <div key={product._id} className={styles.productCard}>
              <div style={{maxHeight :'200px',height : '200px'}}>
              <img src={product.images?.[0]?.filename} width={'300px'} height={'300px'} alt={product.title} className={styles.productImage} />

              </div>
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{product.title}</h3>
                {product.variants !==0 && <>
                <p className={styles.productName} style={{color: '#6d6d1a'}}>price : ${product.variants[0]?.price}</p>
                <p className={styles.productName} style={{color: '#6d6d1a'}}>RAM : {product.variants[0]?.ram}</p>
                </>}
        
                <div className={styles.productRating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? styles.filledStar : styles.emptyStar}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        totalItems={products.length}
      />
    </div>
  );
};

export default ListingProbox;
