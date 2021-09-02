// const {ApolloServer} = require("apollo-server");
// const resolvers = require("./resolvers");
import resolvers from "./resolvers.js";
import { ApolloServer } from "apollo-server";
import { typeDef as Product } from "./schemas/product.js";
import { typeDef as Country } from "./schemas/country.js";
import { typeDef as PaymentMethod } from "./schemas/paymentMethod.js";
import {  typeDefs as Settings } from "./schemas/settings.js"
import { typeDefs as Currency } from "./schemas/currency.js";

const typeDefs = `

union SearchResults = User | Admin | Link
union Error = User | Link 

type Query {
    users(role: UserRoleEnum): [User!]!
    user(id: ID!): User!
    admins: [Admin!]!
    admin(id: ID!): Admin!
    feed: [Link!]!
    books: [Book!]!
    search(contains: String): [SearchResults!]
    products: [Product!]!
    product_gallary: [Gallary!]!
    categories: [Category!]!
    categorydetail: [CategoryDetail]
    productcategories: [ProductCategory]
    units: [Units]
    product_gallary_detail: [productGallaryDetail]
    product_brand: ProductBrand!
    attribute: Attribute
    product_combination: ProductCombination

    #===============Country==============#
    countries: [Country]!
    states: [State]!

    #============Settings========#
    settings: [Settings]!

    #=========Currency=======//#
    currency: [Currency]!
  }
  
  type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      phone: String
        username: String!
        role: UserRoleEnum!
  }
  
  enum UserRoleEnum {
    ADMIN
    ACCOUNTANT
  }

  type Admin {
      id: ID!
      name: String!
      email: String!
  } 
  
  type Link {
    id: ID!
    description: String!
    url: String!
  }
  
  type Mutation {
      createUser(id: ID!, name: String!, email: String!, age: Int ): User!
      updateUser(id: ID!, name: String, email: String, age: Int ): User!
      deleteUser(id: ID!): User!
      createAdmin(id: ID!, name: String!, email: String!, age: Int): Admin!
      updateAdmin(id: ID!, name: String, email: String, age: Int): Admin!
      deleteAdmin(id: ID!): Admin!
      register: Error
  }

  interface Book {
    title: String!
    author: Author!
  }

  type Author {
    name: String!
  }

  type Course {
    name: String!
  }

  type Textbook implements Book {
    title: String!
    author: Author!
    courses: [Course!]!
  }

  type ColoringBook implements Book {
    title: String!
    author: Author!
    colors: [String!]!
  }


`;

const server = new ApolloServer({
  typeDefs: [Product, typeDefs, Country, PaymentMethod, Settings, Currency],
  resolvers,
});

// const url = "http://localhost:3000";

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));