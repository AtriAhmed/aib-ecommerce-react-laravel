import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import './NavbarRepair.css'


function NavbarRepair() {
  const [categoryList, setCategoryList] = useState([]);
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])

  useEffect(() => {
    axios.get('/api/getCategory').then(res => {
      if (res.data.status === 200) {
        setCategoryList(res.data.category);
      }
    });
  }, [])

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/logout').then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        Swal.fire("Success", res.data.message, "success").then(() => {
          window.location = "http://ecommerce.advanceticsoft.com";
        });
      }
    })
  }
  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <>
        <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/login"><i className="fas fa-sign-in-alt"></i> <small>Connexion</small></Link></div>
        <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/register"><i className="fas fa-user-plus"></i> <small>Inscription</small></Link></div>
      </>
    )
  }
  else {
    AuthButtons = (
      <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="" onClick={logoutSubmit}><small>Se déconnecter</small> <i className="fas fa-sign-out-alt"></i></Link></div>
    )
  }
  return (
    <>
      <Navbar bg="white" expand="lg">
        <Container>
          <Navbar.Brand href="/home">{windowDimenion.winWidth > 992 ? <img src='/images/logo-aib-big.png' alt="imag" height={60 + "px"} /> : <img src='/images/aib-logo.png' alt="imag" height={60 + "px"} />} </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/contact"><small>Contact</small></Link></div>
              <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/about"><small>A propos</small></Link></div>
              {windowDimenion.winWidth < 992 ? AuthButtons : ''}
            </Nav>
          </Navbar.Collapse>

          {windowDimenion.winWidth > 992 ? <>{AuthButtons}</> : ''}
        </Container>
      </Navbar>
      <Navbar bg="white" expand="lg" >
        <Container>
          <Nav className='me-auto'>
            <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/repair-home"><small>Acceuil</small></Link></div>
            <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/home"><small>Achat</small></Link></div>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarRepair
