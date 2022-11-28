import axios from 'axios';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Navbare from '../../../layouts/frontend/Navbare'

function Login() {
    const navigate = useNavigate()
const [loginInput, setLogin] = useState({
    email:'',
    password:'',
    error_list: []
})

    const handleInput = (e)=>{
        e.persist();
        setLogin({...loginInput, [e.target.name]:e.target.value})
    }

    const loginSubmit = (e)=>{
        e.preventDefault();

        const data = {
            email:loginInput.email,
            password:loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('api/login', data).then(res=>{
            if(res.data.status===200){
                localStorage.setItem("auth_token",res.data.token)
                localStorage.setItem("auth_name",res.data.username)
                Swal.fire("Success",res.data.message,"success")
                if(res.data.role === 'admin')
                {
                    navigate('/admin/dashboard');
                }
                else
                {
                    navigate('/home');
                }
            }
            else if(res.data.status === 401){
                Swal.fire("Warning",res.data.message,"warning")
            }
            else
            {
                console.log(res.data.validation_errors)
                setLogin({...loginInput, error_list:res.data.validation_errors})
            }
        })
    });
    }
  return (
    <><Navbare/>
<div className='container py-5'>
    <div className='row justify-content-center pt-5'>
        <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-sm-10'>
            <div className='card shadow'>
                    <div className='p-4 p-sm-5 card-body'>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5>Connexion</h5>
                        <p className="fs--1 text-600 mb-0">ou <Link to="/register">Créer un Compte</Link></p>
                        </div>
                        <form onSubmit={loginSubmit}>
                            <div className='form-group mb-3'>
                            <input placeholder="Adresse email" type="email" name="email" onChange={handleInput} value={loginInput.email} className='form-control'/>
                                <span className='text-danger'>{loginInput.error_list.email}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <input placeholder="Mot de passe" type="password" name="password" onChange={handleInput} value={loginInput.password} className='form-control'/>
                                <span className='text-danger'>{loginInput.error_list.password}</span>
                            </div>
                            <div className="justify-content-between align-items-center row"><div className="col-auto"><div className="form-check"><input name="remember" type="checkbox" id="rememberMe" className="form-check-input"/><label htmlFor="rememberMe" className="mb-0 form-check-label">Se rappeler de moi</label></div></div><div className="col-auto"><Link className="fs--1 mb-0" to="/authentication/simple/forgot-password">Mot de passe oublié?</Link></div></div>
                            <div><button type="submit" disabled="" color="primary" className="mt-3 w-100 btn btn-primary">Se connecter</button></div>
                            <div className="w-100 position-relative text-center mt-4"><hr className="text-300"/><div className="divider-content-center">ou Connexion avec</div></div>
                            <div className="row mt-1">
                                <div className="col-5"><button style={{borderRadius:20+"px"}} className='btn btn-primary w-100'><i className="fab fa-facebook"></i> Facebook</button></div>
                                <div className="col-2"></div>
                                <div className="col-5"><button style={{borderRadius:20+"px"}} className='btn btn-danger w-100'><i className="fab fa-google"></i> Google</button></div>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Login
