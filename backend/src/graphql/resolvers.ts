import { PubSub } from 'graphql-subscriptions';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/tokenUtils';

// Create a single instance of PubSub
const pubsub = new PubSub();

export const resolvers = {
  Mutation: {
    signup: async (_: any, { username, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      const token = generateToken(newUser.id, newUser.email);
      return { id: newUser.id, username: newUser.username, email: newUser.email, token };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid credentials');

      const token = generateToken(user.id, user.email);
      return { id: user.id, username: user.username, email: user.email, token };
    },

    sendMessage: async (_: any, { content, recipientId }: {content:String,recipientId:String}) => {
      // Message sending logic here (to MongoDB, etc.)
      const message = {
        id: Math.random().toString(),
        content,
        recipientId,
        createdAt: new Date().toISOString(),
      };

      // Publish the message to the recipient's channel
      pubsub.publish(`MESSAGE_SENT_${recipientId}`, { messageSent: message });

      return message;
    },
  },

  Subscription: {
    messageSent: {
      // Subscribe to messages for a specific user
      subscribe: (_: any, { recipientId }: any) => {
        return pubsub.publish(`MESSAGE_SENT_`,null)
      },
    },
  },
};
