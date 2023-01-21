const graphql = require('graphql');
const _ = require("lodash");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;


//dummy data 
var books = [
    {name: 'Blue Box', genre: 'express', id: "1", authorId: "1"},
    {name: "Red Oil", genre: "nodemon", id: "2", authorId: "2"},
    {name: "MerMaid", genre: "404", id: "3", authorId: "3"}
];

var authors = [
    {name: 'Folake', age: 20, id: "1"},
    {name: "Olusegun", age: 30, id: "2"},
    {name: "Olamide", age: 40, id: "3"}
]



const BookType = new GraphQLObjectType({
    name:  "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name:  "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id : {type:GraphQLID }},
            resolve(parent, args){
               return  _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID }},
            resolve(parent, args) {
               return  _.find(authors, {id: args.id})
            }
        }
      
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
});