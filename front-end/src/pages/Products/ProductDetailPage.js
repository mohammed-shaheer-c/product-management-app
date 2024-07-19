import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb ';
import AddProductPopup from '../../components/common/OpenPopUp/AddProductPopup/AddProductPopup';
import { getCategoryWithSubCategory } from '../../services/categoryService';
import { getParticularProduct, editProduct } from '../../services/productService';

function ProductDetailPage() {
  // State variables
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [categoryWithSubCategory, setCategoryWithSubCategory] = useState([]);
  const [productDetails, setProductDetails] = useState(null); // Initialize with null
  const [quantity, setQuantity] = useState(1);
  const [ram, setRam] = useState(''); // Initialize with an empty string

  // For fetching params id from the URL
  const { id } = useParams();

  // Function to show the add product popup
  const handleAddProductPopUpShow = () => setShowAddProductPopup(true);

  // Function to close the add product popup
  const handleAddProductPopUpClose = () => setShowAddProductPopup(false);

  // Function to handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  // Function to handle saving product details (for the popup)
  async function handleSaveProduct(data) {
    try {
      data.productId = id
      let result = await editProduct(data);
      if (result.code === 200) {
        alert('Product updated successfully');
      } else {
        alert(result.message  || 'Product updated failed');
      }
    } catch (error) {
      console.log("error", error);
      alert('Product updated failed');
    }
  }

  // Memoized calculation of subcategories from categories
  const subCategories = useMemo(() => {
    return categoryWithSubCategory.reduce((acc, category) => {
      if (category.subCategories && category.subCategories.length > 0) {
        acc.push(...category.subCategories.map(subCategory => ({
          id: subCategory._id,
          name: subCategory.name,
          categoryId: category._id
        })));
      }
      return acc;
    }, []);
  }, [categoryWithSubCategory]);

  // Function to fetch all categories with subcategories
  async function getAllCategories() {
    try {
      let result = await getCategoryWithSubCategory();
      setCategoryWithSubCategory(result.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  // Effect to fetch categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []);

  // Function to fetch product details based on the URL parameter 'id'
  async function getProductDetails() {
    try {
      if (id) {
        let productDetails = await getParticularProduct(id);
        if (productDetails.code === 200) {
          setProductDetails(productDetails.data);
          setRam(productDetails.data.variants[0]?.ram || ''); // Set initial RAM value
        } else {
          alert('Product data fetch failed');
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  // Effect to fetch product details when 'id' changes
  useEffect(() => {
    getProductDetails();
  }, [id]);

  // Conditional rendering: show a loading indicator while fetching product details

  const variantDataBasedOnRam = useMemo(() => {
    if (productDetails?.variants && productDetails?.variants?.length > 0) {
      return productDetails?.variants.filter(item => item.ram === ram);
    }
    return [];
  }, [productDetails?.variants, ram]);
  if (!productDetails) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className="container mt-5 w-75">
        <BreadCrumb buttonShow={false} pathName={'Product details'} />
        <div className="row d-flex justify-content-center">
          {/* Image Section */}
          <div className="col-md-6">
            <div className="border">
              <img
                src={productDetails.images[0]?.filename || 'default_image_url'}
                alt={productDetails.title}
                className="img-fluid p-3"
              />
            </div>
            <div className="d-flex justify-content-between mt-2">
              {productDetails.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image.filename}
                  alt={`${productDetails.title} Thumbnail ${index + 1}`}
                  className="img-thumbnail"
                  style={{ width: '100px' }}
                />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-md-6">
            <h3>{productDetails.title}</h3>
            <h4>${variantDataBasedOnRam[0]?.price.toFixed(2)}</h4>
            <p className="text-success">In stock</p>
            <p className="text-black">Hurry up! Only {variantDataBasedOnRam[0].quantity} products left in stock!</p>

            <div className="mb-3">
              <label htmlFor="ram" className="form-label">Ram:</label>
              <select
                id="ram"
                className="form-select"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
              >
                {productDetails.variants.map((variant, index) => (
                  <option key={index} value={variant.ram}>{variant.ram}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <input
                  type="text"
                  id="quantity"
                  className="form-control text-center mx-2 w-25"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button onClick={handleAddProductPopUpShow} type='button' className="btn btn-warning">Edit product</button>
              <button className="btn btn-primary">Buy it now</button>
            </div>
            <AddProductPopup
              show={showAddProductPopup}
              handleClose={handleAddProductPopUpClose}
              product={productDetails}
              subCategories={subCategories}
              handleSaveProduct={handleSaveProduct}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
