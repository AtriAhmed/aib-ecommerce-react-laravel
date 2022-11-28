import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import LoadingCmp from './components/LoadingCmp';

function AdminPrivateRoute({children}) {
    const navigate = useNavigate();
    const [Authenticated,setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      axios.get('/api/checkingAuthenticated').then(res=>{
          if(res.status === 200){
              setAuthenticated(true);
          }
          setLoading(false);
      });

      return () => {
        setAuthenticated(false);
      }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            Swal.fire("Non autorisé !",err.response.data.message,"warning");
            navigate('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function(response){
        return response;
    }, function(error){
        if(error.response.status === 403)
        {
            Swal.fire("Interdite !",error.response.data.message,"warning");
            navigate('/403');
        }
        else if(error.response.status === 404)
        {
            Swal.fire("Erreur 404","URL/Page introuvable","warning");
            navigate('/404');
        }
        return Promise.reject(error);
    })

    if(loading){
        return (
           <LoadingCmp/>
        )
    }

  return Authenticated ? children : <Navigate to="/login" />;
}

export default AdminPrivateRoute
