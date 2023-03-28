import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbare from '../../layouts/frontend/Navbare';
import LoadingCmp from '../LoadingCmp';

function Cart() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    let totalCartPrice = 0;

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/home');
            Swal.fire("Attention", "Connectez-vous pour accéder au panier", "error");
        }
        let isMounted = true;
        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if (res.data.status === 404) {
                    navigate('/collections');
                    Swal.fire("warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        }

    }, [navigate])

    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item))
        updateCartQuantity(cart_id, "dec")
    }

    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: Number(item.product_qty) + Number((item.product_qty < 10 ? 1 : 0)) } : item))
        updateCartQuantity(cart_id, "inc")
    }

    function updateCartQuantity(cart_id, scope) {
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if (res.data.status === 200) {

            }
        })
    }

    const deleteCartItem = (e, item) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Suppression";

        axios.delete(`/api/delete-cartitem/${item.id}`).then(res => {
            if (res.data.status === 200) {
                const items = cart.filter(itemC => itemC.id !== item.id);
                setCart(items)
                Swal.fire("Success", res.data.message, "success");
            }
            else if (res.data.status === 404) {
                Swal.fire("Error", res.data.message, "error");

            }
        })
    }
    if (loading) {
        return <LoadingCmp />
    }
    var cart_HTML = '';
    if (cart.length > 0) {
        cart_HTML = (<>
            <div className="card">
                <div className="card-header">
                    <div className="justify-content-between row">
                        <div className="col-md-auto">
                            <h5 className="mb-3 mb-md-0">Panier ({cart.length} Articles)</h5>
                        </div>
                        <div className="col-md-auto">
                            <Link role="button" tabIndex="0" to="/home" className="border-300 me-2 btn btn-outline-secondary btn-sm">Continuer vos achats</Link>
                            <Link role="button" tabIndex="0" to="/checkout" className="btn btn-primary btn-sm">Valider la commande</Link>
                        </div>
                    </div>
                </div>
                <div className="p-0 card-body">
                    <div className="gx-card mx-0 bg-200 text-900 fs--1 fw-semi-bold row">
                        <div className="py-2 col-md-8 col-9">Nom</div>
                        <div className="col-md-4 col-3">
                            <div className="row">
                                <div className="py-2 d-none d-md-block text-center col-md-8">Quantité</div>
                                <div className="text-end py-2 col-md-4 col-12">Prix</div>
                            </div>
                        </div>
                    </div>
                    {cart.map((item, idx) => {
                        totalCartPrice += item.product.selling_price * item.product_qty;
                        return (
                            <div className="gx-card mx-0 align-items-center border-bottom border-200 row" key={idx}>
                                <div className="py-3 col-8">
                                    <div className="d-flex align-items-center">
                                        <Link className='text-decoration-none text-reset' to={`/collections/${item.product.category.slug}/${item.product.slug}`}><img src={`${process.env.REACT_APP_URL}/${item.product.image}`} alt={item.product.name} width="100" className="img-fluid rounded-1 me-3 d-none d-md-block" /></Link>
                                        <div className="flex-1">
                                            <h5 className="fs-0">
                                                <span className="product-title fs-sm text-dark"><Link className='text-decoration-none text-reset' to={`/collections/${item.product.category.slug}/${item.product.slug}`}><strong>{item.product.name}</strong></Link></span>
                                            </h5>
                                            <div className="fs--2 fs-md--1">
                                                <button type="button" onClick={(e) => deleteCartItem(e, item)} className="text-danger fs--2 fs-md--1 fw-normal p-0 btn btn-link btn-sm">enlever</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 col-4">
                                    <div className="align-items-center row">
                                        <div className="d-flex justify-content-end justify-content-md-center col-md-8 order-md-0 order-1">
                                            <div>
                                                <div className="input-group input-group-sm">
                                                    <button type="button" onClick={() => handleDecrement(item.id)} className="px-2 border-300 btn btn-outline-secondary btn-sm">-</button>
                                                    <div className="text-center px-2 input-spin-none form-control" style={{ width: '50px' }}>{item.product_qty}</div>
                                                    <button type="button" onClick={() => handleIncrement(item.id)} className="px-2 border-300 btn btn-outline-secondary btn-sm">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-end ps-0 mb-2 mb-md-0 text-600 col-md-4 order-md-1 order-0">${item.product.selling_price * item.product_qty}</div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                    <div className="fw-bold gx-card mx-0 row">
                        <div className="py-2 text-end text-900 col-md-8 col-9">Totale</div>
                        <div className="px-0 col">
                            <div className="gx-card mx-0 row">
                                <div className="py-2 d-none d-md-block text-center col-md-7">{cart.length} (articles)</div>
                                <div className="text-end py-2 text-nowrap px-card col-md-5 col-12">${totalCartPrice}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-light d-flex justify-content-end card-footer">
                    <form className="me-3">
                        <div className="input-group input-group-sm">
                            <input placeholder="GET50" type="text" className="form-control" />
                            <button type="submit" className="border-300 btn btn-outline-secondary btn-sm">Appliquer</button>
                        </div>
                    </form>
                    <Link role="button" tabIndex="0" to="/checkout" className="btn btn-primary btn-sm">Valider la commande</Link>
                </div>
            </div>
        </>
        )
    }
    else {
        cart_HTML = <div className="card card-body py-5 text-center shadow-sm">
            <i className="fas fa-shopping-cart mb-4 text-primary" style={{ fontSize: '128px' }}></i>
            <h3>Oops! Your cart is empty!</h3>
            <div className='mb-3'>Looks like you haven't added anything to your cart yet</div>
            <Link to="/home" className='btn btn-primary mx-5'>Shop Now</Link>
        </div>
    }
    return (
        <div><Navbare />
            <div className='container p-5'>
                {cart_HTML}
            </div>
        </div>
    )
}

export default Cart
