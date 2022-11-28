import axios from 'axios';
import React,{useState,useEffect} from 'react'
import  {useNavigate}  from 'react-router';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import LoadingCmp from '../../LoadingCmp';
function CreateDevi() {
    const [loading, setLoading] = useState(true);
    const [deviInput, setDevi] = useState([]);
    const navigate = useNavigate()
    const {bds_id} = useParams();
    const [error,setError] = useState([]);
    useEffect(()=>{
        axios.get(`/api/get-bds/${bds_id}`).then(res=>{
            if(res.data.status === 200)
            {
                setDevi({...res.data.bdsheet, bds_id:res.data.bdsheet.id});
            }
            else if(res.data.status === 404)
            {
                Swal.fire("Error",res.data.message,"error");
                navigate('/admin/bdsheets');
            }
            setLoading(false);
        });
    },[bds_id])
    const handleInput = (e) =>{
        e.persist();
        setDevi({...deviInput, [e.target.name]: e.target.value});
    }

    const createDevi = (e)=>{
        e.preventDefault();
        const data = deviInput;
        axios.post(`/api/create-devi`,data).then(res=>{
            if(res.data.status === 200)
            {
                Swal.fire("Success",res.data.message,"success");
                setError([]);
            }
            else if(res.data.status === 422)
            {
                Swal.fire("Error","Tous les champs sont obligatoires","error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                Swal.fire("Error",res.data.message,"error");
                navigate('admin/bdsheets');
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
        <h4>Créer Devi
        <Link to="/admin/bdsheets" className="btn btn-primary btn-sm float-end">Retour</Link>
        </h4>
    </div>
    <div className="card-body">
    <form onSubmit={createDevi} >
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Principale</button>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>ID Fiche</label>
                    <input type="text" name='bds_id' value={deviInput.bds_id} className='form-control' readOnly/>
                </div>
                <div className="form-group mb-3">
                    <label>ID utilisateur</label>
                    <input type="text" name='user_id' value={deviInput.user_id} className='form-control' readOnly/>
                </div>
                <div className="form-group mb-3">
                    <label>Num série</label>
                    <input type="text" name='numS' value={deviInput.numS} className='form-control' readOnly/>
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea name="descrip" onChange={handleInput} value={deviInput.descrip} className='form-control'></textarea>
                    <small className='text-danger'>{error.descrip}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Frais</label>
                    <input type="text" name='costs' onChange={handleInput} value={deviInput.costs} className='form-control'/>
                    <small className='text-danger'>{error.costs}</small>
                </div>
            </div>
        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Create Devi</button>
    </form>
</div>
</div>
    </div>
  )
}

export default CreateDevi
