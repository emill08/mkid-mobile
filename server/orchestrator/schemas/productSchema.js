const redis = require("../config/redis");
const axios = require("axios");
// const baseUrl = "http://localhost:4002";
const baseUrl = "http://app-service:4002";
// const userUrl = "http://localhost:4001/users";
const userUrl = "http://user-service:4001/users";

const typeDefs = `#graphql
type Category {
    id: ID
    name: String
}

type Images {
    id: ID
    ProductId: Int
    imageUrl: String
}

type User {
    _id: ID
    email: String
    password: String
    phoneNumber: Int
    address: String
    role: String
}

type Product {
    id: ID
    CategoryId: String
    name: String
    price: Int
    description: String
    mainImage: String
    userMongoId: String
    Category: Category
    Images: [Images]
    User: User
}

type Query {
    Products: [Product]
    perProduct(productId:ID!): Product
}

type Mutation {
  createProduct (
        name:String! 
        price:Int! 
        description:String! 
        mainImage:String! 
        CategoryId:Int! 
        userMongoId:String! 
        images:[String]! 
    ): String!

    editProduct(
      id:ID!
        CategoryId:Int! 
        name:String! 
        price:Int! 
        description:String! 
    ): String!

    deleteProduct(id:ID!): String!
}
`;

const resolvers = {
  Query: {
    Products: async () => {
      try {
        const productCache = await redis.get(`app:products`);
        if (productCache) {
          console.log(`ini dari cache`);
          return JSON.parse(productCache);
        }
        const { data } = await axios.get(`${baseUrl}/products`);
        console.log(data);
        await redis.set(`app:products`, JSON.stringify(data));
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    perProduct: async (_, args) => {
      try {
        const { productId } = args;
        const productCache = await redis.get(`app:products-${productId}`);
        if (productCache) {
          console.log(`ini dari cache perProduct`);
          return JSON.parse(productCache);
        }
        let { data } = await axios.get(`${baseUrl}/products/${productId}`);
        let userMongoId = data.userMongoId;
        console.log(userMongoId);
        const { data: user } = await axios.get(`${userUrl}/${userMongoId}`);
        data = {
          ...data,
          User: user,
        };
        await redis.set(`app:products-${productId}`, JSON.stringify(data));
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      try {
        let {
          CategoryId,
          name,
          price,
          description,
          mainImage,
          userMongoId,
          images,
        } = args;
        const { data } = await axios.post(`${baseUrl}/products`, {
          CategoryId,
          name,
          price,
          description,
          mainImage,
          userMongoId,
          images,
        });
        console.log(data);
        await redis.del(`app:products`);
        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
    deleteProduct: async (_, args) => {
      try {
        let { id } = args;
        let { data: target } = await axios.get(`${baseUrl}/products/${id}`);
        const { data } = await axios.delete(`${baseUrl}/products/${id}`);
        await redis.del(`app:products`);
        await redis.del(`app:products-${target.id}`);
        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
    editProduct: async (_, args) => {
      try {
        let { CategoryId, name, price, description, id } = args;
        let { data: target } = await axios.get(`${baseUrl}/products/${id}`);
        let { data } = await axios.put(`${baseUrl}/products/${id}`, {
          CategoryId,
          name,
          price,
          description,
        });
        console.log(data);
        await redis.del(`app:products`);
        await redis.del(`app:products-${target.id}`);
        return data.message;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
