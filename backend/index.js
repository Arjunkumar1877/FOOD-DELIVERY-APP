const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const { User } = require("./Schemas/userSchema");
const { Product } = require("./Schemas/productSchema");
require('dotenv/config');


const uri = process.env.DB_URI ;

const db = async () => {
  try {
    const con = await mongoose.connect(uri);
    console.log(`MongoDB connected on ${uri}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

db();


const app = express();
app.use(cors());
app.use(express.json({limit: "10mb"}))
const PORT = process.env.PORT || 8080;


app.get("/", (req,res)=>{
    try {
        res.send("server is running")
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/signup", async(req,res)=>{
    console.log(req.body);

    const email = req.body.email;
    const emailExsisting = await User.findOne({email: email});
    if(emailExsisting){
        res.send({message: "Email Already registered", alert: false});
    }else{
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image
        })
    
        await user.save()
        res.send({message: "Signed up successfully", alert : true})
    }

  


})

app.post("/login", async(req,res)=>{
  try {
    console.log(req.body);
    const loginVerify = await User.findOne({email: req.body.email, password: req.body.password});

    if(loginVerify){
      res.send({message: "Sucessfully logged in",verified: true, userDataa: loginVerify})
    }else{
      res.send({message: "Enter valid credential", verified: false})
    }


  } catch (error) {
    console.log(error.message);
  }
})

app.post("/upload-product", async(req, res)=>{
  console.log(req.body);

  const addProduct = new Product({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description
  })

  const saved = await addProduct.save()

  if(saved){
    res.send({message: "Upload Successfully"});
  }
})

app.get('/product', async(req,res)=>{
  const data = await Product.find({})
  res.send(JSON.stringify(data))
})

app.listen(PORT, ()=>{
  console.log(`Server is running at Port:-   ${PORT}`);
})
