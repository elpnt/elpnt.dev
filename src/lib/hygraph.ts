import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/generated/graphql";

const client = new GraphQLClient(process.env.HYGRAPH_API as string);
export const hygraph = getSdk(client);
