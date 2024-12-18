import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all posts
export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// POST a new post
export async function POST(req: Request) {
  const body = await req.json();
  const newPost = await prisma.post.create({
    data: body,
  });
  return NextResponse.json(newPost);
}
