import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema.graphql";

type Link = {
  id: string;
  url: string;
  description: string;
}

const links: Link[] = [{
  id: 'link-0',
  url: 'www.old.shmeddit.com',
  description: 'The Back Page of the Internet'
}]

const resolvers = {
  Query: {
    info: () => 'This is the API for Shmeddit',
    feed: () => links,
  },
  Link: {
  id: (parent: Link) => parent.id,
  description: (parent: Link) => parent.description,
  url: (parent: Link) => parent.url,
  }
}




export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
