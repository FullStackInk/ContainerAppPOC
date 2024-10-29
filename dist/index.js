"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("./schema");
// Create a Yoga instance with a GraphQL schema.
const yoga = (0, graphql_yoga_1.createYoga)({ schema: schema_1.schema });
// Pass it into a server to hook into request handlers.
const server = (0, node_http_1.createServer)(yoga);
// Start the server and you're done!
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
});
