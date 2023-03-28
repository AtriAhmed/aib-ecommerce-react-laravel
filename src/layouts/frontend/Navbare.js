import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import './Navbare.css'


function Navbare() {

  const [results, setResults] = useState([])

  const [keyword, setKeyword] = useState("")

  const handleSearch = (e) => {
    e.persist()
    setKeyword(e.target.value)
    if (keyword)
      axios.get(`/api/search/${keyword}`).then(res => {
        if (res.data.status === 200) {
          setResults(res.data.results);
        }
      });
  }

  const [showSearchDD, setShowSearchDD] = useState(false);
  const showSearch = (e) => {
    setShowSearchDD(!show);
  }
  const hideSearch = e => {
    setShowSearchDD(false);
  }

  const [show, setShow] = useState(false);
  const showDropdown = (e) => {
    setShow(!show);
  }
  const hideDropdown = e => {
    setShow(false);
  }
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
          {windowDimenion.winWidth < 992 ? <><Link className='nav-link text-secondary' to="/cart"><i className="fas fa-shopping-cart"></i> <small>Panier</small></Link>
          </> : ''}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/contact"><small>Contact</small></Link></div>
              <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/about"><small>A propos</small></Link></div>
              {windowDimenion.winWidth < 992 ? AuthButtons : ''}
            </Nav>
          </Navbar.Collapse>

          {windowDimenion.winWidth > 992 ? <><div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/cart"><i className="fas fa-shopping-cart"></i> <small>Panier</small></Link></div>
            {AuthButtons}</> : ''}
        </Container>
      </Navbar>
      <Navbar bg="white" expand="lg" >
        <Container>
          <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/home"><small>Acceuil</small></Link></div>
          <div className="nav-item ms-3"><Link className="nav-link text-secondary" to="/repair-home"><small>Réparation</small></Link></div>
          <span className='text-secondary'>

            <NavDropdown show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown} className='text-secondary' title="Tous les rayons" id="basic-nav-dropdown">
              {categoryList.map((item, idx) => {
                return (<NavDropdown.Item as={Link} key={idx} className="nav-link text-secondary" to={`/collections/${item.slug}`} ><small>{item.name}</small></NavDropdown.Item>)
              })
              }</NavDropdown></span>
          <div className='input-group  mx-4'><i className="ci-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            <input type="text" name="search" onFocus={showSearch} onBlur={hideSearch} className='w-100 form-control rounded-start' placeholder="Rechercher des produits" onChange={handleSearch}></input>
            {showSearchDD ? <div className='card search-dropdown w-100 mydropdown'>
              {
                results.map((item) => {
                  return <Link key={item.id} to={`/collections/${item.category.slug}/${item.slug}`} className='m-2'>{item.name}</Link>
                })
              }
            </div> : ''}
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Navbare
