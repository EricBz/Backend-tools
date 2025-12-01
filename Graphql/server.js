import express from "express"
import { graphqlHTTP } from "express-graphql"
import schemaEjecutable from "./schema.js"
import { createRequire } from 'module';
const require = createRequire(import.meta.url); //debo importar el elemnto para usar require 
const productosData = require("./BD/productos.json");

const app = express()
const PORT = process.env.PORT || 8080

const root = {
  productos: () => {
    return productosData.productos; // Devuelve toda la lista del JSON
  },
  producto: ({ id }) => {
    // Usa el método find() para buscar el ID dentro del array del JSON
    return productosData.productos.find(p => p.id == id); 
  }
}

app.use("/graphql", graphqlHTTP({
    schema: schemaEjecutable,
    rootValue: root,
    graphiql: true,
}))

app.listen(PORT, () => {
    console.log(`Sevidor funcionando en puerto ${PORT}`)
})