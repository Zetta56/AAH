const express = require("express"),
      app = express(),
      http = express.createServer(app);

const indexRoutes = require("./routes/index");

app.use("/api", indexRoutes);

http.listen(process.env.PORT || 3001, () => {
  console.log("Server Started");
})