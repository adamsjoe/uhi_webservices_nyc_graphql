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
const { aggregate, db } = require('./models/mongo')

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
        },
        getAllBorough: {
            type: new GraphQLList(graphAccidents.accidentType),
            description: 'Returns all boroughs in the dataset',
            resolve: async (parent, args) => {
                console.log('Getting Boroughs')
                let result = []
                const boroughs = await dbModal.find().distinct('borough')
                boroughs.forEach(borough => result.push({borough: borough}))
                console.log(result)
                return result
            }
        },
        getMinDateEntry: {
            type: new GraphQLList(graphAccidents.accidentType),
            description: 'Returns the earliest recorded accident for a given borough',
            args: {
                borough: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                console.log('getting min accident')
                // not right
                const allTimes = await dbModal.find({borough: args.borough}).sort().limit(1)
                console.log(allTimes)
                return allTimes.date
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