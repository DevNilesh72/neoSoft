/**
 * Create a Node app that will fetch the data from below API and save in the table in MongoDB Or MySQL. Export this data using API end point from Node app with pagination and sorting
 sumit.munot@neosofttech.com
API - https://jsonplaceholder.typicode.com/posts
 */

const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");

config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: { require: true } },
});
const Post = require("./models/post")(sequelize, DataTypes);

const app = express();

app.use(express.json());

app.get("/posts", async (req, res) => {
  const { page, size } = req.params;
  try {
    const posts = await Post.findAll({
        offset: page - 1,
        limit: size
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

app.listen(3000, () => console.log("server started at 3000"));
