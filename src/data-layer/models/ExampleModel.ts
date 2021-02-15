import * as mongoose from 'mongoose';
import { ExampleDocument }  from '../model-types/ExampleType'

const exampleSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
})

export const exampleModel = mongoose.model<ExampleDocument>("example", exampleSchema);