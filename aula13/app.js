const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const mongoose = require('mongoose');
require('dotenv').config();
require('dotenv/config');
const Food = require('./Model/Food')
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Rotas

app.post("/api/foods", async (req,res)=>{

  console.log(req.body)
    const food = new Food({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
        price: req.body.price
    });
    await food.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message: err});
        console.log(err)
    });
});

app.get("/api/foods", async(req,res)=>{ //ok

    const foods = await Food.find();
    res.json(foods);

});

app.get("/api/foods/:id", async(req,res)=>{

    const foods = await Food.findById(req.params.id);
    res.json(foods);

});

app.put("/api/foods/:id", async(req,res)=>{
    const updatedFood = await Food.updateOne(
        {_id: req.params.id}, 
        {$set: {name: req.body.name}});
    res.json(updatedFood);
});

app.delete("/api/foods/:id", async(req,res)=>{
    const id = req.params.id;
    const encontrado = Food.findById(id);
    if (!encontrado) return res.status(404).json({aviso: 'Objeto não existe na base de dados'});    
    const removedFood = await Food.remove();
    res.json(removedFood); 
});

//Conectar ao Banco de Dados - usar URL fornecida pelo Atlas
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
    console.log('Connected to DataBase');
    app.listen(3000, ()=>{console.log("Server is running")});
    // aqui você pode começar a configurar o servidor ou outras operações relacionadas ao banco de dados
  })
  .catch(error => {
    console.error('Error connecting to database:', error.message);
    // aqui você pode lidar com o erro de conexão, como encerrar o servidor ou registrar o erro de alguma forma
  });