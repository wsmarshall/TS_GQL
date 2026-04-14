import { PrismaClient } from "../prisma/generated/prisma/client.ts"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3(
        {
          url: process.env.DATABASE_URL || "file:./dev.db",
        },
    ),
});

export type GraphQLContext = {
    prisma: PrismaClient;
};

export async function contextFactory() {
    return {
        prisma,
    };
}