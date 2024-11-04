export const bookType = `
type Book {
    id: ID!
    title: String!
    description: String
    published_date: String
    author: Author
  }`;

export const bookQuery = `
books(limit: Int, offset: Int, id: ID, title: String, author_id: ID, published_date: String): [Book]`;

export const bookMutation = `
  createBook(title: String!, description: String, published_date: String, author_id: String!): Book
  updateBook(id: ID!, title: String, description: String, published_date: String, author_id: String): Book
  deleteBook(id: ID!): Book
`;