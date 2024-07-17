import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import styles from './AddCategoryPopup.module.css';

const AddCategoryPopup = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSubCategoryName" className="mt-3">
            <Form.Label className={styles.formLabel}>Enter category name</Form.Label>
            <Form.Control type="text" placeholder="Enter category name" />
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

export default AddCategoryPopup;
