import { PrismaClient } from "../prisma/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3(
        {
          url: process.env.DATABASE_URL || "file:./dev.db",
        },
    ),
});

async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'Fullstack tutorial for GraphQL',
            url: 'www.stackoverflow.com',
        },
    });
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })