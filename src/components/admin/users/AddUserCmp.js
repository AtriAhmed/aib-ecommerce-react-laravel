import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddUserCmp() {
    function resetUserInput(){
        setUser({
            name:'',
            email:'',
            password:'',
            tel:'',
            errorsList:[],
        })
    }
    const navigate = useNavigate()
    const [userInput,setUser] = useState({
    name: '',
    email:'',
    password:'',
    tel:'',
    errorsList:[],
})

const handleInput = (e) =>{
    e.persist()
    setUser({...userInput, [e.target.name]:e.target.value})
}

const userSubmit = (e) =>{
    e.preventDefault();

    const data = {
        name: userInput.name,
        email:userInput.email,
        password:userInput.password,
        tel:userInput.tel,
    }

        axios.post('/api/add-user',data).then(res =>{
            if(res.data.status === 200){
                Swal.fire("Success",res.data.message,"success")
                resetUserInput()
                }else{
                    setUser({...userInput,errorsList: res.data.validation_errors})
                }
        })
}

  return (

    <form onSubmit={userSubmit} id='USER_FORM'>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Nom</label>
                    <input type="text" name='name' onChange={handleInput} value={userInput.name} className='form-control'/>
                    <small className='text-danger'>{userInput.errorsList.name}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input type="text" name='email' onChange={handleInput} value={userInput.email} className='form-control'/>
                    <small className='text-danger'>{userInput.errorsList.email}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Mot de passe</label>
                    <input type="text" name='password' onChange={handleInput} value={userInput.password} className='form-control'/>
                    <small className='text-danger'>{userInput.errorsList.password}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Tél.</label>
                    <input type="text" name='tel' onChange={handleInput} value={userInput.tel} className='form-control'/>
                    <small className='text-danger'>{userInput.errorsList.tel}</small>
                </div>
            </div>
        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
    </form>

  )
}

export default AddUserCmp
