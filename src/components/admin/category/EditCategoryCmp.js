import axios from 'axios';
import LoadingCmp from '../../LoadingCmp';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditCategoryCmp(props) {
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const navigate = useNavigate()
    const [error,setError] = useState([]);

    useEffect(()=>{

        if(props.toedit)
        {
            setCategory(props.toedit);
            // setAllcheckbox({status:props.toedit.status});
            setLoading(false);
        }
},[props.toedit])

    const handleInput = (e) =>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value});
    }

    const updateCategory = (e)=>{
        e.preventDefault();
        const data = categoryInput;
        axios.put(`/api/update-category/${props.toedit.id}`,data).then(res=>{
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
                navigate('admin/view-category');
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
    <form onSubmit={updateCategory} >
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Principale</button>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Slug</label>
                    <input type="text" name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control'/>
                    <small className='text-danger'>{error.slug}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Nom</label>
                    <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control'/>
                    <small className='text-danger'>{error.name}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label" for="statusCheck">Status</label>
                    <input id="statusCheck" className='form-check-input' type="checkbox" name='status' onChange={handleInput} value={categoryInput.status}/>
                </div>
            </div>

        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Mise à jour</button>
    </form>
</div>
  )
}
