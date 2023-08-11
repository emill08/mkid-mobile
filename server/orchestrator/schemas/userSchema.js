const redis = require("../config/redis");
const axios = require("axios");
// const baseUrl = "http://localhost:4001/users";
const baseUrl = "http://user-service:4001/users";

const typeDefs = `#graphql
type User {
    _id: ID
    email: String
    password: String
    phoneNumber: Int
    address: String
    role: String
}


type Query {
    Users:[User]
    perUser(userId:ID!):User
}

  type Mutation {
    createUser (
        email: String!
        password: String!
        address: String
        phoneNumber: Int
        ): User
    
     deleteUser(userId:ID!): String

  }
`;

const resolvers = {
  Query: {
    Users: async () => {
      try {
        const usersCache = await redis.get("user:users");
        if (usersCache) {
          return JSON.parse(usersCache);
        }
        const { data } = await axios.get(`${baseUrl}`);
        await redis.set("user:users", JSON.stringify(data));
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    perUser: async (_, args) => {
      try {
        let { userId } = args;
        let userCache = await redis.get(`user:user-${userId}`);
        if (userCache) {
          return JSON.parse(userCache);
        }
        let { data } = await axios.get(`${baseUrl}/${userId}`);
        await redis.set(`user:user-${userId}`, JSON.stringify(data));
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const { email, password, phoneNumber, address } = args;
        const { data } = await axios.post(`${baseUrl}`, {
          email,
          password,
          phoneNumber,
          address,
        });
        console.log(data);
        await redis.del("user:users");
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    deleteUser: async (_, args) => {
      try {
        let { userId } = args;
        let { data } = await axios.delete(`${baseUrl}/${userId}`);
        return data.msg;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
