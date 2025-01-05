import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()

app.post('/api/v1/user/signup',(c)=>{
   const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate())
   return c.text('signup route')
})


export default app
