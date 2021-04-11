const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  "mongodb+srv://admin:Admin123@vecluster.yxuub.mongodb.net/vehiculos?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
