import react, { useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { imageToBase64 } from '../utility/imageToBase64';
import { toast } from "react-hot-toast";



const Newproduct = ()=>{

    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
    })

    const handleOnChange = (e)=>{
     const {name, value } = e.target;

     setData((prev)=>{
        return{
            ...prev,
            [name] : value
        }
     })
    }

    const uploadImage = async(e)=>{
  const data = await imageToBase64(e.target.files[0])
//   console.log(data);
setData((preve)=>{
  return{
    ...preve,
    image: data
  }
})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(data);

        const { name, image, category, price} = data;
        if(name && image && category && price){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/upload-product`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            const fetchRes = await fetchData.json();
            console.log(fetchRes);
            toast(fetchRes.message);

          setData(()=>{
            return{
                name: "",
                category: "",
                image: "",
                price: "",
                description: "" 
            }
          })
        }else{
            toast("Enter required field..");
        }

    }

    return(
        <div className='p-4'>
            <form className='m-auto w-full max-w-md my-2 shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type={"text"} name="name" className="bg-slate-200 p-1 my-1" onChange={handleOnChange}  value={data.name} />

                <label htmlFor='category'>Category</label>
                <select className="bg-slate-200 p-1 my-1" id='category' name='category' onChange={handleOnChange} value={data.category} >
                <option value={"other"}>select category</option>
                    <option value={"friuts"}>Fruits</option>
                    <option value={"vegetable"}>Vegitable</option>
                    <option value={"icream"}>Ice Cream</option>
                    <option value={"dosha"}>Dosha</option>
                    <option value={"pizza"}>Pizza</option>
                    <option value={"rice"}>Rice</option>
                    <option value={"cake"}>Cake</option>
                    <option value={"burger"}>Burger</option>
                    <option value={"chicken"}>Chicken</option>
                </select>
                 <label htmlFor='image'>Image
                <div id='image' className='h-40 w-full bg-slate-200 cursor-pointer  rounded flex items-center justify-center'>
    
    {
        data.image ?  <img src={data.image} className='h-full' /> :    <span className='text-5xl'><MdOutlineFileUpload /> </span>
    }
   
    
          <input type={"file"} id='image' onChange={uploadImage} accept='image/*'   className=' bg-slate-100 w-2'/>
                </div>
                </label>


                <label htmlFor='price' className='my-1'>Price</label>
                <input type={"text"} name="price" className="bg-slate-200 p-1 my-1"  onChange={handleOnChange}  value={data.price}  />

                <label htmlFor='description'>Description</label>
                <textarea rows={2} value={data.description} className="bg-slate-200 p-1 my-1 resize-none" name='description'   onChange={handleOnChange} ></textarea>
                <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow' >Save</button>
            </form>
        </div>
    )
}

export default Newproduct;