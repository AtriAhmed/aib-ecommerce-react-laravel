import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import LoadingCmp from '../../LoadingCmp';

function Order() {
    const [loading, setLoading] = useState(true);
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        let isMounted = true;
        document.title = "Orders"

        axios.get('/api/admin/orders').then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
        });
        return () =>{
            isMounted = false
        }
    },[])

    var display_orders = '';
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
    else
    {
        display_orders = orders.map((item)=>{
            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-2 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.tracking_no}</div>
                    <div className='py-3 col-3'>{item.phone}</div>
                    <div className='py-3 col-3'>{item.email}</div>
                    <div className='py-3 col-2'>
                        <Link to={`/admin/view-order/${item.id}`} className='btn btn-primary btn-sm'>Consulter</Link>
                    </div>
                </div>
            )
        })
    }
  return (
    <div className="container p-5">
        <div className='card shadow'>
            <div className="card-header">
                <h5 className='mb-3 mb-md-0'>Commandes ( {orders.length})</h5>
            </div>
            <div className="p-0 card-body">
                <div className='mx-0 row text-center'>
                            <div className='col-2 text-start'>ID</div>
                            <div className='col-2'>Numéro de suivis</div>
                            <div className='col-3'>Tél.</div>
                            <div className='col-3'>Email</div>
                            <div className='col-2'>Action</div>
                </div>
                        {display_orders}
            
            </div>
        </div>
    </div>
  )
}

export default Order
