import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';

function BDS() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [BDS, setBDS] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/get-bdsheets`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setBDS(res.data.bdsheets);
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


    if(loading)
    {
        return <LoadingCmp/>
    }
    var BDS_HTML = '';
    if(BDS.length>0)
    {
        BDS_HTML = (<>
        <div className="card shadow">
        <div className="card-header">
        <div className="justify-content-between row">
            <div className="col-md-auto">
                <h5 className="mb-3 mb-md-0">Fiches Pannes ({BDS.length})</h5>
            </div>
            </div>
        </div>
        <div className="p-0 card-body">
            <div className="mx-0 row">
                <div className="py-2 col-md-2">ID</div>
                <div className="py-2 col-md-2 text-center">ID utilisateur</div>
                <div className="py-2 col-md-2 text-center">Num série</div>
                <div className="py-2 col-md-4 text-center">Description</div>
                <div className="py-2 col-md-2 text-center">Actions</div>
            </div>
                                {BDS.map((item,idx)=>{
                                    return (
            <div className="mx-0 border-bottom border-200 row" key={idx}>
                <div className="py-3 col-2">

                           {item.id}

                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                           {item.user_id}

                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                {item.numS}

</div>
                <div className="py-3 col-4 d-flex align-items-center justify-content-center">

                {item.descrip}

                </div>
                <div className="py-3 col-2 text-center">
                        <Link className='btn p-0' to={`/admin/create-devi/${item.id}`}><i className="fas fa-edit fs-3 text-primary"></i>Créer devi</Link>
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
        BDS_HTML = <div className="card card-body py-5 text-center shadow-sm">
            <h4>Il ya aucune fiche panne !</h4>
        </div>
    }
  return (
      <div>
    <div className='container p-5'>
        {BDS_HTML}
    </div>
    </div>
  )
}

export default BDS
