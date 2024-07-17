// import React, {useState} from 'react';
// import styles from './Pagination.module.css';

// const Pagination = ({  totalPages, onPageChange, rowsPerPage, onRowsPerPageChange, totalItems }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 5
//   const total_count =15
//     // Function for pagenumber's onclick  
//     const handlePageClick = (pageNumber) => {
//       setCurrentPage(pageNumber);
//       // dispatch(wishlist_page({page : pageNumber}))
//     };
//     // Function for showing the page number
//     const renderPage = (pageNumber, isActive = false) => {
//       const className = `size-40 flex-center rounded-full cursor-pointer ${
//         isActive ? "bg-dark-1 text-white" : ""
//       }`;
//       return (
//         <div key={pageNumber} className="col-auto">
//           <div className={className} onClick={() => handlePageClick(pageNumber)}>
//             {pageNumber}
//           </div>
//         </div>
//       );
//     };

//     // Function for calulating number for pages
//     const renderPages = () => {
//       const totalPages =  Math.ceil(total_count/ limit);
//       const pageNumbers = [];
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i); 
//       }
//       const pages = pageNumbers.map((pageNumber) =>
//         renderPage(pageNumber, pageNumber === currentPage)
//       );
//       return pages;
//     };
//   return (
//     <div className={styles.paginationContainer}>
//       <div className={styles.paginationInfo}>
//         {rowsPerPage} of {totalItems} items
//       </div>
//         <div className="border-top-light mt-30 pt-30">
//         <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
//           <div className="col-auto md:order-1">
//           </div>

//           <div className="col-md-auto md:order-3">
//             <div className="row x-gap-20 y-gap-20 items-center md:d-none">
//               {renderPages()}
//             </div>
//           </div>

//           <div className="col-auto md:order-2">
//           </div>
//         </div>
//       </div>
//       <div className={styles.rowsPerPage}>
//         Show 
//         <select value={rowsPerPage} onChange={e => onRowsPerPageChange(Number(e.target.value))}>
//           <option value={10}>10 rows</option>
//           <option value={20}>20 rows</option>
//           <option value={30}>30 rows</option>
//           <option value={40}>40 rows</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, onPageChange, rowsPerPage, onRowsPerPageChange, totalItems }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Function for pagenumber's onclick  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Dispatch or call onPageChange(pageNumber) here if needed
  };

  // Function for showing the page number
  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${isActive ? "bg-dark-1 text-white" : ""}`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  // Function for rendering pagination buttons
  const renderPages = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const pages = pageNumbers.map((pageNumber) =>
      renderPage(pageNumber, pageNumber === currentPage)
    );
    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        {rowsPerPage} of {totalItems} items
      </div>
      <div className="border-top-light mt-30 pt-30">
        <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
          <div className="col-auto md:order-1">
            {/* Any content you want to add */}
          </div>
          <div className="col-md-auto md:order-3">
            <div className="row x-gap-20 y-gap-20 items-center md:d-none">
              {renderPages()}
            </div>
          </div>
          <div className="col-auto md:order-2">
            {/* Any content you want to add */}
          </div>
        </div>
      </div>
      <div className={styles.rowsPerPage}>
        Show 
        <select value={rowsPerPage} onChange={e => onRowsPerPageChange(Number(e.target.value))}>
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
