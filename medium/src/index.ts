import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcrypt from 'bcryptjs'
import { userRouter } from '../routes/userRoutes'
type Bindings = {
  DATABASE_URL: string
  JWT_SECRET:string
}

const app = new Hono<{
    Bindings:Bindings
}>()

app.route('/api/v1/user',userRouter)



export default app
