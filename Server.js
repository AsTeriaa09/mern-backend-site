require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const Authrouter = require("./Router/Auth-router");
const ContactRouter = require("./Router/Contact-router");
const ServiceRouter = require("./Router/Service-router");
const AdminRouter = require("./Router/Admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error_middleware");

//using corsOption
const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};
//using cors as middleware
app.use(cors(corsOption));
// use of middleware to make sure that we can use json .to be placed before router.
app.use(express.json());
// mount the router. to use the router in main express app, we mount it at a specific url prefix.
app.use("/api/auth", Authrouter);
app.use("/api/form", ContactRouter);
app.use("/api/serviceRoute", ServiceRouter);
app.use("/api/admin", AdminRouter);
//error middleware
app.use(errorMiddleware);

// first is the root/homepage("/") it sets a route handling for http get reqs. "/" defines the route path.responding to the root url. and 2nd aeguement is the callback function which shows us what's inside the root page. we send req to the server and the sever sends response.
// app.get("/", (req, res) => {
//   res.status(200).send("welcome to mern stack aster!");
// });

// app.get("/reg", (req, res) => {
//   res.status(200).send("lets get started");
// });

// to get the response we sent earlier in a server
const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
});
