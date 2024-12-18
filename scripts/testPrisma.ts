import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a new post
    const post = await prisma.post.create({
        data: {
            title: "Hello, Prisma!",
            content: "This is my first post.",
            published: true,
        },
    });

    console.log("Created Post:", post);

    // Fetch all posts
    const posts = await prisma.post.findMany();
    console.log("All Posts:", posts);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
