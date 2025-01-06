import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET:string
}

export const userRouter = new Hono<{
    Bindings:Bindings
}>()


userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const { name , email, password } = await c.req.json()
        if(!name || !email || !password){
            c.status(400)
            return c.json({error:'All fields are required'})
        }
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(user){
            c.status(401)
            return c.json({error:'User Already exists try new email'})
        }
       const hashedPassword = await bcrypt.hash(password,10)
       const createdUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
         const token = await sign({id:createdUser.id},c.env.JWT_SECRET)

       if(createdUser){
        c.status(201)
        return c.json({message:'User created Successfully',token})
       }
    } catch (error) {
        return c.json({error:`Internal Server Error`})
    }


})


userRouter.post('/login',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
     const { email, password } = await c.req.json()
     if(!email || !password){
        c.status(400)
        return c.json({error:'All fields are required'})
     }
     const user = await prisma.user.findUnique({
        where:{
            email
        }
     })
     if(!user){
        c.status(402)
        return c.json({error:'Inavlid User and password'})
     }
     let isCorrectPassword = await bcrypt.compare(password,user.password)
     if(!isCorrectPassword){
        c.status(402)
        return c.json({error:'Inavlid User and password'})
     }
     const token = await sign({id:user.id},c.env.JWT_SECRET)
     return c.json({
        message:'User logged in successfully',
        token
     })
    } catch (error) {
        c.status(500)
        return c.json({error:'Internal Server Error'})
    }
})

