import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './HomeGeneral.css'

function HomeGeneral() {
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

  return (
      <div className='h-100 w-100 element'>
<div className='container py-5 d-flex justify-content-center align-items-center' style={{height:windowDimenion.winHeight+"px"}}>
    <div className="h-100 d-flex justify-content-center align-items-center">
<div className="card shadow p-4">
            <div className="row">
<div className="col-6">
<div className=" justify-content-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <img src="/images/aib-logo.png" alt="imag" height={100+"px"}/>
                    </div>
                    <div className='text-center mt-4'><strong><h1 className='headline'>Plus forts, ensemble</h1></strong></div>
                </div>
</div>
<div className="col-6">
<div className='justify-content-center'>
                    <div className='p-4 p-sm-5 card-body'>
                        <div><Link style={{borderRadius:20+"px"}} className="mt-3 w-100 btn myBtn-primary" to="/home"><i className="fas fa-shopping-cart"></i> Achat</Link></div>
                        <div className="w-100 position-relative text-center mt-4"><hr className="text-300"/></div>
                        <div><Link style={{borderRadius:20+"px"}} className="mt-3 w-100 btn btn-success" to="/repair-home"><i className="fas fa-tools"></i> Réparation</Link></div>
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

export default HomeGeneral
