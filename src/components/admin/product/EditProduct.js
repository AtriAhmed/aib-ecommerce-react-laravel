import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';
import AddCategoryModal from '../category/AddCategoryModal';

function EditProduct(props) {
    const [modalShow, setModalShow] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [productInput, setProduct] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',

        selling_price:'',
        original_price:'',
        qty:'',
        brand:'',
        });

        const [allcheckbox, setAllcheckbox] = useState([]);

        const [picture, setPicture] = useState([]);

        useEffect(() => {

            axios.get('/api/all-category').then(res=>{
                if(res.data.status === 200)
                {
                    setCategoryList(res.data.category);
                }
              });

            if(props.toedit)
            {
                setProduct(props.toedit);
                setAllcheckbox({status:props.toedit.status});
                setLoading(false);
            }

        }, [props.toedit])


        const handleInput = (e)=>{
            e.persist();
            setProduct({...productInput,[e.target.name]:e.target.value})
        }

        const handleCheckbox = (e)=>{
            e.persist();
            setAllcheckbox({...allcheckbox,[e.target.name]:e.target.checked})
        }

        const handleImage = (e)=>{
            e.persist();
            setPicture({image:e.target.files[0]})
        }

        const updateProduct = (e)=>{
            e.preventDefault();
            const formData= new FormData();
            formData.append('image',picture.image);
            formData.append('category_id',productInput.category_id);
            formData.append('slug',productInput.slug);
            formData.append('name',productInput.name);
            formData.append('description',productInput.description);

            formData.append('selling_price',productInput.selling_price);
            formData.append('original_price',productInput.original_price);
            formData.append('qty',productInput.qty);
            formData.append('brand',productInput.brand);
            formData.append('status',allcheckbox.status ? '1':'0');
            axios.post(`/api/update-product/${props.toedit.id}`,formData).then(res=>{
                if(res.data.status===200)
                {
                    Swal.fire("Success",res.data.message,"success");
                    setError([]);
                }
                else if(res.data.status === 422)
                {
                    Swal.fire("All Fields are mandatory","","error");
                    setError(res.data.errors);
                }
                else if(res.data.status === 404)
                {
                    Swal.fire("Error",res.data.message,"error");
                    navigate('admin/view-product');
                }
            })
        }

        if(loading)
    {
        return (
            <LoadingCmp/>
        )
    }


      return (
<div className='container-fluid px-4'>
  
            <form onSubmit={updateProduct} encType='mutlipart/form-data' id='PRODUCT_FORM'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Principale</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Autre détails</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group">
                    <label>Sélectionner catégorie</label>
                    <div className="input-group mb-3">
                           <select name="category_id" onChange={handleInput} value={productInput.category_id} className='form-control'>
                           <option>Sélectionner catégorie</option>
                               {
                                   categoryList.map((item)=>{
                                        return (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                   })
                               }

                            </select>
                            <small className='text-danger'>{errorlist.category_id}</small>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" onClick={()=>{setModalShow(true)}} type="button">Ajouter Catégorie</button>
                            </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input type="text" name='slug' onChange={handleInput} value={productInput.slug} className='form-control'/>
                            <small className='text-danger'>{errorlist.slug}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Nom</label>
                            <input type="text" name='name' onChange={handleInput} value={productInput.name} className='form-control'/>
                            <small className='text-danger'>{errorlist.name}</small>
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea name="description" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                            <small className='text-danger'>{errorlist.description}</small>
                        </div>
                    </div>
                    <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                      <div className="row">
                          <div className="col-md-4 form-group mb-3">
                              <label>Prix de vente</label>
                              <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control"/>
                              <small className='text-danger'>{errorlist.selling_price}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Prix d'origine</label>
                              <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control"/>
                              <small className='text-danger'>{errorlist.original_price}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Quantité</label>
                              <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control"/>
                              <small className='text-danger'>{errorlist.qty}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Marque</label>
                              <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control"/>
                              <small className='text-danger'>{errorlist.brand}</small>
                          </div>
                          <div className="col-md-8 form-group mb-3">
                              <label>image</label>
                              <input type="file" name="image" onChange={handleImage} className="form-control"/>
                              <img src={`http://localhost:8000/${productInput.image}`} width="50px" alt="Image" />
                              <small className='text-danger'>{errorlist.image}</small>
                          </div>
                          <div className="col-md-4 form-group mb-3">
                              <label>Status (checked=masqué)</label>
                              <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true : false} className="w-50 h-50"/>
                          </div>
                      </div>
                    </div>
                </div>
            <button type="submit" className='btn btn-primary px-4 mt-2 float-end'>Soumettre</button>
        </form>
    <AddCategoryModal
        show={modalShow}
        onHide={() => {setModalShow(false);axios.get('/api/all-category').then(res=>{if(res.data.status === 200){setCategoryList(res.data.category);}});}}
      />
    </div>
      )
}

export default EditProduct
