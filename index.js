/**
 * Create a Node app that will fetch the data from below API and save in the table in MongoDB Or MySQL. Export this data using API end point from Node app with pagination and sorting
 API - https://jsonplaceholder.typicode.com/posts
 */

import express from "express";
const app = express();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

app.use(express.json());

app.get('/post', async (req, res) => {
    const {pageno, size, orderBy} = req.query

    const posts = await prisma.post.findMany({
        skip: (pageno - 1) * size,
        take: +size,
        orderBy: {
            userId: 'asc'
        }
    })

    res.send(posts)
})


app.listen(3000, () => console.log("server started at 3000"));
