export const authorType = `
 type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    books: [Book]
  }`;

export const authorQuery = `
authors(limit: Int, offset: Int, id: ID, name: String, born_date: String): [Author]`;

export const authorMutation = `
  createAuthor(name: String!, biography: String, born_date: String): Author
  updateAuthor(id: ID!, name: String, biography: String, born_date: String): Author
  deleteAuthor(id: ID!): Author
`;
