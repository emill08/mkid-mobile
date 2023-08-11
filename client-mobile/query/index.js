import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products {
    Products {
      id
      name
      description
      price
      mainImage
      Category {
        name
      }
    }
  }
`;

export const PER_PRODUCT = gql`
  query PerProduct($productId: ID!) {
    perProduct(productId: $productId) {
      id
      name
      description
      price
      mainImage
      User {
        email
      }
      Category {
        name
      }
      Images {
        imageUrl
      }
    }
  }
`;
