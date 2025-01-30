import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Message {
    id: ID!
    content: String!
    sender: User!
    recipientId: ID!
    createdAt: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    sendMessage(content: String!, recipientId: ID!): Message
  }

  type Subscription {
    messageSent: Message
  }
`;
