require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const users = [
  {
    username: "john",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "anna",
    password: "password123member",
    role: "member",
  },
];

const refreshTokens = [];

app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.SECRET_REFRESH_TOKEN
    );
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } else {
    res.end("Incorrect Username or Password");
  }
});

app.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

app.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((token) => t !== token);

  res.send("Logout successful");
});

app.listen(process.env.AUTH_PORT, () => {
  console.log(`auth server is listening to port ${process.env.AUTH_PORT}`);
});
