import { buildSchema } from "graphql";

const schemaDeProductosSDL = `
  type Producto {
    id: ID!
    nombre: String!
    descripcion: String
    precio: Float!
    disponible: Boolean!
  }


 type Query {
    productos: [Producto]
    producto(id: ID!): Producto
  }
`
const schemaEjecutable = buildSchema(schemaDeProductosSDL)

export default schemaEjecutable