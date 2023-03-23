import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/card.css"

function Card({img, title, price, rating, id}) {

  const navigate = useNavigate();
  const loginStatus = useSelector((state)=> state.userData.login);

  const handleNavigate = (id) => {
    if (!loginStatus){
      alert("you need to login first!");
      return;
    }
    navigate(`/product/${id}`)
  }

  return (
    <div className='card'>
        <img src={img} alt="" />
        <h4>{title}</h4>
        <p id='shopNow' onClick={()=>handleNavigate(id)}>Shop Now</p>
        <p>Rs {price}</p>

    </div>
  )
}

export default Card;