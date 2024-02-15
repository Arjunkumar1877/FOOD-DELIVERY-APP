import React, { useState } from "react";
import logo from '../assest/logo.png'
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {

    // console.log(process.env.REACT_APP_ADMIN_EMAIL)

    const userData = useSelector(state => state.user);
    console.log(userData)

    const [showMenu, setShowMenu] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logged out Succesfully")
    }


    const cartItemNumber = useSelector((state) => state.product.cartItem)
    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 bg-white z-50">
            {/* {desktop} */}

            <div className="flex items-center h-full justify-between">
                <Link to={""}>

                    <div className="h-10">
                        <img src={logo} className="h-full" />
                    </div>

                </Link>

                <div className="flex item-center gap-4 md:gap-7">
                    <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex ">
                        <Link to={""}>Home</Link>
                        <Link to={"menu/65c4c93f64da7be71251399d"}>Menu</Link>
                        <Link to={"about "}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600  relative">
                        <Link to={"cart"}><FaShoppingCart />
                            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">{cartItemNumber.length}</div>
                        </Link>
                    </div>
                    <div className="text-slate-600" onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-sm" >
                            {userData.user.image ? <img src={userData.user.image} className="h-full w-full" /> : <FaRegUserCircle />}

                        </div>
                        {
                            showMenu && (<div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">

                                {
                                    userData.user.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={'newproduct'} className="whitespace-nowrap cursor-pointer px-2">New product</Link>
                                }


                                {
                                    userData.user.image ? <p className="cursor-pointer text-white bg-red-500 px-2" onClick={handleLogout}>Logout    {userData.user.firstName} </p> : <Link to={'login'} className="whitespace-nowrap cursor-pointer px-2">Login</Link>
                                }

                                <nav className="gap-4 text-base md:text-lg flex flex-col md:hidden ">
                                    <Link className="px-2 py-1" to={""}>Home</Link>
                                    <Link className="px-2 py-1" to={"menu/65c4c93f64da7be71251399d"}>Menu</Link>
                                    <Link className="px-2 py-1" to={"about "}>About</Link>
                                    <Link className="px-2 py-1" to={"contact"}>Contact</Link>
                                </nav>

                            </div>)
                        }

                    </div>
                </div>
            </div>

            {/* {mobile} */}


        </header>
    )
}

export default Header