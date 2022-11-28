import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';
import AddBDTModal from './AddBDTModal';

function BDT() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bdt, setBDT] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/get-bdtypes`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setBDT(res.data.bdtypes);
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

      const deleteBDTItem = (e,item) =>{
          e.preventDefault();

          Swal.fire({
            title: 'Supprimer Type panne',
            text:`ete vous sur de vouloir supprimer ${item.descrip} ?`,
            showDenyButton: true,
            confirmButtonText: 'Supprimer',
            denyButtonText: `Annuler`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-bdtype/${item.id}`).then(res =>{
                    if(res.data.status === 200)
                    {
                      const items = bdt.filter(itemC => itemC.id !== item.id);
                      setBDT(items)
                      Swal.fire("Success",res.data.message,"success");
                  }
                  else if(res.data.status === 404){
                      Swal.fire("Error",res.data.message,"error");

                  }
                })
            } else if (result.isDenied) {

            }
          })

      }
    const [modalShow, setModalShow] = useState(false);
    if(loading)
    {
        return <LoadingCmp/>
    }
    var bdt_HTML = '';
    if(bdt.length>0)
    {
        bdt_HTML = (<>
        <div className="card shadow">
        <div className="card-header">
        <div className="justify-content-between row">
            <div className="col-md-auto">
                <h5 className="mb-3 mb-md-0">Types Pannes ({bdt.length})</h5>
            </div>
            <div className="col-md-auto">
                <button type='button' onClick={()=>{setModalShow(true)}} className="btn btn-primary">Ajouter Panne</button>
            </div>
            </div>
        </div>
        <div className="p-0 card-body">
            <div className="mx-0 row">
                <div className="py-2 col-md-2">ID</div>
                <div className="py-2 col-md-2 text-center">Type</div>
                <div className="py-2 col-md-4 text-center">Description</div>
                <div className="py-2 col-md-2 text-center">Frais</div>
                <div className="py-2 col-md-2 text-center">Actions</div>
            </div>
                                {bdt.map((item,idx)=>{
                                    return (
            <div className="mx-0 border-bottom border-200 row" key={idx}>
                {/* <div className="p-0 py-2 col-1 text-center"> <Link className='text-decoration-none text-reset' to="#"><img src="https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg" alt={item.name} height="50" width="50" className="rounded-circle"/></Link></div> */}
                <div className="py-3 col-2">

                           {item.id}

                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                           {item.type}

                </div>
                <div className="py-3 col-4 d-flex align-items-center justify-content-center">

                {item.descrip}

</div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                           {item.costs}

                </div>
                <div className="py-3 col-2 text-center">
                    <div className="row">
                        <div className="col-6"><button className='btn p-0' onClick={(e)=>deleteBDTItem(e,item)}><i className="fas fa-trash fs-3 text-danger"></i></button></div>
                        <div className="col-6"><Link className='btn p-0' to={`/admin/edit-bdtype/${item.id}`}><i className="fas fa-edit fs-3 text-primary"></i></Link></div>
                    </div>
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
        bdt_HTML = 
        <div className='card shadow'>
                    <div className="card-header">
        <div className="justify-content-between row">
            <div className="col-md-auto">
                <h5 className="mb-3 mb-md-0">Types Pannes ({bdt.length})</h5>
            </div>
            <div className="col-md-auto">
                <button type='button' onClick={()=>{setModalShow(true)}} className="btn btn-primary">Ajouter Panne</button>
            </div>
            </div>
        </div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Il ya aucune type panne !</h4>
            </div>
        </div>
    }
  return (
      <div>
    <div className='container p-5'>
        {bdt_HTML}
        <AddBDTModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get(`/api/get-bdtypes`).then(res=>{if(res.data.status === 200){setBDT(res.data.bdtypes);setLoading(false);}
        });}}
      />
    </div>
    </div>
  )
}

export default BDT
