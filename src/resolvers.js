import {users, admins, products} from "./db.js";

const resolvers = {
    Query: {
        user: (parent, { id }, context, info) => {
            return users.find(user => user.id == id);
        },
        users : (parent, args, context, info) => {
            return users;
        },
        admin: (parent, {id}, context, info) => {
            return admins.find(admin => admin.id == id);
        },
        admins: (parent, args,context, info) => {
            return admins;
        },
        product: (parent, {id}, context, info) => {
            return products.find(product => product.id == id);
        },
        products: () => products
    },
    Product:{
        id: (parent) => parent.id,
        name: (parent) => parent.name,
    }
    ,
    Mutation: {
        createUser: (parent , {id, name, email, age}, context, info) => {
            
            const newUser = {id, name, email, age};
            users.push(newUser);
            
            return newUser;
        },
        updateUser: (parent, {id, name, email, age}, context, info) => {
            
            let newUser = users.find(user=> user.id == id);
            
            newUser.name = name;
            newUser.email = email;
            newUser.age = age;

            return newUser;
        },
        deleteUser: (parent, {id}, context, info) => {

            const userIndex = users.findIndex(user => user.id == id);
            
            if(userIndex == -1) throw new Error("User not found.");
            const deletedUsers = users.splice(userIndex, 1);

            return deletedUsers[0];
        },
        createAdmin: (parent, {id, name, email}, context, info) => {
            const newAdmin = {id, name, email};

            admins.push(newAdmin);
            return newAdmin;
        },
        updateAdmin: (parent, {id, name, email}, context, info) => {
            let newAdmin = admins.find(admin => admin.id == id);

            newAdmin.name = name;
            newAdmin.email = email;
             
            return newAdmin;
        },
        deleteAdmin: (parent, {id}, context, info) => {
            const adminIndex = admins.findIndex(admin=> admin.id == id);

            if(adminIndex == -1) throw new Error ("Admin not Found!");
            const deletedAdmins = admins.splice(adminIndex,1);

            return deletedAdmins[0];
        },
        createProduct: (parent, {id, name}, context, info) => {
            const newProduct = {id, name};
            products.push(newProduct);
            return newProduct;
        },
        updateProduct: (parent, {id, name}, context, info) => {
            let newProduct = products.find(product => product.id == id);

            newProduct.name = name;

            return newProduct;
        },
        deleteProduct: (parent, {id}, context, info) => {
            const productIndex = products.findIndex(product=> product.id == id);
            if(productIndex == -1) throw new Error("The product in not avaiable");

            const deletedProduct = products.splice(productIndex, 1);
            return deletedProduct[0];
        }
    }
};

export default resolvers;