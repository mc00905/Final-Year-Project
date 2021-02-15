
import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Example } from '../../data-layer/model-types/ExampleType'
import { createOrUpdateExample, getExample, getExamples, deleteExample } from '../../data-layer/data-agents/ExampleAgent';

@Route("1.0/examples")
export class ExampleController {
    @Post("")
    public async createExample (@Body() body: Example): Promise<void> {
        await createOrUpdateExample(body.name, body.description);
    }
    
    @Put("/{name}")
    public async updateExample (@Path() name: string, @Body() body: Pick<Example, "description">): Promise<Example> {
        return await createOrUpdateExample(name, body.description);
    }

    @Get("")
    public async getExamples (): Promise<Example[]> {
        return await getExamples();
    }

    @Get("/{name}")
    public async getExample (@Path() name: string): Promise<Example> {
        return await getExample(name);    
    }

    @Delete("/{name}")
    public async deleteExample (@Path() name: string): Promise<void> {
        await deleteExample(name);
    }
}
