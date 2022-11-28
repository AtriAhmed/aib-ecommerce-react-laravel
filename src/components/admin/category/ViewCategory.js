import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal.';

function ViewCategory() {
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categorylist,setCategorylist] = useState([]);
    const [editModalShow, setEditModalShow] = useState(false);
    const [toEdit, setToEdit] = useState({});

    useEffect(()=>{
        axios.get('/api/view-category').then(res=>{
            if(res.status === 200)
            {
                setCategorylist(res.data.category);
            }
            setLoading(false);
        })
    },[])

    const deleteCategory = (e,id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/delete-category/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                const items = categorylist.filter(itemC => itemC.id !== id);
                setCategorylist(items)
                Swal.fire("Success",res.data.message,"success");
            }
            else if(res.data.status === 404)
            {
                Swal.fire("Erreur",res.data.message,"error")
                thisClicked.innerText = "Delete";
            }
            else if(res.data.status === 401)
            {
                Swal.fire("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        })

    }

    var viewCategory_HTMLTABLE=[];
    if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }
    else
    {
        viewCategory_HTMLTABLE =
        categorylist.map((item)=>{
            return (
                <div key={item.id} className="mx-0 row border-bottom border-200 text-center">
                    <div className='py-3 col-1 text-start'>{item.id}</div>
                    <div className='py-3 col-2'>{item.name}</div>
                    <div className='py-3 col-2'>{item.slug}</div>
                    <div className='py-3 col-3'>{item.description}</div>
                    <div className='py-3 col-2'>{item.status}</div>
                    <div className='py-3 col-2 text-center'>
                        <div className='row'>
                        <div className='col-6'><Link to="#" onClick={()=>{setToEdit(item);setEditModalShow(true)}} className='btn p-0'><i className="fas fa-edit fs-3 text-primary"></i></Link></div>
                        <div className='col-6'><button type='button' onClick={(e)=>deleteCategory(e,item.id)} className='btn p-0'><i className="fas fa-trash fs-3 text-danger"></i></button></div>
                        </div> 
                    </div>
                </div>
            )
        })
    }
  return (
    <div className="container p-5">
        <div className='card shadow'>
            <div className="card-header">
                <h5 className='mb-3 mb-md-0'>Categories ( {categorylist.length} )
                    <Link to="#" onClick={()=>{setModalShow(true)}}  className='btn btn-primary btn-sm float-end'>Add Category</Link>
                </h5>
            </div>
            <div className="p-0 card-body">
                    <div className='mx-0 row text-center'>
                            <div className='col-1 text-start'>ID</div>
                            <div className='col-2'>Nom</div>
                            <div className='col-2'>Slug</div>
                            <div className='col-3'>Description</div>
                            <div className='col-2'>Status</div>
                            <div className='col-2'>Actions</div>
                    </div>
                        {viewCategory_HTMLTABLE}
            </div>
        </div>
        <AddCategoryModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get('/api/all-category').then(res=>{if(res.data.status === 200){setCategorylist(res.data.category);}});}}
      />
            <EditCategoryModal
      toedit={toEdit}
        show={editModalShow}
        onHide={() => {setEditModalShow(false);}}
      />
    </div>
  )
}

export default ViewCategory
