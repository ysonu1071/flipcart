import React, { useEffect, useState } from 'react'
import "../styles/product.css"
import assureLogo from '../images/flipcart-assure-logo.JPG'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import BoltIcon from '@mui/icons-material/Bolt';
import { setCart, setProducts } from '../redux/slices/userSlice';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';

function Product() {
    const [data, setData] = useState();
    const pro = useSelector((state)=> state.userData.products);
    const cart = useSelector((state) => state.userData.cart);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    let {id} = useParams();

    const addToCart = () => {
      dispatch(setCart({id:id}))
    }

    const byNow = () => {
      dispatch(setCart({id:id}))
      navigate('/cartpage');

    }

    useEffect(()=>{
      for (const obj of pro) {
        if (obj.id == id) {
          setData(obj);
          break;
        }
      }
     
    },[])

  return (
    <div className='products'>
        <Header/>
        <div className='productBody'>
          <div className='productBody-left'>
            <img src={data?.image} alt="" />
            <div className='button-container'>
              <button onClick={addToCart}><ShoppingCartIcon/>ADD TO CART</button>
              <button id='buynow' onClick={byNow}><BoltIcon/>BUY NOW</button>
            </div>
          </div>
          <div className='productBody-right'>
            <h2 className='title'>{data?.title}</h2>
            <p className='description'>{data?.description}</p>
            <div className='rating-container'>
              <p className='rating'>{data?.rating.rate} <StarIcon/></p>
              <p className='rating-count'>({data?.rating.count})</p>
              <img src={assureLogo} alt="assure logo" />
            </div>
              <p className='price'><CurrencyRupeeIcon/> {data?.price}</p>
          </div>
        </div>
    </div>
  )
}

export default Product