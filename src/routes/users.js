// routes/users.js
import express from "express";

const user2Router = express.Router();

/**
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users
 */
user2Router.get("", function (req, res) {
  res.send("done");
});

export default user2Router;
