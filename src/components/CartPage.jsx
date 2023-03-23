import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { descreaseCartCount, removeAllCartProduct, removeCartProduct, setCart } from '../redux/slices/userSlice';
import "../styles/cartPage.css"
import Header from './Header'

function CartPage() {
    const [showPayment, setShowPayment] = useState(false)
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
    const cart = useSelector((state)=> state.userData.cart);
    const product = useSelector((state)=> state.userData.products);

    const dispatch = useDispatch();

    const getCartData = () => {
        const temp = [];
        let t=0;
        for (let obj of cart) {
            for (let item of product) {
                if (obj.id == item.id){
                    let tempObj = {};
                    tempObj.image = item.image;
                    tempObj.price = item.price;
                    tempObj.title = item.title;
                    tempObj.id = obj.id;
                    tempObj.count = obj.count;
                    
                    temp.push(tempObj);

                    t+= item.price * obj.count;
                }
            }
        }

        setCartData(temp);
        setTotal(t);
    }

    const increaseCart = (id) => {
        dispatch(setCart({id:id}));
    }

    const decreaseCart = (id) => {
        dispatch(descreaseCartCount({id:id}))
    }

    const removeCartItem = (id) => {
        dispatch(removeCartProduct({id:id}));
    }

    const closePaymentBox = () => {
        setShowPayment(false);
        dispatch(removeAllCartProduct());
    }

    useEffect(()=>{
        getCartData();
    },[cart]);

  return (
    <div>
        <Header/>
        <div className='cartpageBody'>
            <div className='cartpageBody-Header'>
                <p className='product'>Product</p>
                <p className='title'>Title</p>
                <p className='quantity'>Quantity</p>
                <p className='cart-price'>Price</p>
            </div>
            
            {
                cartData.map((obj, index)=><div key={index} className='cartpageBody-body'>
                        <img src={obj.image} alt="" />
                        <div className='title'>
                            <p>{obj.title}</p>
                            <button id='removeBtn' onClick={()=>removeCartItem(obj.id)}>Remove</button>
                        </div>
                        <div className='quantity'>
                            <button onClick={()=>decreaseCart(obj.id)}>-</button>
                            <p>{obj.count}</p>
                            <button onClick={()=>increaseCart(obj.id)}>+</button>
                        </div>
                        <p className='cart-price'>Rs. {obj.price * obj.count}</p>
                    </div>
                )
            }

            <div className='total-container'>
                <p>Total</p>
                <p>Rs. {total.toFixed(2)}</p>
            </div>
            <div className='paycontainer'>
                <button onClick={()=> setShowPayment(true)}>Pay</button>
            </div>
        </div>

        {showPayment && <div className='paymentPage'>
            <div className='paymentBox'>
                <h2>Order successfull</h2>
                <p>Rs. {total}</p>
                <button onClick={closePaymentBox}>Ok</button>
            </div>
        </div>}
    </div>
  )
}

export default CartPage