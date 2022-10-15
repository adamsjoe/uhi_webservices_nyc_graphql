const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql')

const dbModal = require('./mongo')

const AccidentType = new GraphQLObjectType({
    name: 'Accident',
    description: 'Collated Accidents for a borough in NYC',
    fields: () => ({
        id:             { type: GraphQLNonNull(GraphQLString) },        
        date:           { type: GraphQLString}, 
        borough:        { type: GraphQLString },
        weekday:        { type: GraphQLString }, 
        year:           { type: GraphQLInt }, 
        month:          { type: GraphQLInt }, 
        day:            { type: GraphQLInt }, 
        collision_date: { type: GraphQLString }, 
        temp:           { type: GraphQLFloat }, 
        dewp:           { type: GraphQLFloat }, 
        slp:            { type: GraphQLFloat }, 
        visib:          { type: GraphQLFloat }, 
        wdsp:           { type: GraphQLFloat }, 
        mxpsd:          { type: GraphQLFloat }, 
        gust:           { type: GraphQLFloat }, 
        max:            { type: GraphQLFloat }, 
        min:            { type: GraphQLFloat }, 
        prcp:           { type: GraphQLFloat }, 
        sndp:           { type: GraphQLFloat }, 
        fog:            { type: GraphQLFloat }, 
        cyc_kill:       { type: GraphQLFloat }, 
        cyc_injd:       { type: GraphQLFloat }, 
        moto_kill:      { type: GraphQLFloat }, 
        moto_injd:      { type: GraphQLFloat }, 
        peds_kill:      { type: GraphQLFloat }, 
        peds_injd:      { type: GraphQLFloat }, 
        pers_kill:      { type: GraphQLFloat }, 
        pers_injd:      { type: GraphQLFloat }, 
        num_cols:       { type: GraphQLFloat }        
    })
})
exports.accidentType = AccidentType

const InjuriesSingleDay = new GraphQLObjectType({
    name: 'SingeDayInjuryFigure',
    description: 'The number of injuries recorded on a single day',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString}, 
        injuries: { type: GraphQLInt }  
    })
})
exports.singleDayInjuries = InjuriesSingleDay

const DeathsSingleDay = new GraphQLObjectType({
    name: 'SingeDayDeathFigure',
    description: 'The number of deaths recorded on a single day',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString}, 
        deaths: { type: GraphQLInt }  
    })
})
exports.singleDayDeaths = DeathsSingleDay

const WeatherOnDay = new GraphQLObjectType({
    name: 'SingleDayWeatherConditions',
    description: 'Weather conditions on the given date',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString}, 
        temp: { type: GraphQLFloat },  
        rainfall: { type: GraphQLFloat }, 
        fog: { type: GraphQLBoolean },  
        windspeed: { type: GraphQLFloat }
    })
})
exports.singleDayWeather = WeatherOnDay


const DeathsMonthly = new GraphQLObjectType({
    name: 'MonthlyDeathFigure',
    description: 'The number of deaths recorded on a Months',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },        
        totalDeaths: { type: GraphQLInt },
    })
})
exports.monthlyDeaths = DeathsMonthly

const InjuriesMonthly = new GraphQLObjectType({
    name: 'MonthlyInjuryFigure',
    description: 'The number of injur recorded on a Months',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },        
        totalInjuries: { type: GraphQLInt },
    })
})
exports.monthlyInjuries = InjuriesMonthly