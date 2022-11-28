import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Navbare from '../../../layouts/frontend/Navbare'
import LoadingCmp from '../../LoadingCmp';

function ViewCategoryClient() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/api/getCategory').then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
                setLoading(false);
            }
        })
    }, [])

    if(loading){
        return (<LoadingCmp/>)
    }
    else
    {
        var showCategoryList = '';
        showCategoryList = category.map((item)=>{
            return(
                <div className="col-md-4" key={item.id}>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`/collections/${item.slug}`}>
                            <h5>
                                {item.name}
                            </h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }
  return (
    <div><Navbare/>
        <div className="py-3 bg-warning">
            <div className="container">
                <h6>Category Page</h6>
            </div>
        </div>

        <div className="py-3">
            <div className="container">
                <div className="row">
                   {showCategoryList}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewCategoryClient
