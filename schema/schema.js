const graphql = require('graphql');
const _ = require("lodash");
const Book = require("../model/book");
const Author = require("../model/author");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


// //dummy data 
// var books = [
//     {name: 'Blue Box', genre: 'express', id: "1", authorId: "1"},
//     {name: "Red Oil", genre: "nodemon", id: "2", authorId: "2"},
//     {name: "MerMaid", genre: "404", id: "3", authorId: "3"},
//     {name: 'Yellow Apparel', genre: 'express', id: "1", authorId: "1"},
//     {name: "Red Apparel", genre: "nodemon", id: "2", authorId: "2"},
//     {name: "Real Madrid", genre: "404", id: "3", authorId: "3"},
//     {name: "Barcelona", genre: "404", id: "3", authorId: "2"},
//     {name: "Manchester United", genre: "404", id: "3", authorId: "3"},   
// ];

// var authors = [
//     {name: 'Folake', age: 20, id: "1"},
//     {name: "Olusegun", age: 30, id: "2"},
//     {name: "Olamide", age: 40, id: "3"}
// ]



const BookType = new GraphQLObjectType({
    name:  "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, {id: parent.authorId})
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name:  "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id : {type:GraphQLID }},
            resolve(parent, args){
            //    return  _.find(books, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID }},
            resolve(parent, args) {
            //    return  _.find(authors, {id: args.id})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(){
                // return authors
            }
        }
      
    }
});


const Mutation = new GraphQLObjectType ({
    name: "Mutation",
    fields: {
        addAuthor: {
           type: AuthorType,
           args: {
               name: {type: GraphQLString},
               age: {type: GraphQLInt}
           }, 
           resolve(parent, args) {
             let author = new Author({
                name: args.name,
                age: args.age
             })
             return author.save();
           }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre
                })
                return book.save();
            }
        }
    }
});  



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});