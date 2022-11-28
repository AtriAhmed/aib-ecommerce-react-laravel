import React from 'react'

function Dashboard() {
  return (
    <div>
        <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"> <i className="fas fa-users fa-5x"></i></div> <div className="row text-center w-75"> <strong className='fs-4'>Gestion des Utilisateurs</strong> </div> </div> </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"> <i className="fas fa-list fa-5x"></i></div> <div className="row text-center w-75"> <strong className='fs-4'>Gestion des Categories</strong> </div> </div> </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"> <i className="fab fa-dropbox fa-5x"></i></div> <div className="row text-center w-75"> <strong className='fs-4'>Gestion des Produits</strong> </div> </div> </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"> <i className="fas fa-shopping-cart fa-5x"></i></div> <div className="row text-center w-75"> <strong className='fs-4'>Gestion des Commandes</strong> </div> </div> </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"> <i className="fas fa-file-invoice-dollar fa-5x"></i></div> <div className="row text-center w-75"> <strong className='fs-4'>Gestion des Factures</strong> </div> </div> </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-6 col-xl-4"> <div className="card shadow  d-flex align-items-center justify-content-center m-5 p-4"> <div className="row"> <i className="fas fa-tools fa-5x"></i></div> <div className="row text-center w-75"> <strong className='fs-4'>Gestion de Réparation</strong> </div> </div> </div>
        </div>
    </div>
  )
}

export default Dashboard
