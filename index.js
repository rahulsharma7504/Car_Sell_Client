const express=require('express');
const dotenv=require('dotenv').config();
const app=express();

app.use(express.json());

let products=[
    {id:1,name:'Product 1',price:100},
    {id:2,name:'Product 2',price:200},
    {id:3,name:'Product 3',price:300}
]

//GET all products

app.get('/products',(req,res)=>{
    res.send(products);
});

//GET single product

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})