import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbare from '../../../layouts/frontend/Navbare';
import LoadingCmp from '../../LoadingCmp'
import './ProductDetail.css'

function ProductDetail() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { category, slug } = useParams();
    const [product, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        category: { name: '' },
    });
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }


    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1);
        }
    }

    const submitAddtocart = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_name: product.name,
            product_qty: quantity,
        }
        axios.post('/api/add-to-cart', data).then(res => {
            if (res.data.status === 201) {
                Swal.fire("Success", res.data.message, "success")
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
    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/viewproductdetails/${category}/${slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
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

    if (loading) {
        return <LoadingCmp />
    }
    else {
        var avail_stock = ''
        if (product.qty > 0) {
            avail_stock = <>
                <p className="fs--1">Stock: <strong className="text-success">Disponible</strong></p>
                <div className="row">
                    <div className="pe-0 col-auto">
                        <div className="">
                            <div className="input-group input-group-sm">
                                <button type="button" className="border-300 btn btn-outline-secondary btn-sm" onClick={handleDecrement}>-</button>
                                <input min="1" type="text" className="text-center px-2 input-spin-none form-control" value={quantity} style={{ width: '50px' }} />
                                <button type="button" className="border-300 btn btn-outline-secondary btn-sm" onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 px-md-3 col-auto">
                        <button type="button" className="btn btn-primary btn-sm" onClick={submitAddtocart}><i className="fas fa-cart-plus fa-fw"></i><span className='ml-1'> <strong className='ml-1'>Ajouter au Panier</strong></span></button>
                    </div>
                    <div className="px-0 col-auto">
                        <button type="button" className="border-300 btn btn-outline-danger btn-sm font-weight-bold"><i class="far fa-heart"></i> <strong>282</strong></button>
                    </div>
                </div>
            </>
        }
        else {
            avail_stock = <>
                <div className="text-danger"><strong>En rupture de stock</strong></div>
            </>
        }
    }
    return (
        <div><Navbare />
            <div className="mb-3 card">
                <div className="card-body">
                    <div className="row">
                        <div className="mb-4 mb-lg-0 col-lg-6">
                            <div className="text-center position-relative h-sm-100 overflow-hidden">
                                <img width="500" src={`${process.env.REACT_APP_URL}/${product.image}`} alt={product.name} className="fit-cover w-sm-100 h-sm-100 rounded img-fluid" />
                                <span className="position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2 badge rounded-pill bg-success">Nouveau</span>
                            </div>
                        </div>
                        <div className="d-flex flex-column justify-content-between col-lg-6">
                            <h5><strong>{product.name}</strong></h5>
                            <a className="fs--1 mb-2 d-block" href={`/collections/${product.category.slug}`}>{product.category.name}</a>
                            <p className="fs--1">Description:<br />{product.description}</p>
                            <h4 className="d-flex align-items-center">
                                <span className="me-2"><strong>${product.selling_price}</strong></span>
                                <span className="me-1 fs--1 text-500">
                                    <del className="me-1">${product.original_price}</del>
                                    <strong>-50%</strong>
                                </span>
                            </h4>

                            {avail_stock}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="overflow-hidden mt-4 tab">
                                <Tabs defaultActiveKey="specifications" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="description" title="Description">
                                        <div className="mt-3">
                                            <p>Le Samsung Galaxy S9 a été annoncé le 25 février 2018 par Samsung. Il dispose d'un écran 5,8 pouces Super Amoled HDR, d'un SoC Exynos 9810 et d'un capteur photo arrière stabilisé à double ouverture mécanique.</p>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="specifications" title="Caractéristiques">
                                        <table className="fs--1 mt-3 table">
                                            <tbody>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Processeur</td>
                                                    <td>Exynos 9810 2.7 GHz Octo-core</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>RAM</td>
                                                    <td>4 Go</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Marque</td>
                                                    <td>{product.brand}</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Modèle</td>
                                                    <td>Mac Book Pro</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Affichage</td>
                                                    <td>5.8 pouces 2960 x 1440 pixels OLED 570 ppp</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Stockage</td>
                                                    <td>128 Go, 64 Go, 256 Go</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Graphique</td>
                                                    <td>Intel Iris Plus Graphics 655</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Poids</td>
                                                    <td>163 grammes</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: '30%' }}>Couleur</td>
                                                    <td>Noir, Argent, Blanc, Violet</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Tab>
                                    <Tab eventKey="reviews" title="Avis">
                                        <div className="mt-3 row">
                                            <div className="mb-4 mb-lg-0 col-lg-6">
                                                <div>
                                                    <div className="mb-1">
                                                        <span className="fs--1" style={{ display: 'inline-block', direction: 'ltr' }}>
                                                            <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                                                <span style={{ visibility: 'hidden' }}></span>
                                                                <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '100%' }}></span></span>
                                                            <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}><span style={{ visibility: 'hidden' }}></span>
                                                                <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '100%' }}></span></span>
                                                            <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}><span style={{ visibility: 'hidden' }}></span>
                                                                <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '100%' }}></span></span>
                                                            <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                                                <span style={{ visibility: 'hidden' }}></span>
                                                                <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '100%' }}></span>
                                                            </span>
                                                            <span style={{ cursor: 'inherit', display: 'inline-block', position: 'relative' }}>
                                                                <span style={{ visibility: 'hidden' }}></span>
                                                                <span style={{ display: 'inline-block', position: 'absolute', overflow: 'hidden', top: '0px', left: '0px', width: '100%' }}></span>
                                                            </span>
                                                        </span>
                                                        <span className="ms-3 text-dark fw-semi-bold">Awesome support, great code 😍</span>
                                                    </div>
                                                    <p className="fs--1 mb-2 text-600">By Drik Smith • October 14, 2019</p>
                                                    <p className="mb-0">You shouldn't need to read a review to see how nice and polished this theme is. So I'll tell you something you won't find in the demo. After the download I had a technical question, emailed the team and got a response right from the team CEO with helpful advice.</p>
                                                    <hr className="my-4" />
                                                </div>
                                                <div>
                                                    <p className="fs--1 mb-2 text-600">By Liane • December 14, 2019</p>
                                                    <p className="mb-0">This really is an amazing template - from the style to the font - clean layout. SO worth the money! The demo pages show off what Bootstrap 4 can impressively do. Great template!! Support response is FAST and the team is amazing - communication is important.</p>
                                                </div>
                                            </div>
                                            <div className="ps-lg-5 col-lg-6">
                                                <form className="">
                                                    <h5 className="mb-3">Write your Review</h5>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name:</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email:</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Review:</label>
                                                        <textarea rows="3" type="text" className="form-control"></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
