import react, { useState } from 'react';
import loginSignupImage from '../assest/login-animation.gif';
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice';

const Login = ()=>{
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = ()=>{
        setShowPassword(prev => !prev);
    }

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowConfirmPassword = ()=>{
        setShowConfirmPassword(prev => !prev)
    }
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const userData = useSelector(state=> state)

    console.log(userData)

    const dispatch = useDispatch()



    const handleOnchange = (e)=>{
  const {name,value} = e.target;
  setData((prev)=>{
    return{
        ...prev,
        [name]: value
    }
  })
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {email, password} = data;
        if(email && password){

            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resData = await fetchData.json();

            toast(resData.message);
        console.log(resData);
        if(resData.verified){
            toast(userData.user.user.firstName + " " +resData.message);
            dispatch(loginRedux(resData))
            console.log(resData.userDataa)
            setTimeout(() => {
            navigate("/");
            }, 1000);
        }else{
            navigate("/login")
        }
        }else{
            alert("Plese enter required field");
        }
    }
    return(
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
         {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}

         <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto'>
            <img src={loginSignupImage} />
         </div>

<form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
    <label htmlFor='email'>Email</label>
    <input type={'email'} value={data.email} onChange={handleOnchange} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-300' />

    <label htmlFor='password'>Password</label>
   <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
    <input type={showPassword ? 'text' :'password'} value={data.password} onChange={handleOnchange}  id='password' name='password'  className='w-full bg-slate-200 border-none outline-none'/>
    <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>  {showPassword? <BiShow />:<BiHide />}</span>
   </div>

  
   <button type='submit '  className='max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>
</form>


<p className='text-left text-sm mt-3'>Don't have an account ? <Link to={'/signup'} className='text-red-500 underline'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login;