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
        type: Number
    }, 
    year: {
        require: true, 
        type: Number
    }, 
    month: {
        require: true, 
        type: Number
    }, 
    day: {
        require: true, 
        type: Number
    }, 
    collision_date: {
        require: true, 
        type: String
    }, 
    temp: {
        require: true, 
        type: Number
    }, 
    dewp: {
        require: true, 
        type: Number
    }, 
    slp: {
        require: true, 
        type: Number
    }, 
    visib: {
        require: true, 
        type: Number
    }, 
    wdsp: {
        require: true, 
        type: Number
    }, 
    mxpsd: {
        require: true, 
        type: Number
    }, 
    gust: {
        require: true, 
        type: Number
    }, 
    max: {
        require: true, 
        type: Number
    }, 
    min: {
        require: true, 
        type: Number
    }, 
    prcp: {
        require: true, 
        type: Number
    }, 
    sndp: {
        require: true, 
        type: Number
    }, 
    fog: {
        require: true, 
        type: Number
    }, 
    cyc_kill: {
        require: true, 
        type: Number
    }, 
    cyc_injd: {
        require: true, 
        type: Number
    }, 
    moto_kill: {
        require: true, 
        type: Number
    }, 
    moto_injd: {
        require: true, 
        type: Number
    }, 
    peds_kill: {
        require: true, 
        type: Number
    }, 
    peds_injd: {
        require: true, 
        type: Number
    }, 
        pers_kill: {
        require: true, 
        type: Number
    }, 
    pers_injd: {
        require: true, 
        type: Number
    }, 
    num_cols: {
        require: true, 
        type: Number
    } 
}, { collection: 'SampleData' })

module.exports = mongoose.model('AccidentData', accData)