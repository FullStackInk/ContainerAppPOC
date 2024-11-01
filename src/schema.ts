import { createSchema } from "graphql-yoga";

import { CommunicationProtocolEnum, DaprClient } from "@dapr/dapr";

// JS SDK does not support Configuration API over HTTP protocol yet
const communicationProtocol = CommunicationProtocolEnum.GRPC;

// Initialize Dapr client
const daprHost = process.env.DAPR_HOST || "localhost";
const daprPort = process.env.DAPR_GRPC_PORT || "3501";

const DAPR_CONFIGURATION_STORE = "appconfigpoc";
const CONFIGURATION_ITEMS = ["name"];

console.log(process.env)

// Function to get a configuration value from Azure App Configuration
async function getConfigValue(key: any) {
  const client = new DaprClient({ daprHost, daprPort, communicationProtocol });
  // Get config items from the config store
  try {
    const config = await client.configuration.get(
      DAPR_CONFIGURATION_STORE,
      CONFIGURATION_ITEMS
    );
    Object.keys(config.items).forEach((key) => {
      console.log(
        "Configuration for " + key + ":",
        JSON.stringify(config.items[key])
      );
    });

    return config.items[key].value

  } catch (error) {
    console.log("Could not get config item, err:" + error);
  }
}


// Example usage
// Replace 'myKey' with the actual key in Azure App Configuration

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => getConfigValue("name"),
    },
  },
});
