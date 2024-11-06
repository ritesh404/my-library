import { gql } from "@apollo/client";

export const AUTHORS_QUERY = gql`
  query Authors($limit: Int, $offset: Int) {
    authors(limit: $limit, offset: $offset) {
      id
      name
      biography
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
