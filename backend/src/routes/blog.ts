import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt' 
import { Hono } from 'hono'
import { createBlogInput, updateBlogInput } from '@antony_th18/medium-common';


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables: {
        userId: string,
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    let token = header;
  
    if(token.split(" ")[0] == "Bearer") {
      token = token.split(" ")[1];
    }

    type JwtPayload = {
        id: string
    }
    try {
        const response = await verify(token, c.env.JWT_SECRET) as JwtPayload;
  
        if(response) {
            c.set("userId", response.id);
            c.status(200);
            await next();
        } 
    } catch {
        c.status(403);
        return c.json ({
        msg: "User is not signed in, cannot be authenticated"
    })
    }

  })
  
  blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if(!success) {
        c.status(411);
        c.json({
            error: "Incorrect Inputs"
        })
    }

    const id = c.get("userId");

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: id
        }
    })

    return c.json({
        id: blog.id
    })
  })
  
  blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    if(!success) {
        c.status(411);
        c.json({
            error: "Incorrect Inputs"
        })
    }

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    FirstName: true,
                    LastName: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
  })
  
  blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const id = await c.req.param('id');

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id : id
            },

            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        FirstName: true,
                        LastName: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch(e) {
        c.status(411);
        c.json({
            msg: "Error while fetching blog post"
        })
    }

  })
  
  