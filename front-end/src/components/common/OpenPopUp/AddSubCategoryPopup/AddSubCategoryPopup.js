import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import styles from './AddSubCategoryPopup.module.css';

const AddSubCategoryPopup = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Add Sub Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSelectCategory">
            <Form.Label className={styles.formLabel}>Select category</Form.Label>
            <Form.Control as="select">
              <option>Select category</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formSubCategoryName" className="mt-3">
            <Form.Label className={styles.formLabel}>Enter sub category name</Form.Label>
            <Form.Control type="text" placeholder="Enter sub category name" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="primary" onClick={handleClose}>
          ADD
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          DISCARD
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubCategoryPopup;
