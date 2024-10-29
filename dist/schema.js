"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const dapr_1 = require("@dapr/dapr");
// JS SDK does not support Configuration API over HTTP protocol yet
const communicationProtocol = dapr_1.CommunicationProtocolEnum.GRPC;
// Initialize Dapr client
const daprHost = process.env.DAPR_HOST || "localhost";
const daprPort = process.env.DAPR_HTTP_PORT || "50001";
const DAPR_CONFIGURATION_STORE = "appconfigpoc";
const CONFIGURATION_ITEMS = ["name"];
// Function to get a configuration value from Azure App Configuration
async function getConfigValue() {
    const client = new dapr_1.DaprClient({ daprHost, daprPort, communicationProtocol });
    // Get config items from the config store
    try {
        const config = await client.configuration.get(DAPR_CONFIGURATION_STORE, CONFIGURATION_ITEMS);
        Object.keys(config.items).forEach((key) => {
            console.log("Configuration for " + key + ":", JSON.stringify(config.items[key]));
        });
    }
    catch (error) {
        console.log("Could not get config item, err:" + error);
    }
}
getConfigValue();
// Example usage
// Replace 'myKey' with the actual key in Azure App Configuration
exports.schema = (0, graphql_yoga_1.createSchema)({
    typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
    resolvers: {
        Query: {
            hello: () => "World",
        },
    },
});
