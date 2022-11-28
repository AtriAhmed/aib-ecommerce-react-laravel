import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbare from '../../layouts/frontend/Navbare'
import Partners from './Partners'
import './Home.css'
import Product from './collections/Product'
import { useNavigate } from 'react-router';
import LoadingCmp from '../LoadingCmp'
import axios from 'axios'
import Swal from 'sweetalert2'

function Home() {
    const navigate = useNavigate();
    const [latestsLoading, setLatestsLoading] = useState(true);
    const [latests, setLatests] = useState([]);
    const latestsCount = latests.length;

    const [biggestDiscountsLoading, setBiggestDiscountsLoading] = useState(true);
    const [biggestDiscounts, setBiggestDiscounts] = useState([]);
    const bdCount = biggestDiscounts.length;

    useEffect(() => {
      let isMounted = true;
      axios.get(`/api/latest-products`).then(res=>{
          if(isMounted)
          {
              if(res.data.status === 200)
              {
                  setLatests(res.data.products);
                  setLatestsLoading(false);
              }
              else if(res.data.status === 400)
              {
                Swal.fire("warning",res.data.message,"error");
              }
              else if(res.data.status === 404)
              {
                navigate('/collections');
                  Swal.fire("warning",res.data.message,"error");
              }
          }
      });
      /*axios.get(`/api/biggest-discounts`).then(res=>{
        if(isMounted)
        {
            if(res.data.status === 200)
            {
                setBiggestDiscounts(res.data.products);
                setBiggestDiscountsLoading(false);
            }
            else if(res.data.status === 400)
            {
              Swal.fire("warning",res.data.message,"error");
            }
            else if(res.data.status === 404)
            {
              navigate('/collections');
                Swal.fire("warning",res.data.message,"error");
            }
        }
    });*/

      return ()=>{
          isMounted = false;
      }

    }, [])

  return (
    <div><Navbare/>
    <div className="p-3">
        <div className="card p-4 shadow-lg">

        <Partners/>
<div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
          <h2 className="h3 mb-0 pt-3 me-2">Nouveautées</h2>
          <div className="pt-3"><Link className="text-decoration-none me-2 btn btn-outline-secondary btn-sm" to="/collections/all">Plus de produits<i className="ci-arrow-right ms-1 me-n1"></i></Link></div>
        </div>
        <div className="row pt-2 mx-n2">
        {latestsLoading ? <LoadingCmp/>
      :
  latests.map((product,idx)=>{
        return(
        <div className="col-lg-3 col-md-4 col-sm-6 px-2 mb-4" key={idx}>
            <Product product={product} isNew/>
            <hr className="d-sm-none"/>
        </div>
        )
  })
  }
</div>
<div className="d-flex flex-wrap justify-content-between align-items-center pt-1 border-bottom pb-4 mb-4">
          <h2 className="h3 mb-0 pt-3 me-2">Offres</h2>
          <div className="pt-3"><Link className="text-decoration-none me-2 btn btn-outline-secondary btn-sm" to="/collections/all">Plus de produits<i className="ci-arrow-right ms-1 me-n1"></i></Link></div>
        </div>
        <div className="row pt-2 mx-n2">

        {latestsLoading ? <LoadingCmp/>
      :
  latests.map((product,idx)=>{
        return(
        <div className="col-lg-3 col-md-4 col-sm-6 px-2 mb-4" key={idx}>
            <Product product={product} discount/>
            <hr className="d-sm-none"/>
        </div>
        )
  })
  }
</div>

    </div>
    </div>
    </div>
  )
}

export default Home
