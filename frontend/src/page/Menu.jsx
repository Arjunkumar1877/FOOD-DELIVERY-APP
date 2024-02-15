import react from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addCartItems } from '../redux/productSlice';

const Menu = ()=>{
    const  {filterBy} = useParams();
    const productData = useSelector(state => state.product.productList)
    console.log(productData) 


    const displayProduct = productData.filter(el => el._id === filterBy)[0]
    console.log(displayProduct)
    

    const dispatch = useDispatch()
    const handleAddCartProduct = (e)=>{
        dispatch(addCartItems(displayProduct))
 
     }
    
    return(
        <div className='p-2 md:p-4'>
            <div className="w-full max-w-4xl bg-slate-400  m-auto md:flex bg-white">
                <div className="max-w-sm overflow-hidden w-full p-5">
                    <img src={displayProduct.image}  className='hover:scale-105 transition-all' alt="" />
                </div>
                <div className="flex flex-col gap-1">
                <h3 className='font-semibold text-slate-600  capitalize text-2xl  md:text-4xl'>{displayProduct.name}</h3>
                    <p className=" text-slate-500  font-medium text-2xl">{displayProduct.category}</p>
                    <p className=" font-bold md:text-2xl"><span className='text-red-500 '>₹</span> <span >{displayProduct.price}</span></p>
                     <div className="flex gap-3">
                    <button className="bg-yellow-500 py-1 my-2 rounded hover:bg-yellow-600 min-w-[100px]">Buy Now</button>
                    <button className="bg-yellow-500 py-1 my-2 rounded hover:bg-yellow-600 min-w-[100px]" onClick={handleAddCartProduct}>Add to Cart</button>

                     </div>
                     <div className="">
                        <p className='text-slate-600 font-medium'>Description: </p>
                        <p>{displayProduct.description}</p>
                     </div>
                </div>
            </div>


            <AllProduct heading={"Related Products"} loading="Loading..." />
        </div>
    )
}

export default Menu;