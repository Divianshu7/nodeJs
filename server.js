import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
const colors = require("colors");
const { errorHandler } = require("./middleware/error-handler");
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express'
const app = express();



app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple router
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NodeJs application." });
});

// set port, listen for requests
const PORT = 8080;

// database sync
mongoose.connect('mongodb+srv://Divianshu7:7UEYkyN3PTU7x0hN@cluster0.bert3m3.mongodb.net/node')
  .then(() => console.log('Connected!'));

// rout
app.use("/api/users", require("./routes/users-routes"));

// global error handler
app.use(errorHandler);

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(PORT, () => console.log(`running at ${PORT}`))
module.exports = app
