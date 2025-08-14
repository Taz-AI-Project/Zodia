import mongoose from 'mongoose';

const dates = new mongoose.Schema({
    userZodiac: {type: String},
    startD: {type: String},
    endD: {type: String},
    traits: {type: [String], default: []}
})

export const ZodiacInfo = mongoose.model('ZodiacInfo', dates);