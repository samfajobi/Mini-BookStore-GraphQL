const express = require("express");
const { graphqlHTTP } = require("express-graphql");


const app = express();


app.use("/graphql", graphqlHTTP({

}))

const PORT = 5000;

app.listen(PORT, (req, res ) => { 
    console.log(`App is Listening on PORT Port ${PORT}`)
});