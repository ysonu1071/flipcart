import React, { useEffect } from 'react'
import "../styles/header.css"
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from "../images/flipkart-logo.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../redux/slices/userSlice';


function Header() {
  const [showSignin, setShowSignin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [signupData, setSignupData] = useState({name:"", email:"", password:""})
  const [signinData, setSigninData] = useState({email:"", password:""})

  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state)=> state.userData.cart);
  let loginStatus = useSelector((state)=> state.userData.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSigninData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSigninData({...signinData, [name]: value});
  }

  const handleSingupData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSignupData({...signupData, [name]:value})
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const {name, email, password} = signupData;
    if (name != "" && email != "" && password != "") {
      localStorage.setItem("flipcart", JSON.stringify(signupData));
      alert("signup successfull");
      setShowSignup(false);
    }else{
      alert("All fields are required!");
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = signinData;
    if (localStorage.getItem('flipcart')){
      let obj = JSON.parse(localStorage.getItem("flipcart"));
      if (obj.email == email && obj.password == password) {
        dispatch(setLogin({data: true}));
        setShowSignin(false)
        alert("login  successfull!");
      }
    }else{
      alert("you need to signup first");
    }
  }

  const goToCartPage = () => {
    navigate("/cartpage");
  }

  useEffect(()=>{
    let count = 0;
    for (let obj of cart) {
      count += obj.count;
    }

    setCartCount(count);
  },[cart])

  return (
    <div className='header'>
        <img src={logo} alt="logo" />
        <div className='inputContainer'>
            <input type="text" placeholder='Search for products...'/>
            <SearchIcon/>
        </div>
        {loginStatus ? <button className='loginBtn' onClick={()=>{
          dispatch(setLogin({data:false}))
        }}>Logout</button> : <button className='loginBtn' onClick={()=> setShowSignin(true)}>Login</button>}
        <select name="" id="">
          <option value="">More</option>
          <option value="">opt1</option>
          <option value="">opt2</option>
          <option value="">opt3</option>
        </select>
        <div className='cartContainer' onClick={goToCartPage}>
          <ShoppingCartIcon/>
          <p>Cart</p>
          <p id='cartCount'>{cartCount}</p>
        </div>

        {/*..................... login form.................... */}
          {showSignin && <div className='loginpage'>
            <div className='loginBox'>
          <h2>Sing In</h2>
          <form>
            <div>
              <label htmlFor="email">Enter your Email</label>
              <input type="email" name='email' value={signinData.email} placeholder='Enter your email' onChange={handleSigninData} required/>
            </div>
            <div>
              <label htmlFor="password">Enter your Email</label>
              <input type="password" value={signinData.password} name='password' placeholder='Enter your passeord'  onChange={handleSigninData} required/>
            </div>

           <div className='loginbox-btn'>
            <button onClick={()=> setShowSignin(false)}>Close</button>
            <button onClick={handleSignIn}>Sign in</button>
           </div>

           <p style={{textAlign:"center"}}>Don't have an account? <button onClick={()=>{
             setShowSignin(false);
             setShowSignup(true);
           }}>Sign up</button></p>
          </form>
          </div>
        </div>
        }

        {/* ..................signup form....................  */}
          {showSignup && <div className='loginpage'>
          <div className='loginBox'>
          <h2>Sign Up</h2>
          <form>
            <div>
              <label htmlFor="name">Enter your name</label>
              <input type="text" name='name' value={signupData.name} placeholder='Enter your name' onChange={handleSingupData} required/>
            </div>
            <div>
              <label htmlFor="email">Enter your Email</label>
              <input type="email" name='email' value={signupData.email} placeholder='Enter your email' onChange={handleSingupData} required/>
            </div>
            <div>
              <label htmlFor="password">Enter your password</label>
              <input type="password" value={signupData.password} name='password' placeholder='Enter your passeord' onChange={handleSingupData} required/>
            </div>

           <div className='loginbox-btn'>
            <button onClick={()=> setShowSignup(false)}>Close</button>
            <button onClick={handleSignup}>Sign up</button>
           </div>

           <p style={{textAlign:"center"}}>Allready have an account? <button onClick={()=>{
             setShowSignin(true);
             setShowSignup(false);
           }}>Sign in</button></p>
          </form>
          </div>
        </div>}
    </div>
  )
}

export default Header