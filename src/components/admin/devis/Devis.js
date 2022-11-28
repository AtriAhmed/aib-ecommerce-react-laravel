import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';

function Devis() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [devis, setDevis] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/get-devis`).then(res=>{
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
                    <div className="py-2 col-md-1">ID Devis</div>
                    <div className="py-2 col-md-2 text-center">Num serie</div>
                    <div className="py-2 col-md-3 text-center">Panne</div>
                    <div className="py-2 col-md-2 text-center">Prix</div>
                    <div className="py-2 col-md-1 text-center">Status</div>
                    <div className="py-2 col-md-3 text-center">Actions</div>
                </div>
                                    {devis.map((item,idx)=>{
                                        return (
                <div className="mx-0 border-bottom border-200 row" key={idx}>
                    {/* <div className="p-0 py-2 col-1 text-center"> <Link className='text-decoration-none text-reset' to="#"><img src="https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg" alt={item.name} height="50" width="50" className="rounded-circle"/></Link></div> */}
                    <div className="py-3 col-1">
                    {item.id}
                    </div>
                    <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                               {item.numS}

                    </div>
                    <div className="py-3 col-3 d-flex align-items-center justify-content-center">

                               {item.descrip}

                    </div>
                    <div className="py-3 col-2 d-flex align-items-center justify-content-center">
                                {item.costs}
                    </div>
                    <div className="py-3 col-1 d-flex align-items-center justify-content-center">
                                {item.status == '0' ? <i class="far fa-check-circle"></i> : <i class="fas fa-check-circle text-success"></i>}
                    </div>
                    <div className="py-3 col-3 text-center">

                            <button className='btn btn-primary'>Facturer</button>

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
      <div>
    <div className='container p-5'>
        {devis_HTML}

    </div>
    </div>
  )
}

export default Devis
