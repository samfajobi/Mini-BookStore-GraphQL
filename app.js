const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");


const app = express();


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = 5000;

app.listen(PORT, (req, res ) => { 
    console.log(`App is Listening on PORT Port ${PORT}`)
});