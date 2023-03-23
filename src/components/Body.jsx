
import React, { useEffect, useState } from 'react'
import '../styles/body.css'
import Card from './Card';
import { setProducts } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Body() {
    const [mansClothing, setMansClothing] = useState([]);
    const [womensClothing, setWomensClothiing] = useState([]);
    const [electronics, setElectronics] = useState([]);
    const [jewelery, setJewelery] = useState([]);

    const [eleHights, setEleHights] = useState("370px");
    const [womHights, setWomHights] = useState("370px");

    const dispatch = useDispatch();
    const pro = useSelector((state)=> state.userData.products);

    useEffect(()=>{
        fetch("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products")
        .then((data)=> data.json())
        .then((result) => {
            console.log(result);
            dispatch(setProducts({data:result}));
            let temp = [];
            for(let obj of result) {
                if (obj.category  === "men's clothing") {
                    temp.push(obj);
                }
            }
            setMansClothing(temp);

            temp = [];
            for(let obj of result) {
                if (obj.category  === "jewelery") {
                    temp.push(obj);
                }
            }
            setJewelery(temp);
            
            temp = [];
            for(let obj of result) {
                if (obj.category  === "electronics") {
                    temp.push(obj);
                }
            }
            setElectronics(temp);
            
            temp = [];
            for(let obj of result) {
                if (obj.category  === "women's clothing") {
                    temp.push(obj);
                }
            }
            setWomensClothiing(temp);
        })
        .catch((err)=> {
            console.log(err);
        })
    },[])

  return (
    <div className='homeBody'>
        <div className='categoryContainer'>
            <div className='categoryTitleContainer'>
                <h2>Best of Man's Clothing</h2>
                <button>View all</button>
            </div>
            <div className='productContainer'>
                {
                mansClothing.map((obj)=> <Card key={obj.id} img={obj.image} title={obj.title} price={obj.price} rating={obj.rating.rate} id={obj.id}/>)
                }
            </div>
        </div>
        <div className='categoryContainer' style={{height: eleHights}}>
            <div className='categoryTitleContainer'>
                <h2>Best of Electronics</h2>
                <button onClick={()=> eleHights === '370px' ? setEleHights("auto") : setEleHights("370px")}>View all</button>
            </div>
            <div className='productContainer'>
                {
                electronics.map((obj)=> <Card key={obj.id} img={obj.image} title={obj.title} price={obj.price} rating={obj.rating.rate} id={obj.id}/>)
                }
            </div>
        </div>
        <div className='categoryContainer'>
            <div className='categoryTitleContainer'>
                <h2>Best of Jwellery</h2>
                <button>View all</button>
            </div>
            <div className='productContainer'>
                {
                jewelery.map((obj)=> <Card key={obj.id} img={obj.image} title={obj.title} price={obj.price} rating={obj.rating.rate} id={obj.id}/>)
                }
            </div>
        </div>
        <div className='categoryContainer' style={{height: womHights}}>
            <div className='categoryTitleContainer'>
                <h2>Best of Womne's Clothing</h2>
                <button onClick={()=> womHights === '370px' ? setWomHights("auto") : setWomHights("370px")}>View all</button>
            </div>
            <div className='productContainer'>
                {
                womensClothing.map((obj)=> <Card key={obj.id} img={obj.image} title={obj.title} price={obj.price} rating={obj.rating.rate} id={obj.id}/>)
                }
            </div>
        </div>
    </div>
  )
}

export default Body;