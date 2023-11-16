const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("books");
        return userData;
      }
      // By adding context to our query, we can retrieve the logged in user without specifically searching for them

      throw new AuthenticationError("Not logged in");
      // If user attempts to execute this mutation and isn't logged in, throw an error
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        // Make it so a logged in user can only remove a book from their own profile
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
