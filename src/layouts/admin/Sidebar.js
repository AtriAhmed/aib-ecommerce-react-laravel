import React from 'react'
import { Accordion } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
const Sidebar = () => {
    
  return (
    <nav className="sidebar bg-dark">
  <NavLink to="/admin/view-category" className="text-white"><div className='row'><div className='col-3'><i className="fas fa-home"></i></div><div className='col-8'>Categories</div></div></NavLink>
  <NavLink to="/admin/view-product" className="text-white"><div className='row'><div className='col-3'><i className="fas fa-layer-group"></i></div><div className='col-8'>Products</div></div></NavLink>
  <NavLink to="/admin/view-users" className="text-white"><div className='row'><div className='col-3'><i className="fas fa-users"></i></div><div className='col-8'>Utilisateurs</div></div></NavLink>
  <NavLink to="/admin/orders" className="text-white"><div className='row'><div className='col-3'><i className="fas fa-school"></i></div><div className='col-8'>Commandes</div></div></NavLink>
  <NavLink to="/admin/not-available" className="text-white"><div className='row'><div className='col-3'><i className="fas fa-th"></i></div><div className='col-8'>Factures</div></div></NavLink>
  <Accordion>
      <Accordion.Item className='bg-dark' eventKey="0">
        <Accordion.Header><div className='row'><div className='col-4'><i className="fas fa-calendar-alt"></i></div><div className='col-8'>Réparation</div></div></Accordion.Header>
        <Accordion.Body className='bg-dark'>
        <NavLink to="/admin/bdtypes" className="text-white"><i className="fas fa-calendar-alt"></i> Bdt</NavLink>
        <NavLink to="/admin/bdsheets" className="text-white"><i className="fas fa-calendar-alt"></i> bds</NavLink>
        <NavLink to="/admin/devis" className="text-white"><i className="fas fa-calendar-alt"></i> devi</NavLink>    
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
 
                </nav>
  )
}

export default Sidebar
