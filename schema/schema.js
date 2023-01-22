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
    GraphQLList,
    GraphQLNonNull
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
                return Author.findById(parent.authorId)
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
                return Book.find({authorId: parent.id})
            }
        }
    })
});


// GraphQL RootQueries

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id : {type:GraphQLID }},
            resolve(parent, args){
            //    return  _.find(books, {id: args.id})
                return Book.findById(args.id)
                  
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find({});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID }},
            resolve(parent, args) {
            //    return  _.find(authors, {id: args.id})
            return Author.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(){
                // return authors
                return Book.find({});
            }
        }
      
    }
});



// GraphQL Query Mutations !!!!

const Mutation = new GraphQLObjectType ({
    name: "Mutation",
    fields: {
        addAuthor: {
           type: AuthorType,
           args: {
               name: {type: new GraphQLNonNull(GraphQLString)},
               age: {type: new GraphQLNonNull(GraphQLInt)}
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
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