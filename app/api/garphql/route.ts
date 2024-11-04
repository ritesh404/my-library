// pages/api/graphql.js
import { connectToMongo } from "@/lib/db/mongo";
import { connectToPostgres } from "@/lib/db/postgres";
import { authorQueryResolver } from "@/lib/resolvers/author";
import { bookQueryResolver } from "@/lib/resolvers/book";
import { authorQuery, authorType } from "@/lib/typeDefs/author";
import { bookQuery, bookType } from "@/lib/typeDefs/book";
import { once } from "@/lib/util/once";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `
 ${bookType}
 ${authorType}

  type Query {
    ${bookQuery}
    ${authorQuery}
  }
`;

const resolvers = {
  Query: {
    books: bookQueryResolver,
    authors: authorQueryResolver,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const startUp = once(async function _startUp() {
  await connectToPostgres();
  await connectToMongo();
  const handler = startServerAndCreateNextHandler(server);
  return handler;
});

export async function GET(request: Request) {
  const handler = await startUp();
  // return new Response("Hello, Next.js!");
  return handler(request);
}

export async function POST(request: Request) {
  const handler = await startUp();
  return handler(request);
}
