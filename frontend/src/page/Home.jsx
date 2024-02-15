import React, { useEffect, useRef, useState } from 'react';
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/CardFeature';
import { GrPrevious,GrNext } from "react-icons/gr";
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';



const Home = () => {
    const productData = useSelector((state)=> state.product.productList);
    // console.log(productData);
    const homeProductCartList = productData.slice(1,5);
    const homeProductCardListVegitables = productData.filter(el => el.category === "vegetable")
    // console.log(homeProductCardListVegitables);

    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);
    const slideProductRef = useRef()

    const nextProduct = ()=>{
       slideProductRef.current.scrollLeft += 200
    }

    const previousProduct = ()=>{
        slideProductRef.current.scrollLeft -= 200
    }






    return (
        <div className='p-2 md:p-4 '>
            <div className="md:flex gap-4 py-2">

                <div className="md:w-1/2 py-4">
                    <div className="flex gap-3 bg-slate-300 w-36 px-2 item-center rounded-full">
                        <p className='text-sm font-medium py-1 text-slate-900'>Bike Delivery</p>
                        <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" className='h-7' />
                    </div>
                    <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fastest Delivery to <span className='text-red-600 text-size'>Your Home</span></h2>
                    <p className='py-3 text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni commodi nisi consequatur aperiam animi facilis molestias delectus dolor placeat laborum quo voluptate nam perspiciatis debitis est deserunt blanditiis, quas ea alias? Quis deserunt commodi minus soluta enim ipsum repellat eum iste ipsa distinctio, aperiam voluptatum nostrum hic molestias blanditiis deleniti, quae sequi animi beatae corrupti delectus? Dolorem, dicta!</p>
                    <button className="font-bold bg-red-500 text-slate-500 px-4 py-2 rounded-md">Order Now</button>
                </div>


                <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
                    {
                       homeProductCartList[0] ? homeProductCartList.map(el =>{
                            return(
                                <HomeCard 
                                key={el._id}
                                id={el._id}
                                image={el.image}
                                price={el.price}
                                name={el.name}
                                category={el.category}
                                description={el.description}
                                />
                            )
                        }) 
                        : loadingArray.map((el, index) => {
                            return(
                                <HomeCard 
                                 key={index+"loading"}
                                 loading={"Loading..."}
                                />
                            )
                        })
                    }
                
                </div>
            </div>



            <div className="">

<div className="flex w-full item-center">

<h2 className="font-bold text-2xl text-slate-800 mb-4">Fresh Vegitables</h2>
<div className="ml-auto ">
    <button onClick={previousProduct} className='bg-slate-300 hover:bg-slate-400 mx-2 text-lg p-2 rounded'>
    <GrPrevious />
    </button>
    <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 mx-2 text-lg p-2 rounded'>
    <GrNext />
    </button>
</div>
</div>
<div className="flex gap-5 overflow-scroll scrollbar-none scoll-smooth transition-all" ref={slideProductRef}>
{
   homeProductCardListVegitables[0] ? homeProductCardListVegitables.map(el => {
        return(
<CardFeature 
key={el._id + "vegetables"}
id={el._id}
image={el.image}
name={el.name}
category={el.category}
price={el.price}
description={el.description}

/>

        )
    })

    : 

    loadingArrayFeature.map((el, index) =><CardFeature loading="Loading.." key={index +"cartloading"} />)
}

</div>
</div>





<AllProduct  heading={"Your Product"}/>
        </div>
    )
}

export default Home;