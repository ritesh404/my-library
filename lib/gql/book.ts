import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  query Books($limit: Int, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      id
      title
      description
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $published_date: String
    $author_id: String!
  ) {
    createBook(
      title: $title
      description: $description
      published_date: $published_date
      author_id: $author_id
    ) {
      id
      title
      description
    }
  }
`;
