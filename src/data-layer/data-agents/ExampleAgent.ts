import { Example, LeanExample } from '../model-types/ExampleType';
import { exampleModel } from '../models/ExampleModel';

export const createOrUpdateExample = async (name: string, description: string): Promise<Example> => {
    const update = { description };
    const filter = { name };
    try {
        return await exampleModel.findOneAndUpdate(filter, update, { upsert: true, useFindAndModify: false }).select('-_id name description').lean().exec().then(document => {
            if (!document) throw new Error(`TypeOf Document: ${typeof document} - something went wrong`);
            return document;
        });
    } catch (e) {
        throw e;
    }
}

export const getExample = async (name: string): Promise<Example> => {
    const filter = { name };
    try {
        return await exampleModel.findOne(filter).select('-_id name description').lean().exec().then(document => {
            if (!document) throw new Error(`No documents found with filter ${JSON.stringify(filter)}`);
            return document;
        });
    } catch (e) {
        throw e;
    }
}

export const getExamples = async (): Promise<Example[]> => {
    try {
        return await exampleModel.find().select('-_id name description').lean().exec();
    } catch (e) {
        throw e;
    }
}

export const deleteExample = async (name: string): Promise<void> => {
    const filter = { name }
    try {
        await exampleModel.findOneAndRemove(filter, { useFindAndModify: false }).exec();
    } catch (e) {
        throw e;
    }
}