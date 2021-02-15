import { Document, LeanDocument, } from 'mongoose'

export interface Example {
    name: string;
    description: string;
}

export interface ExampleDocument extends Document, Example {}

export interface LeanExample extends LeanDocument<ExampleDocument> {}