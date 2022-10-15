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
        allAccidentData: {            
            type: new GraphQLList(graphAccidents.accidentType),
            description: 'Returns all collated Accidents in specific bourgh on specific date',            
            args: {
                borough: { type: GraphQLString },
                date: { type: GraphQLString}
            },
            resolve: async (parent, args) => {  
                console.log('1')
                const allAccidentsData = await dbModal.find({borough: args.borough, date: args.date})
                
                const accidents = await dbModal.find()

                return accidents
            }
        },
        // common queries
        getBoroughNames: {
            type: new GraphQLList(graphAccidents.accidentType),
            description: 'Returns all boroughs in the dataset',
            resolve: async (parent, args) => {
                console.log('Getting Boroughs')
                let result = []
                const boroughs = await dbModal.find().distinct('borough')
                boroughs.forEach(borough => result.push({borough: borough}))
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
                console.log('getting min accident date')

                const allTimes = await dbModal.find({borough: args.borough}).sort({collision_date: 'asc' }).limit(1)
                console.log(allTimes)
                return allTimes
            }
        },

        getMaxDateEntry: {
            type: new GraphQLList(graphAccidents.accidentType),
            description: 'Returns the earliest recorded accident for a given borough',
            args: {
                borough: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                console.log('getting max accident date')

                const allTimes = await dbModal.find({borough: args.borough}).sort({collision_date: 'desc' }).limit(1)
                return allTimes
            }
        },

        // daily queries
        getBoroughSingleDayDeaths: {
            type: graphAccidents.singleDayDeaths,
            description: 'Returns stuff',
            args: {
                borough: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                
                let dailyTots = [];                

                console.log('single entry')
                const allData = await dbModal.find({borough: args.borough, date: args.date})
                console.log(allData)
                
                let theDate = allData[0].date

                let dailyTotal = parseInt(allData[0].cyc_kill) + parseInt(allData[0].moto_kill) + parseInt(allData[0].peds_kill) + parseInt(allData[0].pers_kill)

                dailyTots.push({date: theDate, injuries: dailyTotal})

                const returnData = {
                    date: theDate,
                    "deaths": dailyTotal
                }

                return await returnData
            
            }            
        },

        getBoroughSingleDayInjuries: {
            type: graphAccidents.singleDayInjuries,
            description: 'Returns stuff',
            args: {
                borough: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                
                let dailyTots = []; // needed?

                console.log('single entry')
                const allData = await dbModal.find({borough: args.borough, date: args.date})
                
                let theDate = allData[0].date
                let dailyTotal = parseInt(allData[0].cyc_injd) + parseInt(allData[0].moto_injd) + parseInt(allData[0].peds_injd) + parseInt(allData[0].pers_injd)

                dailyTots.push({date: theDate, injuries: dailyTotal}) // needed?

                const returnData = {
                    date: theDate,
                    "injuries": dailyTotal
                }

                return await returnData
            
            }            
        },

        getSingleDayWeather: {
            type: graphAccidents.singleDayWeather,
            description: 'Returns weather',
            args: {
                borough: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                
                const allData = await dbModal.find({borough: args.borough, date: args.date})
                
                let theDate  = allData[0].date
                let temp     = allData[0].temp
                let rainfall = allData[0].prcp

                let fog
                if (allData[0].prcp === 0) {
                    fog = false
                } else {
                    fog = true
                }
                let windspeed = allData[0].wdsp
        
                const returnData = {
                    date: theDate,
                    "temp": temp,
                    "rainfall": rainfall,
                    "fog": fog,
                    "windspeed": windspeed
                }
        
                return await returnData 
            
            }            
        },        

        // monthly queries
        getBroroughDeathsMonth: {
            type: graphAccidents.monthlyDeaths,
            description: 'Returns an array of dates and numbers of deaths',
            args: {
                borough: { type: GraphQLString },
                month: { type: GraphQLInt },
                year: { type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                console.log('multiple entry')
                const allData = await dbModal.find({borough: args.borough, year: args.year, month: args.month}).sort({collision_date: 'asc' })

                let sum = 0;
                
                let accidentsInfo = allData.map(async accident => {

                    let dailyTotal = parseInt(accident.cyc_kill) + parseInt(accident.moto_kill) + parseInt(accident.peds_kill) + parseInt(accident.pers_kill)

                    sum += dailyTotal

                    return sum
                                
                })                    
                let toReturn = await Promise.all(accidentsInfo)

                const returnData = {
                    "totalDeaths": sum
                }

                return returnData
            }            
        },

        getBroroughInjuryMonth: {
            type: graphAccidents.monthlyInjuries,
            description: 'Returns an array of dates and numbers of injuries',
            args: {
                borough: { type: GraphQLString },
                month: { type: GraphQLInt },
                year: { type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                console.log('multiple entry')
                const allData = await dbModal.find({borough: args.borough, year: args.year, month: args.month}).sort({collision_date: 'asc' })

                let sum = 0;
                
                let accidentsInfo = allData.map(async accident => {

                    let dailyTotal = parseInt(accident.cyc_injd) + parseInt(accident.moto_injd) + parseInt(accident.peds_injd) + parseInt(accident.pers_injd)

                    sum += dailyTotal

                    return sum
                                
                })                    
                let toReturn = await Promise.all(accidentsInfo)

                const returnData = {
                    "totalInjuries": sum
                }

                return returnData
            }            
        },        

        // all data queries
        getBroroughDeaths: {
            type: new GraphQLList(graphAccidents.singleDayDeaths),
            description: 'Returns an array of dates and numbers of deaths',
            args: {
                borough: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                console.log('multiple entry')
                const allData = await dbModal.find({borough: args.borough}).sort({collision_date: 'asc' })

                let accidentsInfo = allData.map(async accident => {

                    let dailyTotal = parseInt(accident.cyc_kill) + parseInt(accident.moto_kill) + parseInt(accident.peds_kill) + parseInt(accident.pers_kill)

                    let theDate = accident.date

                    return {             
                        date: theDate,
                        "deaths": dailyTotal
                    }
                })                    
                let toReturn = await Promise.all(accidentsInfo)

                return toReturn  
            }            
        },

        getBoroughInjuries: {
            type: new GraphQLList(graphAccidents.singleDayInjuries),
            description: 'Returns stuff',
            args: {
                borough: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                
               
                console.log('multiple entry')
                const allData = await dbModal.find({borough: args.borough}).sort({collision_date: 'asc' })

                let accidentsInfo = allData.map(async accident => {

                    let dailyTotal = parseInt(accident.cyc_injd) + parseInt(accident.moto_injd) + parseInt(accident.peds_injd) + parseInt(accident.pers_injd)

                    let theDate = accident.date

                    return {             
                        date: theDate,
                        "injuries": dailyTotal
                    }
                })                    
                let toReturn = await Promise.all(accidentsInfo)

                return toReturn              
                
            }            
        },
         
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