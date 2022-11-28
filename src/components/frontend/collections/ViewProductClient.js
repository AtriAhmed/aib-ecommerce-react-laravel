import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {useParams } from 'react-router';
import { useNavigate,Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Navbare from '../../../layouts/frontend/Navbare';
import LoadingCmp from '../../LoadingCmp'
import Product from './Product';

function ViewProductClient() {
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      })
    const detectSize = () => {
        detectHW({
          winWidth: window.innerWidth,
          winHeight: window.innerHeight,
        })
      }

      useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
          window.removeEventListener('resize', detectSize)
        }
      }, [windowDimenion])

    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        axios.get('/api/getCategory').then(res=>{
          if(res.data.status === 200)
          {
              setCategoryList(res.data.category);
          }
        });
      }, [])
    const [sort, setSort] = useState(true);
    const navigate = useNavigate();
    const {slug} = useParams();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const productCount = product.length;
    useEffect(() => {
      let isMounted = true;
      axios.get(`/api/fetchproducts/${slug}`).then(res=>{
          if(isMounted)
          {
              if(res.data.status === 200)
              {
                  setProduct(res.data.product_data.product);
                  setCategory(res.data.product_data.category);
                  setLoading(false);
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

      return ()=>{
          isMounted = false;
      }

    }, [slug])
var showProductList = ''
    if(loading)
    {
        return <LoadingCmp/>
    }
    else
    {
        if(productCount > 0)
        {
            showProductList = product.map((item,idx)=>{
                return (
                              <div key={idx} className="mb-4 col-lg-3 col-md-4 col-sm-6">
        <Product product={item}/>
      </div>

                )
            })
        }
        else
        {
            showProductList =
            <div className="col-md-12 text-center">
                <h4>No Product Available for {category.name}</h4>
            </div>
        }
    }
  return (
    <div><Navbare/>
    <div className="py-3">
        <div className="container">
            <div className="row justify-content-center">
                {windowDimenion.winWidth > 992 ? <div className="col-3">
                    <div className="card shadow-lg">
                        <div className="container pt-2 pb-2">
                        <h5 className='font-weight-bold' ><strong>CATEGORIES</strong></h5>
                        <Nav.Link as={Link} className={window.location.pathname === `/collections/all` ? "nav-link":"nav-link text-secondary"} style={window.location.pathname === `/collections/all` ?{fontWeight:'bold',color:'black',backgroundColor:'#E8E8E8'}:{}} to={`/collections/all`} ><small>All</small></Nav.Link>
{
    categoryList.map((item,idx)=>{
      return  (<Nav.Link as={Link} key={idx} className={window.location.pathname === `/collections/${item.slug}` ? "nav-link":"nav-link text-secondary"} style={window.location.pathname === `/collections/${item.slug}` ?{fontWeight:'bold',color:'black',backgroundColor:'#E8E8E8'}:{}} to={`/collections/${item.slug}`} ><small>{item.name}</small></Nav.Link>)
    })
}
</div>
                    </div>
                </div> :<div className='col-9'> <div className='card shadow mb-2 p-2'>                    <div className="form-group">
                    <label>CATEGORY</label>
                    <div className="input-group mb-3">
                           <select name="category_id"  className='form-control'>
                           <option>All</option>
                               {
                                   categoryList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }

                            </select>
                            </div>
                        </div></div></div>}

                <div className="col-9">
                <div className="mb-3 card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="align-items-center d-flex col-6">
                                <h6 className="mb-0 ms-2">{product.length} Products</h6>
                            </div>
                            <div className="align-items-center d-flex col-6 justify-content-end">
                                <div className="gx-2 align-items-center row">
                                    <div className="col-auto">
                                        <div className="gx-2 row">
                                            <div className="col-auto">
                                                <small>Sort by:</small>
                                            </div>
                                            <div className="col-auto">
                                                <div className="input-group input-group-sm">
                                                    <select defaultValue={"Price"} className="pe-5 form-select">
                                                        <option value="price">Price</option>
                                                        <option value="rating">Rating</option>
                                                        <option value="review">Review</option>
                                                    </select>
                                                    <button type="button" className="input-group-text btn btn-secondary" onClick={()=>{setSort(!sort)}}>{sort ? <i className="fas fa-sort-down"></i> : <i className="fas fa-sort-up"></i> }</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="mb-3 card shadow">
  <div className="pb-0 card-body">
    <div className="row">
    {showProductList}
    </div>
  </div>
  <div className="d-flex justify-content-center bg-light mt-n1 card-footer">
    <div>
      <button type="button"trigger="focus" className="me-2 btn btn-falcon-default btn-sm" disabled=""></button>
    </div>
    <ul className="pagination mb-0">
      <li className="active">
        <button type="button" className="page me-2 btn btn-falcon-default btn-sm">1</button>
      </li>
      <li className="">
        <button type="button" className="page me-2 btn btn-falcon-default btn-sm">2</button>
      </li>
    </ul>
    <div>
      <button type="button" trigger="focus" className="btn btn-falcon-default btn-sm"></button>
    </div>
  </div>
</div>
</div>
</div>
        </div>
    </div>
</div>
  )
}

export default ViewProductClient
