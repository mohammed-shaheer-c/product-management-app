import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import styles from './AddProductPopup.module.css';

const AddProductPopup = ({ show, handleClose }) => {
  const [variants, setVariants] = useState([
    { ram: '4 GB', price: '529.99', quantity: 1 },
    { ram: '8 GB', price: '529.99', quantity: 3 }
  ]);

  const handleVariantChange = (index, key, value) => {
    const newVariants = [...variants];
    newVariants[index][key] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { ram: '', price: '', quantity: 1 }]);
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
    <Modal.Header closeButton className={styles.modalHeader}>
      <Modal.Title className={styles.modalTitle}>Add Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label className={styles.formLabel}>Title</Form.Label>
          <Form.Control type="text" placeholder="HP AMD Ryzen 3" />
        </Form.Group>
        <Form.Label className={styles.formLabel}>Variants</Form.Label>
        {variants.map((variant, index) => (
          <InputGroup className={styles.inputGroup} key={index}>
            <Form.Control
              type="text"
              placeholder="RAM"
              value={variant.ram}
              onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Price"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="QTY"
              value={variant.quantity}
              onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
            />
          </InputGroup>
        ))}
        <Button variant="secondary" onClick={addVariant} className={styles.addVariantsBtn}>
          Add Variants
        </Button>
        <Form.Group controlId="formSubCategory" className="mt-3">
          <Form.Label className={styles.formLabel}>Sub category</Form.Label>
          <Form.Control as="select">
            <option>HP</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label className={styles.formLabel}>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="The Ryzen 7 is a more high-end processor that compares to the Intel..." />
        </Form.Group>
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
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Discard
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default AddProductPopup;


// import React, { useState } from 'react';
// import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
// import styles from './AddProductPopup.module.css';

// const AddProductPopup = ({ show, handleClose }) => {
//   const [variants, setVariants] = useState([
//     { ram: '4 GB', price: '529.99', quantity: 1 },
//     { ram: '8 GB', price: '529.99', quantity: 3 }
//   ]);

//   const [formFields, setFormFields] = useState({
//     title: '',
//     subCategory: 'HP',
//     description: '',
//     images: []
//   });

//   const [errorMessage, setErrorMessage] = useState({
//     titleErrorMsg: '',
//     descriptionErrorMsg: ''
//   });

//   const handleVariantChange = (index, key, value) => {
//     const newVariants = [...variants];
//     newVariants[index][key] = value;
//     setVariants(newVariants);
//   };

//   const addVariant = () => {
//     setVariants([...variants, { ram: '', price: '', quantity: 1 }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formFields.title.trim() === '') {
//         setErrorMessage((prev) => ({
//           ...prev,
//           titleErrorMsg: 'Title is required.'
//         }));
//         return;
//       }

//       if (formFields.description.trim() === '') {
//         setErrorMessage((prev) => ({
//           ...prev,
//           descriptionErrorMsg: 'Description is required.'
//         }));
//         return;
//       }

//       // Clear errors if no validation errors
//       setErrorMessage({
//         titleErrorMsg: '',
//         descriptionErrorMsg: ''
//       });

//       // Proceed with your submit logic here (e.g., API call or further processing)
//       // handleClose(); // Close modal after successful submission
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormFields((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
//       <Modal.Header closeButton className={styles.modalHeader}>
//         <Modal.Title className={styles.modalTitle}>Add Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formTitle">
//             <Form.Label className={styles.formLabel}>Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="HP AMD Ryzen 3"
//               name="title"
//               value={formFields.title}
//               onChange={handleChange}
//             />
//             {errorMessage.titleErrorMsg && <span className={styles.errorMsg}>{errorMessage.titleErrorMsg}</span>}
//           </Form.Group>
//           <Form.Label className={styles.formLabel}>Variants</Form.Label>
//           {variants.map((variant, index) => (
//             <InputGroup className={styles.inputGroup} key={index}>
//               <Form.Control
//                 type="text"
//                 placeholder="RAM"
//                 value={variant.ram}
//                 onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
//               />
//               {/* Other variant inputs */}
//             </InputGroup>
//           ))}
//           <Button variant="secondary" onClick={addVariant} className={styles.addVariantsBtn}>
//             Add Variants
//           </Button>
//           <Form.Group controlId="formSubCategory" className="mt-3">
//             <Form.Label className={styles.formLabel}>Sub category</Form.Label>
//             <Form.Control
//               as="select"
//               name="subCategory"
//               value={formFields.subCategory}
//               onChange={handleChange}
//             >
//               <option>HP</option>
//               {/* Add more options as needed */}
//             </Form.Control>
//           </Form.Group>
//           <Form.Group controlId="formDescription" className="mt-3">
//             <Form.Label className={styles.formLabel}>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="The Ryzen 7 is a more high-end processor that compares to the Intel..."
//               name="description"
//               value={formFields.description}
//               onChange={handleChange}
//             />
//             {errorMessage.descriptionErrorMsg && <span className={styles.errorMsg}>{errorMessage.descriptionErrorMsg}</span>}
//           </Form.Group>
//           {/* Upload Image section */}
//           {/* Ensure you handle image upload logic */}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Discard
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Add
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddProductPopup;
