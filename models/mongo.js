const mongoose = require('mongoose')

const accData = new mongoose.Schema({
    _id: {
        require: true,
        type: Object
    },
    date: {
        require: true, 
        type: String
    }, 
    borough: {
        require: true, 
        type: String
    }, 
    weekday: {
        require: true, 
        type: String
    }, 
    year: {
        require: true, 
        type: String
    }, 
    month: {
        require: true, 
        type: String
    }, 
    day: {
        require: true, 
        type: String
    }, 
    collision_date: {
        require: true, 
        type: String
    }, 
    temp: {
        require: true, 
        type: String
    }, 
    dewp: {
        require: true, 
        type: String
    }, 
    slp: {
        require: true, 
        type: String
    }, 
    visib: {
        require: true, 
        type: String
    }, 
    wdsp: {
        require: true, 
        type: String
    }, 
    mxpsd: {
        require: true, 
        type: String
    }, 
    gust: {
        require: true, 
        type: String
    }, 
    max: {
        require: true, 
        type: String
    }, 
    min: {
        require: true, 
        type: String
    }, 
    prcp: {
        require: true, 
        type: String
    }, 
    sndp: {
        require: true, 
        type: String
    }, 
    fog: {
        require: true, 
        type: String
    }, 
    cyc_kill: {
        require: true, 
        type: String
    }, 
    cyc_injd: {
        require: true, 
        type: String
    }, 
    moto_kill: {
        require: true, 
        type: String
    }, 
    moto_injd: {
        require: true, 
        type: String
    }, 
    peds_kill: {
        require: true, 
        type: String
    }, 
    peds_injd: {
        require: true, 
        type: String
    }, 
        pers_kill: {
        require: true, 
        type: String
    }, 
    pers_injd: {
        require: true, 
        type: String
    }, 
    num_cols: {
        require: true, 
        type: String
    } 
}, { collection: 'SampleData' })

module.exports = mongoose.model('AccidentData', accData)