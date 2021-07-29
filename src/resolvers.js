import {users, admins} from "./db";

const resolvers = {
    Query: {
        user: (parent, { id }, context, info) => {
            return users.find(user => user.id === id);
        },
        users : (parent, args, context, info) => {
            return users;
        },
        admin: (parent, {id}, context, info) => {
            return admins.find(admin => admin.id === id);
        },
        admins: (parent, args,context, info) => {
            return admins;
        }
    }
};

export default resolvers;