# A FRAMEWORK FOR THE EFFECTIVE DEVELOPMENTOF MICRO-SERVICE ARCHITECTURES - The Code

Instructions given assume you have downloaded the entire repo and are in the relevant sub-directory when the commands are inputted unless otherwise stated.

# Dissertation

A PDF copy of my dissertation is located in the file `FYP_Final_Report_6425639.pdf`

# microservice

Exemplar micro-service built using the tools and libraries over the course of the project.

Basic shopping application (just a randomly chosen context) that exposes a RESTful API and connects to a MongoDB database.

Will need to have Node.js and Yarn installed alongside MongoDB.

Start by running `yarn install`

The routes are are already built but can be built again by running `yarn run 
tsoa routes`

Likewise the OpenAPI Specification can be built again by running `yarn run tsoa spec`

Compile by running `yarn run tsc --outDir dist --experimentalDecorators`

Run unit-tests via `yarn test` which will run the tests and generate the Coverage Report

Run server via `node dist/Server.js`

Navigate to `http://localhost:3000/REST/1.0/documentation` to see API Documentation and to interact with the API via the browser.

# handcrafted-client

Base API client created from scratch for the micro-service API. Acts as a baseline for what the later code generation should contain

Start by running `yarn install`

Run unit-tests via `yarn test` which will run the tests and generate the Coverage Report


# Open API Code Generator  Related Sections

Code Generation is done via the NPM module exposing the generator at https://www.npmjs.com/package/@openapitools/openapi-generator-cli

## vanilla-gen

*Run from the root directory of the repository*

Base template built using the default typescript-axios templates

Run `yarn install` to add dependencies

Create a client on demand by running 
`   openapi-generator-cli generate 
    -g typescript-axios
    -i ./microservice/src/spec/swagger.json
    -o vanilla-gen
    --additional-properties=npmName=myclient`

## modified-code-gen

Clone of vanilla-gen with additional feature sets added by hand which will be used later to add functionality to the template files themselves. Also contains unit-test suite.

Start by running `yarn install`

Run unit-tests via `yarn test` which will run the tests and generate the Coverage Report

## modified-template

Set of modified Mustache templates with additional features added for use by the Open API Generator

## client-generated-from-modified-template

*Run from the root directory of the repository*

Modified template built using the typescript-axios options with the templates from the `modified-templates` directory

Run `yarn install` to add dependencies

Create a client on demand by running 
`   openapi-generator-cli generate 
    -g typescript-axios
    -t ./modified-template
    -i ./microservice/src/spec/swagger.json
    -o vanilla-gen
    --additional-properties=npmName=myclient`
