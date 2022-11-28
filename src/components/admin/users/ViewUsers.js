import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingCmp from '../../LoadingCmp';

function ViewUsers() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);



    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/view-users`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setUsers(res.data.users);
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

      const deleteUsersItem = (e,item) =>{
          e.preventDefault();

          Swal.fire({
            title: 'Supprimer l\'utilisateur',
            text:`ete vous sur de vouloir supprimer ${item.name} ?`,
            showDenyButton: true,
            confirmButtonText: 'Supprimer',
            denyButtonText: `Annuler`,
            confirmButtonColor: '#df4759',
            denyButtonColor: '#d9e2ef',
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/delete-user/${item.id}`).then(res =>{
                    if(res.data.status === 200)
                    {
                      const items = users.filter(itemC => itemC.id !== item.id);
                      setUsers(items)
                      Swal.fire("Success",res.data.message,"success");
                  }
                  else if(res.data.status === 404){
                      Swal.fire("Error",res.data.message,"error");

                  }
                })
            } else if (result.isDenied) {

            }
          })

      }
      if(loading)
    {
        return <LoadingCmp/>
    }
    var users_HTML = '';
    if(users.length>0)
    {
        users_HTML = (<>
        <div className="card shadow">
    <div className="card-header">
        <div className="justify-content-between row">
            <div className="col-md-auto">
                <h5 className="mb-3 mb-md-0">Utilsateurs ({users.length})</h5>
            </div>

            </div>
        </div>
        <div className="p-0 card-body">
            <div className="mx-0 row">
                <div className="py-2 col-md-6">Utilisateur</div>
                <div className="py-2 col-md-2 text-center">Tél</div>
                <div className="py-2 col-md-2 text-center">Role</div>
                <div className="py-2 col-md-2 text-center">Actions</div>
            </div>
                                {users.map((item,idx)=>{
                                    return (
            <div className="mx-0 border-bottom border-200 row" key={idx}>
                {/* <div className="p-0 py-2 col-1 text-center"> <Link className='text-decoration-none text-reset' to="#"><img src="https://image.shutterstock.com/image-photo/portrait-positive-cheerful-man-show-260nw-1531460657.jpg" alt={item.name} height="50" width="50" className="rounded-circle"/></Link></div> */}
                <div className="col-6">
                    <div className="d-flex align-items-center">
                        <div className="flex-1">
                            <h5 className="text-dark m-0"><Link className='text-decoration-none text-reset' to={`/collections/${item.name}/${item.name}`}><strong>{item.name}</strong></Link></h5>
                            <div className="">
                                {item.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                           {item.tel}

                </div>
                <div className="py-3 col-2 d-flex align-items-center justify-content-center">

                            {item.role_as == '1' ? "Admin" : "Utilisateur"}

                </div>
                <div className="py-3 col-2 text-center">
                    <div className="row">
                        <div className="col-6"><button className='btn p-0' onClick={(e)=>deleteUsersItem(e,item)}><i className="fas fa-trash fs-3 text-danger"></i></button></div>
                        <div className="col-6"><Link className='btn p-0' to={`/admin/edit-user/${item.id}`}><i className="fas fa-edit fs-3 text-primary"></i></Link></div>
                    </div>
                </div>
            </div>

                                 )
                                })}

        </div>

    </div>
                    </>
        )
    }
    else
    {
        users_HTML = <div className="card card-body py-5 text-center shadow-sm">
            <h4>Il ya aucune utilisateur !</h4>
        </div>
    }
   return(
<div>
<div className='container p-5'>
            {users_HTML}
            </div>
</div>
   )
}

export default ViewUsers
