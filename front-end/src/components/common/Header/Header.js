
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button ,Offcanvas } from 'react-bootstrap';
import Style from './Header.module.css'

function Header() {
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

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
        />
        <Button variant="warning h-25 " className={Style.searchButton}>Search</Button>
      </Form>
      <Nav className={`ml-auto ${Style.options}`}>
        <Nav.Link className={Style.navLink}><span className={Style.navLink} role="img" aria-label="favorite">❤️</span></Nav.Link>
        <Nav.Link  className={Style.navLink}>Sign out</Nav.Link>
        <Nav.Link  className={Style.navLink} onClick={handleShowCart}><span role="img" aria-label="cart"  >🛒 Cart</span> </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>❤️ Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Add your cart content here */}
      <p>Your cart is currently empty.</p>
    </Offcanvas.Body>
  </Offcanvas>
  </>
  )
}

export default Header
