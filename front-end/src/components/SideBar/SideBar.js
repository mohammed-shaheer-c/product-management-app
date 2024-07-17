import React, { useState } from 'react';
import styles from './SideBar.module.css'; // Import the CSS module

const SideBar = () => {
  const [isLaptopOpen, setIsLaptopOpen] = useState(true);

  const toggleLaptop = () => {
    setIsLaptopOpen(!isLaptopOpen);
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>
      <ul className={styles.categoryList}>
        <li className={styles.categoryItem}>All categories</li>
        <li className={styles.categoryItem}>
          <div onClick={toggleLaptop} className={styles.categoryHeader}>
            Laptop {isLaptopOpen ? '▼' : '►'}
          </div>
          {isLaptopOpen && (
            <ul className={styles.subCategoryList}>
              <li className={styles.subCategoryItem}>
                <input type="checkbox" id="hp" name="hp" />
                <label htmlFor="hp"> Hp</label>
              </li>
              <li className={styles.subCategoryItem}>
                <input type="checkbox" id="dell" name="dell" />
                <label htmlFor="dell"> Dell</label>
              </li>
            </ul>
          )}
        </li>
        <li className={styles.categoryItem}>Tablet ►</li>
        <li className={styles.categoryItem}>Headphones ►</li>
      </ul>
    </div>
  );
};

export default SideBar;
