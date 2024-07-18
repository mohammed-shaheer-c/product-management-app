import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AddSubCategoryPopup.module.css';

const AddSubCategoryPopup = ({ show, handleClose, handleAddSubCategory, categoryList }) => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setSubCategoryName(e.target.value);
    setErrorMessage('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (selectedCategory === '' || subCategoryName.trim() === '') {
      setErrorMessage('Please select a category and enter a valid sub-category name.');
      return;
    }
    console.log(selectedCategory,subCategoryName);

    handleAddSubCategory(selectedCategory, subCategoryName.trim());
    setSubCategoryName('');
    setSelectedCategory('');
    handleClose();
  };

  // Function for modal close & clear previuos states
  const handleModalClose = () => {
    setSubCategoryName('');
    setSelectedCategory('');
    setErrorMessage('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered dialogClassName={styles.modalDialog}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Add Sub Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSelectCategory">
            <Form.Label className={styles.formLabel}>Select category</Form.Label>
            <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Select category</option>
              {categoryList?.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSubCategoryName" className="mt-3">
            <Form.Label className={styles.formLabel}>Enter sub category name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter sub category name" 
              value={subCategoryName} 
              onChange={handleInputChange} 
            />
            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="warning" onClick={handleSubmit}>
          ADD
        </Button>
        <Button variant="secondary" onClick={handleModalClose}>
          DISCARD
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubCategoryPopup;
