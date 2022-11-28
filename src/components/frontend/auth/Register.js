import axios from 'axios'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbare from '../../../layouts/frontend/Navbare'
import './Register.css'

function Register() {
const navigate = useNavigate()
    const [registerInput,setRegister] = useState({
    name: '',
    email:'',
    password:'',
    tel:'',
    error_list:[],
})

const handleInput = (e) =>{
    e.persist()
    setRegister({...registerInput, [e.target.name]:e.target.value})
}

const registerSubmit = (e) =>{
    e.preventDefault();

    const data = {
        name: registerInput.name,
        email:registerInput.email,
        password:registerInput.password,
        tel:registerInput.tel,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/register',data).then(res =>{
            if(res.data.status === 200){
                localStorage.setItem("auth_token",res.data.token)
                localStorage.setItem("auth_name",res.data.username)
                Swal.fire("Success",res.data.message,"success")
                navigate('/')
                }else{
                    setRegister({...registerInput,error_list: res.data.validation_errors})
                }
        })
    })
}
  return (
    <><Navbare/>
<div className='container py-5'>
    <div className='row justify-content-center'>
        <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-sm-10'>
                <div className='card shadow'>
                <Tabs defaultActiveKey="client" id="uncontrolled-tab-example" className="mb-3 justify-content-center text-center">
  <Tab eventKey="client" title="Client">
  <div className='px-5 pb-5 card-body'>
                    <div className="align-items-center mb-2 row"><div className="col"><h5 id="modalLabel">S'inscrire</h5></div><div className="col-auto"><p className="fs--1 text-600 mb-0">vous avez déjà un compte? <Link to="/login">Connexion</Link></p></div></div>
                        <form onSubmit={registerSubmit}>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                            <div className='form-group mb-3'>
                                <input placeholder='Nom et Prenom' type="" name="name" onChange={handleInput} value={registerInput.name} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.name}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <input placeholder='Adresse email' type="" name="email" onChange={handleInput} value={registerInput.email} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.email}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <input placeholder='Mot de passe' type="" name="password" onChange={handleInput} value={registerInput.password} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.password}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <input placeholder='Tél.' type="" name="tel" onChange={handleInput} value={registerInput.tel} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.tel}</span>
                            </div>
                            <div className="mb-3"><div className="form-check form-check"><input name="isAccepted" type="checkbox" id="acceptCheckbox" className="form-check-input"/><label htmlFor="acceptCheckbox" className="form-label form-check-label">acceptez <Link to="#">les conditions d'utilisation</Link> et <Link to="#">la politique de confidentialité</Link>. </label></div></div>
                            <div className="mb-4"><button type="submit" disabled="" className="w-100 btn btn-primary">S'inscrire</button></div>
                            <div className="w-100 position-relative text-center"><hr className="text-300"/><div className="divider-content-center">ou S'inscrire avec</div></div>
                            <div className="row mt-1">
                                <div className="col-5"><button style={{borderRadius:20+"px"}} className='btn btn-primary w-100'><i className="fab fa-facebook"></i> Facebook</button></div>
                                <div className="col-2"></div>
                                <div className="col-5"><button style={{borderRadius:20+"px"}} className='btn btn-danger w-100'><i className="fab fa-google"></i> Google</button></div>
                            </div>
                        </form>
                    </div>
  </Tab>
  <Tab eventKey="company" title="Société">
  <div className='px-5 pb-5 card-body'>
                    <div className="align-items-center mb-2 row"><div className="col"><h5 id="modalLabel">S'inscrire</h5></div><div className="col-auto"><p className="fs--1 text-600 mb-0">vous avez déjà un compte? <Link to="/login">Connexion</Link></p></div></div>
                        <form onSubmit={registerSubmit}>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                            <div className='form-group mb-3'>

                                <input placeholder='Nom Société' type="" name="name" onChange={handleInput} value={registerInput.name} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.name}</span>
                            </div>
                            <div className='form-group mb-3'>

                                <input placeholder='Adresse email' type="" name="email" onChange={handleInput} value={registerInput.email} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.email}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <input placeholder='Mot de passe' type="" name="password" onChange={handleInput} value={registerInput.password} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.password}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <input placeholder='Tél.' type="" name="tel" onChange={handleInput} value={registerInput.tel} className='form-control'/>
                                <span className='text-danger'>{registerInput.error_list.tel}</span>
                            </div>
                            <div className="mb-3"><div className="form-check form-check"><input name="isAccepted" type="checkbox" id="acceptCheckbox" className="form-check-input"/><label htmlFor="acceptCheckbox" className="form-label form-check-label">acceptez <Link to="#">les conditions d'utilisation</Link> et <Link to="#">la politique de confidentialité</Link>. </label></div></div>
                            <div className="mb-4"><button type="submit" disabled="" className="w-100 btn btn-primary">S'inscrire</button></div>
                            <div className="w-100 position-relative text-center"><hr className="text-300"/><div className="divider-content-center">ou S'inscrire avec</div></div>
                            <div className="row mt-1">
                                <div className="col-5"><button style={{borderRadius:20+"px"}} className='btn btn-primary w-100'><i className="fab fa-facebook"></i> Facebook</button></div>
                                <div className="col-2"></div>
                                <div className="col-5"><button style={{borderRadius:20+"px"}} className='btn btn-danger w-100'><i className="fab fa-google"></i> Google</button></div>
                            </div>
                        </form>
                    </div>
  </Tab>
</Tabs>

            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Register
