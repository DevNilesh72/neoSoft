import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(
    (res) => res.json()
  );

  posts.map(async (post) => await prisma.post.create({data: post}))
}

seed()
  .then(async () => {
    console.log("first")
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
