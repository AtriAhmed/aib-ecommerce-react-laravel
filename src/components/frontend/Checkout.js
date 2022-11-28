import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Navbare from '../../layouts/frontend/Navbare';
import User from '../admin/users/AddUser';
import LoadingCmp from '../LoadingCmp';

function Checkout() {
    const [checkoutInput, setCheckoutInput] = useState({
        name:'',
        phone:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',
    });

    const navigate = useNavigate();

    if(!localStorage.getItem('auth_token'))
    {
        navigate('/');
        Swal.fire("Warning","Login to goto Checkout Page","error");
    }

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [errors, setErrors] = useState(true);
    let totalCartPrice = 0;


    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/get-user`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                   setCheckoutInput({name:res.data.user.name,phone:res.data.user.tel,email:res.data.user.email})
                }
            }
        });
        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
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

      const handleInput = (e) =>{
          e.persist()
          setCheckoutInput({...checkoutInput, [e.target.name]:e.target.value})
      }

      const submitOrder = (e)=>{
          e.preventDefault()

          const data = {
              name: checkoutInput.name,
              phone: checkoutInput.phone,
              email: checkoutInput.email,
              address: checkoutInput.address,
              city: checkoutInput.city,
              state: checkoutInput.state,
              zipcode: checkoutInput.zipcode,
          }

          axios.post('/api/place-order',data).then(res=>{
              if(res.data.status === 200)
              {
                  Swal.fire("Order Placed Successfully",res.data.message,"success")
                  setErrors([]);
                  navigate("/thank-you")
              }
              else if(res.data.status === 422)
              {
                Swal.fire("All fields are mandatory","","error")
                setErrors(res.data.errors)
              }
          })
      }

      if(loading)
      {
          return <LoadingCmp/>
      }

      var checkout_HTML = '';
      if(cart.length > 0)
      {
          checkout_HTML = (
              <>
    <div className="row">
                    <div className="col-md-7 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <h4>Informations de base</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Nom Client</label>
                                            <input type="text" name="name" value={checkoutInput.name} className='form-control' readOnly/>
                                            <small className='text-danger'>{errors.name}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Tél</label>
                                            <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className='form-control'/>
                                            <small className='text-danger'>{errors.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Email</label>
                                            <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className='form-control'/>
                                            <small className='text-danger'>{errors.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Adresse complète</label>
                                            <textarea name="address"  rows="3" onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                            <small className='text-danger'>{errors.address}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Ville</label>
                                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className='form-control'/>
                                            <small className='text-danger'>{errors.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Code postal</label>
                                            <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className='form-control'/>
                                            <small className='text-danger'>{errors.zipcode}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button type='button' onClick={submitOrder} className='btn btn-primary'>Passer la commande</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th width="50%">Produit</th>
                                    <th>Prix</th>
                                    <th>Qté</th>
                                    <th>Totale</th>
                                </tr>
                            </thead>
                            <tbody>
                            {cart.map((item,idx)=>{
                                     totalCartPrice += item.product.selling_price  * item.product_qty;
                                    return (
                                <tr key={idx}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.selling_price}</td>
                                    <td>{item.product_qty}</td>
                                    <td>{item.product.selling_price  * item.product_qty}</td>
                                </tr>
                                )
                            })}
                            <tr>
                                <td colSpan="2" className='text-end fw-bold'>Net à payer</td>
                                <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
              </>
          )
      }
      else
      {
          checkout_HTML = <>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Votre Panier est vide.</h4>
            </div>
          </>
      }

  return (
    <div>
    <Navbare/>
        <div className="py-4">
            <div className="container">
            {checkout_HTML}
            </div>
        </div>
    </div>
  )
}

export default Checkout
