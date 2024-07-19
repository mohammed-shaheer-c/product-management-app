import React, { useState, useEffect } from 'react';
import styles from './SideBar.module.css'; // Import the CSS module

const SideBar = ({ categoryWithSubCategory, setSearchFilterValues }) => {
  // State to manage which categories are open or closed
  const [openCategories, setOpenCategories] = useState({});
  // State to manage selected sub-category IDs
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // Function to toggle the open/close state of a category
  const toggleCategory = (categoryId) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };


  // Function to handle changes in sub-category checkbox state
  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategories((prevSelected) => {
      // If sub-category is already selected, remove it from the state
      if (prevSelected.includes(subCategoryId)) {
        return prevSelected.filter(id => id !== subCategoryId);
      } else {
        // If sub-category is not selected, add it to the state
        return [...prevSelected, subCategoryId];
      }
    });
  };

  // Update the search filter values whenever the selected sub-categories change
  useEffect(() => {
    setSearchFilterValues(prevValues => ({
      ...prevValues,
      subCategory: selectedSubCategories
    }));
  }, [selectedSubCategories]);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>
      <ul className={styles.categoryList}>
        <li className={styles.categoryItem}>All categories</li>
        {categoryWithSubCategory.map((category) => (
          <li key={category._id} className={styles.categoryItem}>
            <div
              onClick={() => toggleCategory(category._id)}
              className={styles.categoryHeader}
            >
              {category.name} {openCategories[category._id] ? '▼' : '►'}
            </div>
            {openCategories[category._id] && category.subCategories.length > 0 && (
              <ul className={styles.subCategoryList}>
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory._id} className={styles.subCategoryItem}>
                    <input
                      type="checkbox"
                      id={subCategory._id}
                      name={subCategory.name}
                      // Check if sub-category is selected
                      checked={selectedSubCategories.includes(subCategory._id)}
                      // Handle change in checkbox state
                      onChange={() => handleSubCategoryChange(subCategory._id)}
                    />
                    <label htmlFor={subCategory._id}> {subCategory.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
