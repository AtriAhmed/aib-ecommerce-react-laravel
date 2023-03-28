import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Product.css'

export default function Product({ product, discount, isNew }) {
    const navigate = useNavigate()
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    const submitAddtocart = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_name: product.name,
            product_qty: 1,
        }
        axios.post('/api/add-to-cart', data).then(res => {
            if (res.data.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    showDenyButton: true,
                    confirmButtonText: 'Continuer achat',
                    denyButtonText: `Valider la commande`,
                    confirmButtonColor: '#3085d6',
                    denyButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                    } else if (result.isDenied) {
                        navigate('/checkout');
                    }
                })
            }
            else if (res.data.status === 409) {
                Swal.fire("Warning", res.data.message, "warning");
            }
            else if (res.data.status === 401) {
                Swal.fire("Error", res.data.message, "error");
            }
            else if (res.data.status === 404) {
                Swal.fire("Warning", res.data.message, "warning");
            }
        })
    }

    return (
        <div style={hovered ? { transform: 'scale(1.05,1.05)', transition: '0.5s' } : { transform: 'scale(1,1)', transition: '0.5s' }} className={hovered ? 'card product-card text-center shadow-lg border-0' : 'card product-card text-center border-0'}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}>
            {isNew ? <span className="position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2 badge rounded-pill bg-success">Nouveau</span> : ''}
            <Link className="text-decoration-none card-img-top d-block overflow-hidden" to={`/collections/${product.category.slug}/${product.slug}`}><img className='' height={200 + "px"} src={`${process.env.REACT_APP_URL}/${product.image}`} alt="Product" /></Link>
            <div className="card-body py-2">
                <center>
                    <h6 className='text-secondary'><Link className="text-decoration-none product-meta d-block fs-xs pb-1 text-reset" to={`/collections/${product.category.slug}`}>{product.category ? product.category.name : 'Non Classé'}</Link></h6>
                    <h5 className="product-title fs-sm text-dark"><Link className='text-decoration-none text-reset' to={`/collections/${product.category.slug}/${product.slug}`}><strong>{product.name}</strong></Link></h5>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="product-price"> <strong><span className="text-accent">${product.selling_price}</span></strong>{discount ? <span className="outer"><span className="inner">${product.original_price}</span></span> : ''}</div>
                        <div className="star-rating"><i className="star-rating-icon ci-star-filled active"></i><i className="star-rating-icon ci-star-filled active"></i><i className="star-rating-icon ci-star-filled active"></i><i className="star-rating-icon ci-star-filled active"></i><i className="star-rating-icon ci-star-filled active"></i></div>
                    </div>
                    <button style={hovered ? { opacity: '1', transition: '0.5s' } : { opacity: '0', transition: '0.5s' }} className="btn btn-primary btn-sm d-block w-100 mb-2 p-2" type="button" onClick={submitAddtocart}><i className="fas fa-cart-plus"></i> <strong>Ajouter au Panier</strong></button>
                </center>
            </div>
        </div>
    )
}
