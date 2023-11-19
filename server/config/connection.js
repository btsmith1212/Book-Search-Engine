const mongoose = require("mongoose");

const connection =
  "mongodb+srv://btsmith1212:password1234@cluster0.pxocolz.mongodb.net/book-search-engine1212?retryWrites=true&w=majority";
mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
