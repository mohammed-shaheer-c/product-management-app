import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb ';
import  AddProductPopup  from '../../components/common/OpenPopUp/AddProductPopup/AddProductPopup'

function ProductDetailPage() {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [ram, setRam] = useState('4 GB');

  // Function for add product popup
  const handleAddProductPopUpShow = () => setShowAddProductPopup(true);
  const handleAddProductPopUpClose = () => setShowAddProductPopup(false);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };
  // Function for add  product
  async function handleSaveProduct(data){
    try{
      console.log("data",data);

    }catch(error){

    }
  }

  useEffect(()=>{
    const dummyProducts = [
      {
        title: 'HP AMD Ryzen 3',
        variants: [
          { ram: '8GB', price: '500', quantity: 10 },
          { ram: '16GB', price: '700', quantity: 5 },
        ],
        subCategory: 'HP',
        description: 'High performance laptop with AMD Ryzen 3 processor.',
        images: ['image1_url', 'image2_url'],
      }
    ];
    
    setProductDetails(dummyProducts);
  },[])

  return (
    <>

    <div className="container mt-5 w-75">
    <BreadCrumb  buttonShow={false}  pathName={'Product details'}/>
      <div className="row  d-flex justify-content-center">
        {/* Image Section */}
        <div className="col-md-6">
          <div className="border">
            <img src="image_url" alt="Laptop" className="img-fluid p-3" />
          </div>
          <div className="d-flex justify-content-between mt-2">
            <img
              src="thumbnail_url"
              alt="Laptop Thumbnail"
              className="img-thumbnail"
              style={{ width: '100px' }}
            />
            <img
              src="thumbnail_url"
              alt="Laptop Thumbnail"
              className="img-thumbnail"
              style={{ width: '100px' }}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-md-6">
          <h3>HP AMD Ryzen</h3>
          <h4>$529.99</h4>
          <p className="text-success">In stock</p>
          <p>Hurry up! Only 34 products left in stock!</p>

          <div className="mb-3">
            <label htmlFor="ram" className="form-label">Ram:</label>
            <select
              id="ram"
              className="form-select"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
            >
              <option value="4 GB">4 GB</option>
              <option value="8 GB">8 GB</option>
              <option value="16 GB">16 GB</option>
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
              handleSaveProduct={handleSaveProduct} 
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductDetailPage;
