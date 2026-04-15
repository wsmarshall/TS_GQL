import { PrismaClient, User } from "../prisma/generated/prisma/client.ts"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { FastifyRequest } from "fastify";
import { authenticateUser } from "./auth";
import { pubSub } from "./pubsub";

const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3(
        {
          url: process.env.DATABASE_URL || "file:./dev.db",
        },
    ),
});

export type GraphQLContext = {
    prisma: PrismaClient;
    currentUser: User | null;
    pubSub: typeof pubSub;
};

export async function contextFactory(
  request: FastifyRequest
): Promise<GraphQLContext> {
  return {
    prisma,
    currentUser: await authenticateUser(prisma, request),
  };
}