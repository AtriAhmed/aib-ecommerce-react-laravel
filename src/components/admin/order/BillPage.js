import axios from 'axios';
import React,{useEffect,useRef,useState} from 'react'
import {useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp'
import './Bill.css'
import ReactToPrint from 'react-to-print';


function BillPage() {
    const componentRef = useRef();
    let totalCartPrice = 0;
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {id_order} = useParams();
    const [order, setOrder] = useState({
        id:'',
        user_id:'',
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        adress:'',
        city:'',
        state:'',
        zipcode:'',
        payment_id:'',
        payment_mode:'',
        tracking_no:'',
        status:'',
        });

        const [orderItem, setOrderItem] = useState([]);

    useEffect(() => {
      let isMounted = true;
      axios.get(`/api/admin/view-order/${id_order}`).then(res=>{
          if(isMounted)
          {
              if(res.data.status === 200)
              {
                  setOrder(res.data.order);
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

    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/admin/view-order-item/${id_order}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setOrderItem(res.data.orderItem);
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

  return (
      <div className='w-100 h-100 bg-white'>

<div className="container px-2 pt-4"  ref={componentRef}>
  <div className="row">
    <div className="col-6">
      <img src="/images/logo-aib-big.png" alt="imag" width="75%" />
    </div>
    <div className="col-6 text-center fs-6"  style={{lineHeight: '1'}}>
      <strong
        ><span style={{lineHeight:'1.6'}}>Assistance Informatique et bureatique</span><br />SARL - au
        capital de 80000 dt <br />
        Siege: route soukra km1 Imm touta <br />M.F: 01160916KBM000<br />Tél: 74
        463 400</strong
      >
    </div>
  </div>
  <div className="row mt-4">
    <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
        <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
      <div className="row">
        <div className="col-6">FACTURE N° :</div>
        <div className="col-6">{order.id} / {new Date(order.created_at).getFullYear()}</div>
      </div>
      </div>
      <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
        <div className="row">
          <div className="col-6">Le</div>
          <div className="col-6">{formatDate(new Date(order.created_at))}</div>
          <div className="col-6">Code Client :</div>
          <div className="col-6">{order.user_id}</div>
        </div>
      </div>
    </div>
  </div>
  <div className="mt-2">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Article</th>
                                    <th width="50%">Désignation</th>
                                    <th>Prix</th>
                                    <th>Qté</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {orderItem.map((item,idx)=>{
                                     totalCartPrice += item.price  * item.qty;
                                    return (
                                <tr key={idx}>
                                     <td>{item.product_id}</td>
                                     <td>{item.product_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price  * item.qty}</td>
                                </tr>
                                )
                            })}
                            <tr>
                                <td colSpan="4" className='text-end fw-bold'>Net à payer</td>
                                <td colSpan="1" className='text-end fw-bold'>{totalCartPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
</div>

<div className="row">
    <div className="col-12 text-end">
    <ReactToPrint
        trigger={() => <button className='btn btn-primary m-2'>Imprimer</button>}
        content={() => componentRef.current}
      />
<button className='btn btn-primary m-2' >Facturer</button>
    </div>
</div>
</div>
  )
}

export default BillPage
