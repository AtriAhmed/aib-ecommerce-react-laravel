import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

function ViewProduct() {
    const [loading, setLoading] = useState(true);
    const [productslist,setProductslist] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});

    useEffect(()=>{
        let isMounted = true;
        document.title = "View Product"

        axios.get('/api/view-product').then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setProductslist(res.data.products);
                    setLoading(false);
                }
            }
        });
        return () =>{
            isMounted = false
        }
    },[])

    const deleteProduct = (e,id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-product/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                Swal.fire("Success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                Swal.fire("Success",res.data.message,"success")
                thisClicked.innerText = "Delete";
            }
        })

    }

    var viewProduct_HTMLTABLE=[];
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
    else
    {
        viewProduct_HTMLTABLE = productslist.map((item)=>{

            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.category.name}</div>
                    <div className='py-3 col-2'>{item.name}</div>
                    <div className='py-3 col-2'>{item.selling_price}</div>
                    <div className='py-3 col-2'><img src={`http://localhost:8000/${item.image}`} width="50px" alt="Image" /></div>
                    <div className='py-3 col-2'>
                        <Link to="#" onClick={()=>{setToEdit(item);setEditModalShow(true)}} className='btn p-0'><i className="fas fa-edit fs-3 text-primary"></i></Link>
                    </div>
                    <div className='py-3 col-1'>
                      {item.status === 0 ? 'Visible':'Hidden'}
                    </div>
                </div>
            )
        })
    }
  return (
    <div className="container p-5">
        <div className='card shadow'>
            <div className="card-header">
                <h5 className='mb-3 mb-md-0'>Produits ( {productslist.length})
                    <Link to="#" onClick={()=>{setModalShow(true)}} className='btn btn-primary btn-sm float-end'>Add Product</Link>
                </h5>
            </div>
            <div className="p-0 card-body">
                <div className='mx-0 row text-center'>
                            <div className='col-1 text-start'>ID</div>
                            <div className='col-2'>Nom Catégorie</div>
                            <div className='col-2'>Libellé</div>
                            <div className='col-2'>Prix de vente</div>
                            <div className='col-2'>Image</div>
                            <div className='col-2'>Modifier</div>
                            <div className='col-1'>Status</div>
                    </div>
                        {viewProduct_HTMLTABLE}
            </div>
        </div>
        <AddProductModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get('/api/view-product').then(res=>{if(res.data.status === 200){setProductslist(res.data.products);}});}}
      />
            <EditProductModal
        toedit={toEdit}
        show={editModalShow}
        onHide={() => {setEditModalShow(false);}}
      />
    </div>
  )
}

export default ViewProduct
