import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems
}) => {
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    onRowsPerPageChange(Number(e.target.value));
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        Showing {rowsPerPage} of {totalItems} items
      </div>
      <div className="border-top-light mt-30 pt-30">
        <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
          {/* Previous Button */}
          <div className="col-auto">
            <button
              className={`size-40 flex-center rounded-full cursor-pointer ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
          </div>
          
          {/* Next Button */}
          <div className="col-auto">
            <button
              className={`size-40 flex-center rounded-full cursor-pointer ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
      <div className={styles.rowsPerPage}>
        Show 
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={30}>30 rows</option>
          <option value={40}>40 rows</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
