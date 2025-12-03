import express from "express"
import bodyParser from "body-parser"
import sqlite3 from "sqlite3"
const dbPatch = "./data/database.db" 
import createtable from "./data/model.js"
import CRUD from "./controller/controller.js"
//import { Sequelize, Model, DataTypes  } from "sequelize"



const app = express()

const port = 8080

const db = new sqlite3.Database(dbPatch, (err) => {
    err ? console.log(`Error type: ${err.message}`) : console.log("Conexion establecida...")
})

db.exec(createtable, (err) => {
    err ? console.log(`Error ... type: ${err.message}`) : console.log(`Tu tabla fue creada o ya existe...`)
})
/*
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

sequelize.sync()*/
/*
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conexión cerrada.');
});*/
let crud = new CRUD(db)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Holanda")
})

app.get("/users", async (req, res) => {
    const users = await crud.show()
    return res.json(users)
})  

app.post("/create", async (req, res) => {
    const {nombre, email} = req.body  
    const c = await crud.create(nombre, email)
    return res.status(201).json(c)
})

app.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id)
  const user = await crud.ShowById(userId)
  return res.json(user)
})

app.delete("/delete/:id", async (req, res) => {
  const userId = parseInt(req.params.id)
  const show = await crud.removeId(userId)
  return res.json(show)
})

app.listen(port, () => console.log(`Server running in port ${port}`))