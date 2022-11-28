import axios from 'axios';
import React,{useState,useEffect} from 'react'
import  {useNavigate}  from 'react-router';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import LoadingCmp from '../../LoadingCmp';
function EditUser() {
    const [loading, setLoading] = useState(true);
    const [userInput, setUser] = useState([]);
    const navigate = useNavigate()
    const {user_id} = useParams();
    const [errorsList,setError] = useState([]);
    useEffect(()=>{
        axios.get(`/api/edit-user/${user_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setUser(res.data.user);
            }
            else if(res.data.status === 404)
            {
                Swal.fire("Error",res.data.message,"error");
                navigate('/admin/view-users');
            }
            setLoading(false);
        });
    },[user_id])
    const handleInput = (e) =>{
        e.persist();
        setUser({...userInput, [e.target.name]: e.target.value});
    }

    const updateUser = (e)=>{
        e.preventDefault();
        const data = userInput;
        axios.put(`/api/update-user/${user_id}`,data).then(res=>{
            if(res.data.status === 200)
            {
                Swal.fire("Success",res.data.message,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                Swal.fire("All Fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                Swal.fire("Error",res.data.message,"error");
                navigate('admin/view-user');
            }
        });
    }
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
  return (
    <div className='container px-4'>
        <div className='card mt-4'>
    <div className="card-header">
        <h4>Modifier Utilisateur
        <Link to="/admin/view-user" className="btn btn-primary btn-sm float-end">Retour</Link>
        </h4>
    </div>
    <div className="card-body">
    <form onSubmit={updateUser} id='USER_FORM'>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Nom</label>
                    <input type="text" name='name' onChange={handleInput} value={userInput.name} className='form-control'/>
                    <small className='text-danger'>{errorsList.name}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input type="text" name='email' onChange={handleInput} value={userInput.email} className='form-control'/>
                    <small className='text-danger'>{errorsList.email}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Mot de passe</label>
                    <input type="text" placeholder='********' name='password' onChange={handleInput} value={userInput.password} className='form-control'/>
                    <small className='text-danger'>{errorsList.password}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Tél.</label>
                    <input type="text" name='tel' onChange={handleInput} value={userInput.tel} className='form-control'/>
                    <small className='text-danger'>{errorsList.tel}</small>
                </div>
            </div>
        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
    </form>
</div>
</div>
    </div>
  )
}

export default EditUser
