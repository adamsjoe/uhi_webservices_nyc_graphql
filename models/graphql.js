const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql')

const AccidentType = new GraphQLObjectType({
    name: 'Accident',
    description: 'Collated Accidents for a borough in NYC',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },        
        date: { type: GraphQLNonNull(GraphQLString)}, 
        borough: { type: GraphQLNonNull(GraphQLString) },
        weekday: { type: GraphQLNonNull(GraphQLInt) }, 
        year: { type: GraphQLNonNull(GraphQLInt) }, 
        month: { type: GraphQLNonNull(GraphQLInt) }, 
        day: { type: GraphQLNonNull(GraphQLInt) }, 
        collision_date: { type: GraphQLNonNull(GraphQLString) }, 
        temp: { type: GraphQLNonNull(GraphQLInt) }, 
        dewp: { type: GraphQLNonNull(GraphQLInt) }, 
        slp: { type: GraphQLNonNull(GraphQLInt) }, 
        visib: { type: GraphQLNonNull(GraphQLInt) }, 
        wdsp: { type: GraphQLNonNull(GraphQLInt) }, 
        mxpsd: { type: GraphQLNonNull(GraphQLInt) }, 
        gust: { type: GraphQLNonNull(GraphQLInt) }, 
        max: { type: GraphQLNonNull(GraphQLInt) }, 
        min: { type: GraphQLNonNull(GraphQLInt) }, 
        prcp: { type: GraphQLNonNull(GraphQLInt) }, 
        sndp: { type: GraphQLNonNull(GraphQLInt) }, 
        fog: { type: GraphQLNonNull(GraphQLInt) }, 
        cyc_kill: { type: GraphQLNonNull(GraphQLInt) }, 
        cyc_injd: { type: GraphQLNonNull(GraphQLInt) }, 
        moto_kill: { type: GraphQLNonNull(GraphQLInt) }, 
        moto_injd: { type: GraphQLNonNull(GraphQLInt) }, 
        peds_kill: { type: GraphQLNonNull(GraphQLInt) }, 
        peds_injd: { type: GraphQLNonNull(GraphQLInt) }, 
        pers_kill: { type: GraphQLNonNull(GraphQLInt) }, 
        pers_injd: { type: GraphQLNonNull(GraphQLInt) }, 
        num_cols: { type: GraphQLNonNull(GraphQLInt) }        
    })
})
exports.accidentType = AccidentType