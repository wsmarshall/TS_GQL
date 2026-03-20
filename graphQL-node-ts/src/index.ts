import 'graphql-import-node';
import fastify from "fastify";
import { execute, parse } from "graphql";
import { schema } from "./schema";

async function main() {
  const server = fastify();

  server.get("/", (req, reply) => {
    reply.send({ test: true });
  });

  server.listen({ port: 3000, host: "0.0.0.0"}, () => {
    console.log(`Server is running on http://localhost:3000/`);
  });

  
}

main();