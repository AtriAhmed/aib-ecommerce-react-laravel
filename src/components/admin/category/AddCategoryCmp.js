import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function AddCategoryCmp() {
    const [categoryInput, setCategory] = useState({
        slug:'',
        name:'',
        descrip:'',
        status:'',
        errorsList:[],
        });

        const handleInput = (e)=>{
            e.persist();
            setCategory({...categoryInput,[e.target.name]:e.target.value})
        }

        const submitCategory = (e)=>{
            e.preventDefault();
            const data = {
                slug:categoryInput.slug,
                name:categoryInput.name,
                description:categoryInput.descrip,
            }
            axios.post('api/store-category',data).then(res=>{
                if(res.data.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    document.getElementById('CATEGORY_FORM').reset();
                }
                else if(res.data.status=== 400)
                {
                    setCategory({...categoryInput,errorsList:res.data.errors});
                }
            })
        }

  return (

    <form onSubmit={submitCategory} id='CATEGORY_FORM'>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Slug</label>
                    <input type="text" name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control'/>
                    <small className='text-danger'>{categoryInput.errorsList.slug}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Nom</label>
                    <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control'/>
                    <small className='text-danger'>{categoryInput.errorsList.slug}</small>
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea name="descrip" onChange={handleInput} value={categoryInput.descrip} className='form-control'></textarea>
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label" htmlFor="statusCheck">Status</label>
                    <input id="statusCheck" className='form-check-input' type="checkbox" name='status' onChange={handleInput} value={categoryInput.status}/>
                </div>
            </div>
        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
    </form>

  )
}

export default AddCategoryCmp
