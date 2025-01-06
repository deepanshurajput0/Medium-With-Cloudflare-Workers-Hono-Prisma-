import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET:string
}

export const blogRouter = new Hono<{
    Bindings:Bindings
}>()


blogRouter.post('/create',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
     const { title, content } = await c.req.json()
     if(!title || !content){
        c.status(401)
        return c.json({error:"All fields are required"})
     } 
     await prisma.post.create({
        data:{
            title,
            content,
            authorId:4,
            published:true
        }
     })  
     
     return c.json({message:'Blog created Successfully'})
    } catch (error) {
        c.status(500)
        return c.json({error:'Internal Server Error'})
    }
})

blogRouter.get('/get/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
     const id =  c.req.param('id')
      const blog = await prisma.post.findFirst({
        where:{
            id:Number(id)
        }
        ,
        include:{
            author:{
                select:{
                    name:true
                }
            }
        }
      })
      return c.json(blog)
    } catch (error) {
        console.log(error)
        return c.json({error:'Internal Server Error'})
    }
})