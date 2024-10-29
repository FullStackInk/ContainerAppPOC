"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_yoga_1 = require("graphql-yoga");
exports.schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
    resolvers: {
        Query: {
            hello: () => 'world'
        }
    }
});
