import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { authenticate } from './middlewares/authMiddleware';
import { pubsub } from './graphql/pubsub'; // Import the pubsub instance

dotenv.config();

const app: Application = express();
app.use(express.json()); // Middleware to parse JSON requests

// Start Apollo Server Function
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      ...resolvers,
      // No need to redefine the Subscription here as it's already done in resolvers
    },
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      const user = token ? authenticate(token.replace('Bearer ', '')) : null;
      return { user, pubsub }; // Add pubsub to the context
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  console.log(`🚀 Apollo Server ready at http://localhost:${process.env.PORT || 5000}${server.graphqlPath}`);
};

// Connect to MongoDB and Start Servers
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(async () => {
    console.log('Connected to MongoDB');
    await startApolloServer(); // Start Apollo Server after DB connection

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
