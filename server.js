// Packages
require("dotenv").config();
const express = require("express"),
      http = require("http"),
      cors = require("cors"),
      jwt = require('jsonwebtoken');

// Objects
const app = express(),
      server = http.createServer(app);

// Settings
app.use(cors());
app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({extended: true}));
// app.use(jwt({
//   secret: process.env.JWT_SECRET, 
//   algorithms:['HS256']
// }))

// Routes
const indexRoutes = require("./routes/index");
app.use("/api", indexRoutes);

// Start Server
server.listen(process.env.PORT || 3001, () => {
  console.log("Server Started");
})