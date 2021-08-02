import {ApolloServer} from "apollo-server";
import resolvers from "./resolvers.js";

const typeDefs = `

type Query {
    users : [User!]!
    user(id: ID!): User!
    admins: [Admin!]!
    admin(id: ID!): Admin!
    product(id: ID!): Product!
    products: [Product!]!
}

type Mutation {
  createUser(id: ID!, name: String!, email: String!, age: Int): User!
  updateUser(id: ID!, name: String, email: String, age: Int): User!
  deleteUser(id: ID!): User!
  createAdmin(id: ID!, name: String!, email: String!): Admin!
  updateAdmin(id: ID!, name: String, email: String): Admin!
  deleteAdmin(id: ID!): Admin!
  createProduct(id: ID!, name: String!): Product!
  updateProduct(id: ID!, name: String): Product!
  deleteProduct(id: ID!): Product!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}

type Admin {
    id: ID!
    name: String!
    email: String!
}

type Product {
    id: ID!
    name: String!
}

`;

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`the server is running on ${url}`)
})
