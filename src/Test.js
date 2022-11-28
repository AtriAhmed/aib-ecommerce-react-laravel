import axios from 'axios';
import React, { useState } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Test() {

    const [results,setResults] = useState([])

    const [keyword,setKeyword] = useState("")

const handleSearch = (e)=>{
    e.persist()
    setKeyword(e.target.value)
    if(keyword)
    axios.get(`/api/search/${keyword}`).then(res=>{
            if(res.data.status === 200)
            {
                setResults(res.data.results);
            }
    });
}

  return (
    <div className='container'>
        <input type="text" name="search" className='w-100' onChange={handleSearch}></input>
        <div className='card search-dropdown w-100'>
            {
                results.map((item)=>{
                    return <Link key={item.id} to={`/collections/${item.category.slug}/${item.slug}`} className='m-2'>{item.name}</Link>
                })
            }
        </div>
    </div>
  )
}
