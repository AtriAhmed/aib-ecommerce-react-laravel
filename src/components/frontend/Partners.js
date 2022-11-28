import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function Partners() {
    const partners = [
        {
            image:'https://solvers.fr/wp-content/uploads/2019/06/8-astuces-pour-ame%CC%81liorer-les-performances-des-applications-React.png',
            label: 'First slide label',
            description:'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        },
        {
            image:'https://www.yateo.com/blog/wp-content/uploads/2020/03/symfony.jpg',
            label: 'Second slide label',
            description:'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        },
        {
            image:'https://symfonycasts.com/build/images/symfony6-track.f1f0034a.png',
            label: 'Third slide label',
            description:'Nulla vitae elit libero, a pharetra augue mollis interdum.',
        },
    ]
  return (
    <div><Carousel>
        {partners.map((item,idx)=>{
            return(
            <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.label}
              style={{height:"30vw"}}
            />
          </Carousel.Item>)
        })}
  </Carousel></div>
  )
}
