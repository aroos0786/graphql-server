// const users = require("./db.js");
// const admins = require("./db.js");
import { users, admins, links, books, products, gallary, categories, product_category, category_detail, units, gallary_detail, brands, product_attribute, attribute_data, product_gallary_detail } from "./db.js";

let showError = false;

const resolvers = {
    Query: {
        users: (parent, args, context, info) => {
            return users;
        },
        user: (parent, { id }, context, info) => {
            return users.find((user) => user.id == id);
        },
        admins: (parent, args, context, info) => {
            return admins;
        },
        admin: (parent, { id }, context, info) => {
            return admins.find((admin) => admin.id == id);
        },
        products: (parent, args, context, info) => {
            return products;
        },
        product_gallary: (parent, args, context, info) => {
            return gallary;
        },
        categories: (parent, args, context, info) => {
            return categories;
        },
        feed: () => links,
        books: () => books,
        productcategories: (parent, args, context, info) => {
            return product_category;
        },
        categorydetail: (parent, args, context, info) => {
            return category_detail;
        },
        units: (parent, context, args, info) => {
            return units;
        },
        product_gallary_detail: (parent, args, context, info) => {
            return gallary_detail;
        }
    },
    Link: {
        id: (parent) => parent.id,
        url: (parent) => parent.url,
        description: (parent) => parent.description
    },
    Product: {
        product_gallary: (parent) => gallary.find(({ id }) => parent.gallary_id === id),
        product_gallary_detail: (parent) => {
            return product_gallary_detail.filter((product_gallary_detail) => {
                return product_gallary_detail.product_id === parent.id;
            })
        },
        product_category: (parent) => {
            var result = [];
            result = product_category.filter(function (single_product_category) {
                return single_product_category.product_id === parent.id;
            });
            // console.log("category", result)

            var category = [];
            result.forEach(single_result => {
                // console.log("single result", single_result)
                category.push(single_result.category_id)
                
            });

            console.log(" category", category)


            var result2 = categories.filter(function (single_category) {
                if (category.includes(single_category.id)) {
                    var category_detail_object = [];
                    category_detail.filter((single_category_detail) => {
                        if (single_category_detail.category_id === single_category.id) {
                            if (single_category_detail.language_id == 1)
                                single_category['category_detail'] = [single_category_detail];
                        }
                    })


                    return single_category
                }
            });
            // console.log(result2[0]);

            return result2
        },
        product_unit: (parent) => units.find(({ id }) => parent.product_unit === id),
        product_brand: (parent) => {
            return brands.filter((brand) => {
                return brand.gallary_id === parent.gallary_id;
            })
        },
        attribute: (parent) => {
            var attribute_id_array = []
            // attribute_id_array.push(product_attribute.filter((product_attribute) => {
            //     return product_attribute.product_id === parent.id
            // }))

            attribute_id_array = product_attribute.filter((product_attribute) => {
                // console.log(product_attribute)
                return product_attribute.product_id === parent.id
            })

            for(var i=0; i<product_attribute.length; i++){
                // attribute_id_array.push(product_attribute[i].attribute_id)
                // console.log(`on id ${i}`, product_attribute[i].attribute_id)
            }

            attribute_data.filter((attribute_data)=>{
                return attribute_data.id === attribute_id_array
            })

            // console.log("array", attribute_data )
            
            
            return attribute_data;
        
        
        
        
        }
    },
    Gallary: {
        detail: (parent) => {
            return gallary_detail.filter((gallary_detail) => {
                return gallary_detail.gallary_id === parent.id;
            })
        }
    },
    ProductBrand: {
        gallary: (parent) => {
            return gallary.find((gallary) => {
                return gallary.id === parent.gallary_id;
            })
        }
    },
    // Category: {
    //     categorydetail: (parent) => categories.find(({}) => id === id)
    // },
    Book: {
        __resolveType(book, context, info) {
            if (books.courses) {
                return "Textbook";
            }
            if (books.colors) {
                return "ColoringBook";
            }
            return null;
        },
        author(parent) {
            return {
                name: parent.author
            };
        }
    },
    Error: {
        __resolveType: obj => {
            if (obj.description) {
                return "its a Link type"
            }
            if (obj.name) {
                return "its a User type"
            }
            return null;
        }
    },
    SearchResults: {
        __resolveType(obj, context, info) {
            if (obj.name) {
                return "Author";
            }
            if (obj.title) {
                return "Book";
            }
            return null;
        }
    },
    Mutation: {
        createUser: (parent, { id, name, email, age }, context, info) => {
            const newUser = { id, name, email, age };

            users.push(newUser);
            return newUser;
        },
        updateUser: (parent, { id, name, email, age }, context, info) => {
            let newUser = users.find((user) => user.id == id);

            newUser.name = name;
            newUser.email = email;
            newUser.age = age;

            return newUser;
        },
        deleteUser: (parent, { id }, context, info) => {
            const userIndex = users.findIndex((user) => user.id == id);

            // if (userIndex == -1) throw new Error("User not found!");
            const deletedUsers = users.splice(userIndex, 1);

            return deletedUsers[0];
        },
        register: () => {
            const error = {};

            if (showError) {
                error = { name: "Aroos Afzal" }
            } else {
                error = { description: "About it" }
            }
  
            showError = !showError;
            return error;
        }
    },
};

export default resolvers;
// module.exports = resolvers;