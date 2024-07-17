import React, { useState } from 'react';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb ';

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [ram, setRam] = useState('4 GB');

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return (
    <>

    <div className="container mt-5 w-75">
    <BreadCrumb buttonShow={false} pathName={'Product details'}/>
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
            <button className="btn btn-warning">Edit product</button>
            <button className="btn btn-primary">Buy it now</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductDetailPage;
