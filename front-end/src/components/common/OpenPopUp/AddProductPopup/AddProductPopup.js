import React, { useReducer, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import styles from './AddProductPopup.module.css';

// Initial state for a new product
const initialState = {
  title: '',
  variants: [{ ram: '', price: '', quantity: 1 }],
  subCategory: '',
  description: '',
  images: [],
};

// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_VARIANT':
      return { ...state, variants: [...state.variants, { ram: '', price: '', quantity: 1 }] };
    case 'UPDATE_VARIANT':
      return {
        ...state,
        variants: state.variants?.map((variant, index) =>
          index === action.index ? { ...variant, [action.key]: action.value } : variant
        ),
      };
    case 'DELETE_VARIANT':
      return { ...state, variants: state.variants.filter((_, index) => index !== action.index) };
    case 'SET_INITIAL_STATE':
      return action.initialState;
    default:
      return state;
  }
};

const AddProductPopup = ({ show, handleClose, product, handleSaveProduct }) => {
  console.log("product",product);
  // Use the useReducer hook to manage the form state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Set the initial state when the product prop changes
  useEffect(() => {
    if (product) {
      dispatch({
        type: 'SET_INITIAL_STATE',
        initialState: {
          title: product.title,
          variants: product.variants,
          subCategory: product.subCategory,
          description: product.description,
          images: product.images,
        },
      });
    }
  }, [product]);

  // Handle changes to form fields
  const handleFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  // Handle changes to variant fields
  const handleVariantChange = (index, key, value) => {
    dispatch({ type: 'UPDATE_VARIANT', index, key, value });
  };

  // Add a new variant
  const addVariant = () => {
    dispatch({ type: 'ADD_VARIANT' });
  };

  // Delete an existing variant
  const deleteVariant = (index) => {
    dispatch({ type: 'DELETE_VARIANT', index });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveProduct(state);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Title input field */}
          <Form.Group controlId="formTitle">
            <Form.Label className={styles.formLabel}>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="HP AMD Ryzen 3"
              value={state.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </Form.Group>

          {/* Variants section */}
          <Form.Label className={styles.formLabel}>Variants</Form.Label>
          {state.variants?.map((variant, index) => (
            <InputGroup className={styles.inputGroup} key={index}>
              <Form.Control
                required
                type="text"
                placeholder="RAM"
                value={variant.ram}
                onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
              />
              <Form.Control
                required
                type="text"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
              />
              <Form.Control
                required
                type="number"
                placeholder="QTY"
                value={variant.quantity}
                onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
              />
              {index !== 0 && (
                <Button variant="danger" onClick={() => deleteVariant(index)}>
                  Delete
                </Button>
              )}
            </InputGroup>
          ))}
          <Button variant="secondary" onClick={addVariant} className={styles.addVariantsBtn}>
            Add Variants
          </Button>

          {/* Sub-category select field */}
          <Form.Group controlId="formSubCategory" className="mt-3">
            <Form.Label className={styles.formLabel}>Sub category</Form.Label>
            <Form.Control
              as="select"
              value={state.subCategory}
              onChange={(e) => handleFieldChange('subCategory', e.target.value)}
            >
              <option value="">Select Sub Category</option>
              <option>HP</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>

          {/* Description text area */}
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label className={styles.formLabel}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="The Ryzen 7 is a more high-end processor that compares to the Intel..."
              value={state.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
          </Form.Group>

          {/* Image upload section */}
          <Form.Group controlId="formUploadImage" className="mt-3">
            <Form.Label className={styles.formLabel}>Upload Image</Form.Label>
            <div className={styles.imageUpload}>
              <div className={styles.uploadedImages}>
                <img src="image1_url" alt="Upload1" />
                <img src="image2_url" alt="Upload2" />
                <div className={styles.uploadIcon}>
                  {/* <Form.File /> */}
                </div>
              </div>
            </div>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Discard
            </Button>
            <Button variant="warning" type="submit">
              {product ? 'Save Changes' : 'Add Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductPopup;
