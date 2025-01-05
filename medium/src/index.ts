import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'
type Bindings = {
  DATABASE_URL: string
}

const app = new Hono<{
    Bindings:Bindings
}>()


app.post('/api/signup',async(c)=>{
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
       if(createdUser){
        c.status(201)
        return c.json({message:'User created Successfully'})
       }
    } catch (error) {
        return c.json({error:`Internal Server Error`})
    }


})





export default app
