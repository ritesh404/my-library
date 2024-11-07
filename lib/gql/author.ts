import { gql } from "@apollo/client";

export const AUTHORS_QUERY = gql`
  query Authors($limit: Int, $offset: Int) {
    authors(limit: $limit, offset: $offset) {
      id
      name
      biography
      born_date
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor(
    $name: String!
    $biography: String
    $born_date: String
  ) {
    createAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor(
    $id: ID!
    $name: String!
    $biography: String
    $born_date: String
  ) {
    updateAuthor(
      id: $id
      name: $name
      biography: $biography
      born_date: $born_date
    ) {
      id
      name
      biography
      born_date
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DelteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      biography
      born_date
    }
  }
`;
