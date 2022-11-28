import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function AddBDTCMP(){
    function resetBDT(){
        setBDT({
            type:'',
            descrip:'',
            costs:'',
            errorsList:[],
        })
    }
    const [bdtInput, setBDT] = useState({
        type:'',
        descrip:'',
        costs:'',
        errorsList:[],
        });

        const handleInput = (e)=>{
            e.persist();
            setBDT({...bdtInput,[e.target.name]:e.target.value})
        }

        const submitBDT = (e)=>{
            e.preventDefault();
            const data = {
                type:bdtInput.type,
                descrip:bdtInput.descrip,
                costs:bdtInput.costs,
            }
            axios.post('api/add-bdtype',data).then(res=>{
                if(res.data.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    resetBDT();
                }
                else if(res.data.status=== 400)
                {
                    setBDT({...bdtInput,errorsList:res.data.errors});
                }
            })
        }

  return (

    <form onSubmit={submitBDT} id='BDT_FORM'>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="form-group">
                    <label>Sélectionner Type panne</label>
            <div className="input-group mb-3">
                           <select name="type" onChange={handleInput} value={bdtInput.type} className='form-control'>
                           <option>Sélectionner type</option>
                           <option value="Logiciel">Logiciel</option>
                           <option value="Materiel">Materiel</option>
                            </select>
                            <small className='text-danger'>{bdtInput.errorsList.type}</small>
                            </div>
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea name="descrip" onChange={handleInput} value={bdtInput.descrip} className='form-control'></textarea>
                </div>
                <div className="form-group mb-3">
                    <label>Frais</label>
                    <input type="text" name='costs' onChange={handleInput} value={bdtInput.costs} className='form-control'/>
                    <small className='text-danger'>{bdtInput.errorsList.costs}</small>
                </div>
            </div>
        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
    </form>

  )
}
