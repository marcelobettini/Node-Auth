const express = require("express");
const jsonServer = require("json-server");

const app = express();
const PORT = 3000;

// Express middleware to parse JSON requests
app.use(express.json());
const jsonServerRouter = jsonServer.router("db.json");

// Login route
app.post("/api/login", (req, res) => {
  const {
    body: { email, pass },
  } = req;
  const users = jsonServerRouter.db.get("users").value();
  const user = users.filter(usr => usr.email === email);
  if (!user.length) {
    res.status(404).send("Invalid email or password");
  } else res.send(user);
});

// Register route
app.post("/api/register", (req, res) => {
  // Implement registration logic here
});

// Get all users route
app.get("/api/users", (req, res) => {
  const users = jsonServerRouter.db.get("users");
  res.send(users);
});

// Catch all route
app.use("*", (req, res) => {
  res.send("not found");
});

//middleware for using database in /api reçoute req's
app.use("/api", jsonServerRouter);

// Start your Express server
app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});
