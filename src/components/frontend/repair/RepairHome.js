import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavbarRepair from '../../../layouts/frontend/NavbarRepair'
import LoadingCmp from '../../LoadingCmp';

function RepairHome() {

    function resetBDS(){
        setBds({numS:'',
    bdType:"Materiel",
    descrip:'',
    errorsList:[],
    })
    }
    const [bdtList, setBDTList] = useState([]);
    const [otherBd, setotherBd] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [devis, setDevis] = useState([]);
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/get-user-devis`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setDevis(res.data.devis);
                    setLoading(false);
                }
                else if(res.data.status === 404)
                {
                  navigate('/collections');
                    Swal.fire("warning",res.data.message,"error");
                }
            }
        });

        return ()=>{
            isMounted = false;
        }

      }, [navigate])


    const [bdsInput, setBds] = useState({
        numS:'',
        bdType:'Materiel',
        descrip:'',
        errorsList:[],
        });

        const handleInput = (e)=>{
            e.persist();
            setBds({...bdsInput,[e.target.name]:e.target.value})
        }

        const handleRadio = (e)=>{
            e.persist();
            setBds({...bdsInput,bdType:e.target.value})
        }

        const handleOtherBd = (e)=>{
            e.persist();
            setotherBd(e.target.value)
        }

        const submitBds = (e)=>{
            e.preventDefault();
            let data = {}
            if(otherBd==""){
            data = {
                numS:bdsInput.numS,
                descrip:bdsInput.descrip,
            }
            }else{
                data = {
                    numS:bdsInput.numS,
                    descrip:otherBd,
                }
            }
            axios.post('api/create-bdsheet',data).then(res=>{
                if(res.data.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    resetBDS();
                }
                else if(res.data.status=== 400)
                {
                    setBds({...bdsInput,errorsList:res.data.errors});
                }
                else if(res.data.status === 401){
                    Swal.fire("Attention",res.data.message,"error")
                }
            })
        }

        const confirmDevi = (e,item)=>{
            e.preventDefault();
            Swal.fire({
                title: 'Confirmer Devi',
                text:`ete vous sur de confirmer cette devi ${item.descrip} / ${item.costs}  ?`,
                showDenyButton: true,
                confirmButtonText: 'Confirmer',
                denyButtonText: `Annuler`,
                confirmButtonColor: '#df4759',
                denyButtonColor: '#d9e2ef',
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`/api/confirm-devi/${item.id}`).then(res=>{
                        if(res.data.status===200)
                        {
                            Swal.fire("Success",res.data.message,"success");
                            axios.get(`/api/get-user-devis`).then(res=>{
                                    if(res.data.status === 200)
                                    {
                                        setDevis(res.data.devis);
                                        setLoading(false);
                                    }
                                    else if(res.data.status === 404)
                                    {
                                      navigate('/collections');
                                        Swal.fire("warning",res.data.message,"error");
                                    }
                            });
                        }
                        else {
                            Swal.fire("Error",res.data.message,"error")
                        }
                    })
                } else if (result.isDenied) {

                }
              })

        }

        useEffect(() => {
            if(!localStorage.getItem('auth_token'))
        {
            navigate('/login');
            Swal.fire("Attention","Connectez-vous pour accéder au Réparation","error");
        }
            axios.get('/api/get-bdtypes').then(res=>{
              if(res.data.status === 200)
              {
                  setBDTList(res.data.bdtypes);
              }
            });
          }, [])

        if(loading)
        {
            return <LoadingCmp/>
        }
        var devis_HTML = '';
        if(devis.length>0)
        {
            devis_HTML = (<>
            <div className="card shadow">

            <div className="p-0 card-body">
                <div className="mx-0 row">
                    <div className="py-2 col-2">ID</div>
                    <div className="py-2 col-2 text-center">Num serie</div>
                    <div className="py-2 col-2 text-center">Panne</div>
                    <div className="py-2 col-2 text-center">Prix</div>
                    <div className="py-2 col-4 text-center">Actions</div>
                </div>
                                    {devis.map((item,idx)=>{
                                        return (
                <div className="mx-0 border-bottom border-200 row" key={idx}>
                    {/* <div className="p-0 py-2 col-1 text-center"> <Link className='text-decoration-none text-reset' to="#"><img src="https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg" alt={item.name} height="50" width="50" className="rounded-circle"/></Link></div> */}
                    <div className="py-3 col-2">
                    {item.id}
                    </div>
                    <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                               {item.numS}

                    </div>
                    <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                               {item.descrip}

                    </div>
                    <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                                {item.costs}

                    </div>
                    <div className="py-3 col-4 text-center">

                            <button className='btn btn-primary' onClick={(e)=>confirmDevi(e,item)}>Confirmer</button>

                    </div>
                </div>

                                     )
                                    })}

            </div>

        </div>
                        </>
            )
        }
        else
        {
            devis_HTML = <div className="card card-body py-5 text-center shadow-sm">
                <h4>Aucun devis disponible</h4>
            </div>
        }
  return (
      <>
<NavbarRepair/>
<div className="container py-4">
    <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-6 mb-4">
            <div className="card shadow p-5">
                <center><strong className='fs-3'>Fiche panne</strong></center>
                <form onSubmit={submitBds} id='BDS_FORM'>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Numero de série</label>
                    <input type="text" name='numS' onChange={handleInput} value={bdsInput.numS} className='form-control'/>
                    <small className='text-danger'>{bdsInput.errorsList.numS}</small>
                </div>
                <div className="form-group">
                <label className='radio-inline control-label'>Type de panne :</label>
                <div className="form-check">
  <input className="form-check-input" type="radio" onChange={(e)=>handleRadio(e)} value="Logiciel" name="software" id="flexRadioDefault1" checked={bdsInput.bdType === 'Logiciel'}/>
  <label className="form-check-label" htmlFor="flexRadioDefault1">
    Logicielle
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" onChange={(e)=>handleRadio(e)} value="Materiel" name="hardware" id="flexRadioDefault2" checked={bdsInput.bdType === 'Materiel'}/>
  <label className="form-check-label" htmlFor="flexRadioDefault2">
    Materiel
  </label>
</div>
                </div>

                <div className="form-group">
                    <label>Panne description</label>
                    <div className="input-group mb-3">
                           <select name="descrip" onChange={handleInput} value={bdsInput.descrip} className='form-control'>
                           <option value="" disabled>Sélectionner panne</option>
                               {
                                   bdtList.map((item)=>{
                                        return (
                                            item.type == bdsInput.bdType ? <option value={item.descrip} key={item.id}>{item.descrip}</option> :''
                                        )
                                   })
                               }
                            <option value="Autre panne">Autre panne</option>
                            </select>
                            <small className='text-danger'>{bdsInput.errorsList.descrip}</small>
                            </div>
                        </div>

            {bdsInput.descrip == "Autre panne" ?  <div className="form-group mb-3">
                <label>Autre panne:</label>
                    <textarea name="descrip" onChange={handleOtherBd} value={bdsInput.otherBd} className='form-control'></textarea>
                </div>:''}
            </div>
        </div>
        <button type="submit" className='btn btn-primary px-4 float-end'>Soumettre</button>
    </form>
            </div>
        </div>
        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-6">
            <div className="card shadow p-5">
                <center><strong className='fs-3'>Liste devis</strong></center>
                {devis_HTML}
            </div>
        </div>
    </div>
    </div>
      </>
  )
}

export default RepairHome
