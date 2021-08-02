import {users, admins} from "./db.js";

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
    },
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
        }
    }
};

export default resolvers;