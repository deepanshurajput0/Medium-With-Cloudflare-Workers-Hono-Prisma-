import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify, JwtVariables } from 'hono/jwt'
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET:string
}
type Variables ={
   userId:string
}

export const blogRouter = new Hono<{
    Bindings:Bindings,
    Variables:Variables
}>()

blogRouter.use('/*', async(c,next)=>{
  try {
    const authHeader = c.req.header("Authorization") || "";
    const user = await  verify(authHeader,c.env.JWT_SECRET)
    if(user){
        //@ts-ignore
      c.set("userId", user.id); 
       await  next()
    }else{
         c.status(403)
         return c.json({error:"Unauthorised User"})
    }
  } catch (error) {
     return c.json({error:'Invalid Token'})
  }

})

blogRouter.post('/create',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
     const { title, content } = await c.req.json()
     const authorId = c.get('userId')
     if(!title || !content){
        c.status(401)
        return c.json({error:"All fields are required"})
     } 
     await prisma.post.create({
        data:{
            title,
            content,
            authorId:Number(authorId),
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


blogRouter.put('/update',async(c)=>{
    const authorId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const { title, content } = await c.req.json()
        await prisma.post.update({
            data:{
              title,
              content
            },
            where:{
                id:Number(authorId)
            }
        })

         c.status(200)
         return c.json({message:'Blog Updated Successfully'})

    } catch (error) {
        c.status(500)
        return c.json({error:'Internal Server Error'})
    }
})


blogRouter.delete('/delete',async(c)=>{
    const authorId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        await prisma.post.delete({
            where:{
                id:Number(authorId)
            }
        })
        c.status(200)
        return c.json({message:"Blog deleted successfully"})
    } catch (error) {
        return c.json({error:'Internal Server Error'})
    }
})


blogRouter.get('/blogs',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const allBlogs = await prisma.post.findMany({})
        c.status(200)
        return c.json(allBlogs)
    } catch (error) {
        c.status(500)
        return c.json({error:'Internal Server Error'})
    }
})