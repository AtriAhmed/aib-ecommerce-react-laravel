import axios from 'axios';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddUserCmp from './AddUserCmp';

function User() {

  return (
<div className='container-fluid px-4'>
<div className='card mt-4'>
    <div className="card-header">
        <h4>Ajouter Utilisateur
        <Link to="/admin/view-users" className="btn btn-primary btn-sm float-end">Consulter Utilisateur</Link>
        </h4>
    </div>
    <div className="card-body">
<AddUserCmp/>
</div>
</div>
</div>
  )
}

export default User
