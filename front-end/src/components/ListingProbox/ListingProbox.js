import React, { useState } from 'react';
import Pagination from '../common/Pagination/Pagination';
import styles from './ListingProbox.module.css';

const products = [
  { id: 1, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 2, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 3, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 4, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 5, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 6, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 7, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 8, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 9, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 10, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 11, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 12, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 13, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  { id: 14, name: 'HP AMD Ryzen 3', price: '$529.99', imageUrl: '/images/laptop1.png', rating: 4 },
  // Add more products here...
];

const ListingProbox = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const displayedProducts = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div>
      <div className={styles.listingProbox}>
        {displayedProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productDetails}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price}</p>
              <div className={styles.productRating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < product.rating ? styles.filledStar : styles.emptyStar}>★</span>
                ))}
              </div>
            </div>
          </div>
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
