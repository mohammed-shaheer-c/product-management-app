import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Style from './Header.module.css'

function Header() {
  return (
    <Navbar  expand="lg" className={Style.navbarCustom}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Form className={`d-flex mx-auto ${Style.searchForm}`}>
        <FormControl
          type="text"
          placeholder="Search any things"
          className={` ${Style.formControl}`}
        />
        <Button variant="warning h-25 mt-2 me-5" className={Style.searchButton}>Search</Button>
      </Form>
      <Nav className="ml-auto">
        <Nav.Link href="#" className={Style.navLink}><span role="img" aria-label="favorite">❤️</span></Nav.Link>
        <Nav.Link href="#" className={Style.navLink}>Sign in</Nav.Link>
        <Nav.Link href="#" className={Style.navLink}><span role="img" aria-label="cart">🛒 Cart</span></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header
