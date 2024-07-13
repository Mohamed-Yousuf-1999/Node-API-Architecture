const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

// Connect to Mongo DB
connectDB();

//Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

//Routes
app.use("/api", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
