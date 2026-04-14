import 'graphql-import-node';
import fastify from "fastify";
import { contextFactory } from "./context";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getGraphQLParameters, processRequest, Request, renderGraphiQL, shouldRenderGraphiQL, sendResult } from "graphql-helix";
import { schema } from "./schema";

async function main() {
  const server = fastify();

    server.route({
    method: ["GET", "POST"],
    url: "/graphql",
    handler: async (req, reply) => {
      const request: Request = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
      };

      if (shouldRenderGraphiQL(request)) {
        reply.header("Content-Type", "text/html");
        reply.send(
          renderGraphiQL({
            endpoint: "/graphql",
          })
        );

        return;
      }
      
      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        request,
        schema,
        operationName,
        contextFactory,
        query,
        variables,
      });

      sendResult(result, reply.raw);
    }
  });

  server.listen({ port: 3000, host: "0.0.0.0"}, () => {
    console.log(`Server is running on http://localhost:3000/`);
  });

  
}

main();