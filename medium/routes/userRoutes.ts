import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { signinInput, signupInput } from './types'
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
        const body = await c.req.json()
        const validation = signupInput.safeParse(body)
        if(!validation.success){
            c.status(400)
            let errormsg = null
            validation.error.errors.map((item)=>(
                  errormsg = item.message
            ))
            return c.json({
                error:'Invalid Input',
                message:errormsg
            })
        }
        const user = await prisma.user.findUnique({
            where:{
                email:body.email
            }
        })
        if(user){
            c.status(401)
            return c.json({error:'User Already exists try new email'})
        }
       const hashedPassword = await bcrypt.hash(body.password,10)
       const createdUser = await prisma.user.create({
            data:{
                name:body.name,
                email:body.email,
                password:hashedPassword
            }
        })
         const token = await sign({id:createdUser.id},c.env.JWT_SECRET)

       if(createdUser){
        c.status(201)
        return c.json({message:'User created Successfully',token})
       }
    } catch (error) {
        c.status(500)
        return c.json({error:`Internal Server Error`})
    }finally{
        await prisma.$disconnect();
    }


})


userRouter.post('/login',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
     const body = await c.req.json()
     const validation = signinInput.safeParse(body)
     if(!validation.success){
         c.status(400)
         let errormsg = null
         validation.error.errors.map((item)=>(
               errormsg = item.message
         ))
         return c.json({
             error:'Invalid Input',
             message:errormsg
         })
     }
     const user = await prisma.user.findUnique({
        where:{
            email:body.email
        }
     })
     if(!user){
        c.status(402)
        return c.json({error:'Inavlid User and password'})
     }
     let isCorrectPassword = await bcrypt.compare(body.password,user.password)
     if(!isCorrectPassword){
        c.status(402)
        return c.json({error:'Inavlid User and password'})
     }
     const token = await sign({id:user.id},c.env.JWT_SECRET)
     return c.json({
        message:'User logged in successfully',
        user,
        token
     })
    } catch (error) {
        c.status(500)
        return c.json({error:'Internal Server Error'})
    }
})

