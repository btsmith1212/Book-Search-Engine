const typeDefs = `
  type Query {
    me: User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: savedBook!): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    title: String
    author: [String]
    description: String
    image: String
    link: String
  }

  input savedBook {
    bookId: String
    title: String
    author: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
