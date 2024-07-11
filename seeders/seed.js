// seed.js

const { Sequelize, DataTypes } = require("sequelize");
const { config } = require("dotenv");

config();
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

const Post = require("../models/post")(sequelize, DataTypes);

const seedDatabase = async () => {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(
    (res) => res.json()
  );
  posts.map(async (post) => await Post.create(post));

  await sequelize.close();
};

seedDatabase();
