import react, { useState } from 'react';
import loginSignupImage from '../assest/login-animation.gif';
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utility/imageToBase64';
import { toast } from "react-hot-toast";


const Signup = ()=>{
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    });
console.log(data)
    const handleOnchange = (e)=>{
  const {name,value} = e.target;
  setData((prev)=>{
    return{
        ...prev,
        [name]: value
    }
  })
    }

    const handleeuploadProfileImage= async(e)=>{
        console.log(e.target.files[0]);
        const data = await imageToBase64(e.target.files[0]);
        console.log(data);
        setData((prev)=>{
            return{
                ...prev,
                image: data
            }
        })
    }

    // console.log(process.env.REACT_APP_SERVER_DOMAIN)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {firstName, lastName, email, password, confirmPassword} = data;
        if(firstName && lastName && email && password && confirmPassword){
            if(password === confirmPassword){
                let fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST", 
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data)
                });
                
                const dataRes = await fetchData.json();
                console.log(dataRes);
                
                // alert(dataRes.message);
                toast( dataRes.message)
                if(dataRes.alert){
                    navigate("/login");
                }else{
                    navigate("/signup");
                }
            }else{
                toast("password and confirm password not equal")
            }
        }else{
            toast("Plese enter required field")
        }
    }
    return(
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
         {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}

         <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md  m-auto relative'>
            <img src={data.image ? data.image : loginSignupImage} />

           <label htmlFor='profileImage'>
           <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
            <p className='text-sm p-1 text-white'>Upload</p>
         </div>
          <input type={"file"} id='profileImage' accept='image/*' onChange={handleeuploadProfileImage} className='hidden' />
           </label>
         </div>

       

<form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
    <label htmlFor='firstName'>First Name</label>
    <input type={"text"} value={data.firstName} onChange={handleOnchange} id="firstName" name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-300 ' />
    
    <label htmlFor='lastName'>Last Name</label>
    <input type={"text"} value={data.lastName} onChange={handleOnchange}  id="lastName" name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-300' />
    
    <label htmlFor='email'>Email</label>
    <input type={'email'} value={data.email} onChange={handleOnchange} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-300' />

    <label htmlFor='password'>Password</label>
   <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
    <input type={showPassword ? 'text' :'password'} value={data.password} onChange={handleOnchange}  id='password' name='password'  className='w-full bg-slate-200 border-none outline-none'/>
    <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>  {showPassword? <BiShow />:<BiHide />}</span>
   </div>

   <label htmlFor='confirmPassword'>Password</label>
   <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
    <input type={showConfirmPassword ? 'text' :'password'} value={data.confirmPassword} onChange={handleOnchange} id='confirmPassword' name='confirmPassword'  className='w-full bg-slate-200 border-none outline-none'/>
    <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>  {showConfirmPassword ? <BiShow />:<BiHide />}</span>
   </div>

   <button type='submit '  className='max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign up</button>
</form>


<p className='text-left text-sm mt-3'>Already have an account ? <Link to={'/login'} className='text-red-500 underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup;