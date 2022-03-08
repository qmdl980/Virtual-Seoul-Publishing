import { ApolloServer } from "apollo-server-micro";
// import * as path from 'path';
import context from "../../config/schema/context";
import { resolvers, typeDefs } from "../../config/resolvers_type";
import Cors from "micro-cors";
import { processRequest } from "graphql-upload";

const path = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  uploads: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.end();
  }

  const contentType = req.headers["content-type"];

  if (contentType?.startsWith("multipart/form-data")) {
    req.filePayload = await processRequest(req, res);
    // console.log("processRequest", req.filePayload);
  }

  return apolloServer.createHandler({ path: path })(req, res);
});
