// src/components/AddCategoryPopup.js

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './AddCategoryPopup.module.css';

const AddCategoryPopup = ({ show, handleClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // onChange function 
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
    setErrorMessage('');
  };
  // Function for form submit
  const handleSubmit = () => {
    if (categoryName.trim() === '') {
      setErrorMessage('Category name cannot be empty or contain only spaces.');
      return;
    }

    handleAddCategory(categoryName.trim());
    setCategoryName('');
  
  };
  // Function for modal close
  const handleModalClose = () => {
    setCategoryName('');
    setErrorMessage('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered dialogClassName={styles.modalDialog}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName" className="mt-3">
            <Form.Label className={styles.formLabel}>Enter category name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter category name" 
              value={categoryName} 
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
        <Button variant="secondary" onClick={handleModalClose }>
          DISCARD
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryPopup;
