
import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button ,Offcanvas ,Image} from 'react-bootstrap';
import Style from './Header.module.css'
import { SearchFilterContext } from '../../../context/SearchFilterContext';
function Header() {
  const navigate = useNavigate();
  const { searchFilterValues, setSearchFilterValues,store } = useContext(SearchFilterContext);
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  // Function for logout
  const logOut = ()=>{
    localStorage.removeItem('authUser');
    localStorage.removeItem('wishlist');
    navigate('/login');
  }

  // Store the name
  const handleNameChange = (e) => {
    setSearchFilterValues(prevState => ({
      ...prevState,
      name: e.target.value.trim()
    }));
  };

  return (
    <>
    <Navbar  expand="lg" className={Style.navbarCustom}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Form className={`d-flex mx-auto ${Style.searchForm}`}>
        <FormControl
          type="text"
          placeholder="Search any things"
          className={` ${Style.formControl}`}
          value={searchFilterValues.name} 
          onChange={handleNameChange} 
        />
        <Button variant="warning h-25 " className={Style.searchButton}>Search</Button>
      </Form>
      <Nav className={`ml-auto ${Style.options}`}>
        <Nav.Link className={Style.navLink}><span className={Style.navLink} role="img" aria-label="favorite">❤️<span style={{color : 'orange'}}>{store?.length}</span></span></Nav.Link>
        <Nav.Link onClick={logOut}  className={Style.navLink}>Sign out</Nav.Link>
        <Nav.Link  className={Style.navLink} onClick={handleShowCart}><span role="img" aria-label="cart"  >🛒 Cart</span> </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>❤️ Items</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {store.length > 0 ? (
          store.map((product, index) => (
            <div key={index} className="d-flex mb-3 align-items-center border-bottom pb-3">
              <Image
                src={product.images?.[0]?.filename}
                width={60}
                height={60}
                className="me-3"
                rounded
              />
              <div className="flex-grow-1">
                <h6 className="mb-1">{product.title}</h6>
                <p className="mb-1 text-danger" >${product.variants[0]?.price}</p>
                <div className="d-flex align-items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`me-1 ${i < product.rating ? 'text-warning' : 'text-muted'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              {/* <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleWishlistClick(product)}
              >
                &times;
              </Button> */}
            </div>
          ))
        ) : (
          <p>Your cart is currently empty.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  </>
  )
}

export default Header
{/* <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
<Offcanvas.Header closeButton>
  <Offcanvas.Title>❤️ Items</Offcanvas.Title>
</Offcanvas.Header>
<Offcanvas.Body>
//   {/* Add your cart content here */}
// <p>Your cart is currently empty.</p>
// </Offcanvas.Body>
// </Offcanvas> */}