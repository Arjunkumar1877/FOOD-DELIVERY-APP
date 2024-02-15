import React from 'react'
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteCartItems, increaseQty, decreaseQty} from '../redux/productSlice';


function CartProduct({id, image, category, description,total, qty, price, name}) {
    const dispatch = useDispatch()
  return (
   <div className="bg-slate-200 flex p-2 gap-4 rounded border border-slate-300 my-2">
    <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className='h-28 w-40 object-cover' alt="" />
    </div>

    <div className="flex flex-col gap-1 w-full ">
        <div className="flex justify-between">

        
                <h3 className='font-semibold text-slate-600  capitalize text-lg  md:text-xl'>{name}</h3>
             <div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={()=> dispatch(deleteCartItems(id))}>
             <FaTrash />

             </div>
             </div>
                    <p className=" text-slate-500  font-medium ">{category}</p>
                    <p className=" font-bold text-base"><span className='text-red-500 '>₹</span> <span >{price}</span></p>
                     

                     <div className="flex justify-between">
                     <div className="flex gap-3 text-center">
                    <button className="bg-slate-300 py-1 my-2 rounded hover:bg-slate-400 p-1" onClick={()=> dispatch(increaseQty(id))}><FaPlus /></button>
                    <p className='font-semibold p-1'>{qty}</p>
                    <button className="bg-slate-300 py-1 my-2 rounded hover:bg-slate-400 p-1" onClick={()=> dispatch(decreaseQty(id))}><FaMinus /> </button>
                     </div>

                     <div className="flex item-center gap-2 font-bold text-slate-700">
                        <p className="">Total :</p>
                        <p className=""><span className='text-red-500 '>₹</span> {total}</p>
                     </div>
                     </div>
                    
                </div>

   </div>
  )
}

export default CartProduct