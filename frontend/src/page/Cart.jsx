import react from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct.jsx";
import { FaBagShopping } from "react-icons/fa6";
import emptycartImage from '../assest/empty.gif'



const Cart = ()=>{
    const productCartItems = useSelector((state)=> state.product.cartItem);
    console.log(productCartItems)

    const totalPrice = productCartItems.reduce((acc, curr)=> acc + parseInt(curr.total), 0)
    const totalQty = productCartItems.reduce((acc, curr)=> acc + parseInt(curr.qty), 0)

    return(
     <>
        <div className="p-2 md:p-4">
            <h2 className="text-lg md:text-5xl font-bold text-slate-600">Your Cart Items</h2>

     {productCartItems[0] ?

            <div className="my-4 flex gap-3">
                {/* display cart items */}
                <div className="w-full max-w-3xl">
{
    productCartItems.map((el)=>{
    return(
        <CartProduct  key={el._id}
                      id={el._id}
                      name={el.name}
                      price={el.price}
                      image={el.image}
                      qty={el.qty}
                      total={el.total}
                      description={el.description}
                      category={el.category}
                      
        />
    )
    })
}
                </div>



                {/* total cart item */}
                <div className="w-full max-w-md ml-auto">
                    <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
                    <div className="flex w-full py-2 text-lg border-b">
                    <p>Total Qty :</p>
                    <p className="ml-auto w-32 font-bold flex text-center gap-2"><span className='text-red-500 '> <FaBagShopping /></span> {totalQty}</p>
                    </div>
                    <div className="flex w-full py-2 text-lg border-b">
                    <p>Total Price</p>
                    <p className="ml-auto w-32 font-bold"><span className='text-red-500 '>₹ </span> {totalPrice}</p>
                    </div>
                    <button className="bg-red-500 w-full text-lg font-bold py-2 text-white shadow">Payment</button>
                </div>
            </div>
            :

            <>
            <div className="flex w-full justify-center items-center flex-col">
                <img src={emptycartImage} className="w-full max-w-sm" alt="" />
                <p className="text-slate-700 text-3xl font-bold">Empty Cart..</p>
            </div>
            </>
}

        </div>
     </>
    )
}


export default Cart;