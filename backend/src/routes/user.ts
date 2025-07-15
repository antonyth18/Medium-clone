import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt' 
import { Hono } from 'hono'
import { signinInput, signupInput } from '@antony_th18/medium-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if(!success) {
        c.status(411);
        return c.json({
            error: "Incorrect inputs"
        })
    }
  
    // const findUser = await prisma.user.findFirst({
    //   where: {
    //     email: body.email
    //   }
    // })
  
    // if(findUser) {
    //   c.status(403)
    //   return c.json({
    //     msg: "User already exists"
    //   });
    // }
  
    const user = await prisma.user.create({
      data: {
        email: body.email,
        FirstName: body.FirstName,
        LastName: body.LastName,
        password: body.password,
      }
    })
  
    const token = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
  
    return c.json({
      jwt: token
    })
  
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if(!success) {
        c.status(411);
        return c.json({
            error: "Incorrect inputs"
        })
    }
  
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })
  
    if(!findUser) {
      c.status(403)
      return c.json({
        msg: "User does not exist"
      });
    }
  
    const token = await sign({id: findUser.id}, c.env.JWT_SECRET);
  
    return c.json({
      jwt: token
    })
  
  })
  