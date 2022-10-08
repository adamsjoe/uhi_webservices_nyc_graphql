const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
const mongoose = require('mongoose')
const nodefetch = (...args) => import('node-fetch').then(({default:fetch}) => fetch(...args))

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const dbModal = require('./models/mongo')
const graphAccidents = require('./models/graphql')
const { aggregate } = require('./models/mongo')

mongoose.connect('mongodb+srv://testuser:ParkerDenver@nyc.tkufswb.mongodb.net/Collisions')

const connection = mongoose.connection
connection.on('error', () => {console.error.bind(console, 'error') })
connection.once('open', () => {
    console.log('Mongoose connected')
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        allAccidents: {            
            type: new GraphQLList(graphAccidents.accidentType),
            description: 'Returns all collated Accidents in NYC in NYC',            
            // args: {
            //     // year: { type: GraphQLInt },
            //     date: { type: GraphQLString}
            // },
            resolve: async (parent, args) => {  
                console.log('1')
                // const allAccidentsData = await dbModal.find()
                
                // console.log(allAccidentsData)
                const accidents = await dbModal.find()
                console.log(accidents)

                return accidents
            }
        }
    })
})

const schema = new GraphQLSchema({
    query:RootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema, 
    graphiql: true
}))

app.listen(port, () => {
    console.log('Starting GraphQL Interface')
})