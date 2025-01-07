import { z } from 'zod'

export const signupInput = z.object({
    name:z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)

})

export const signinInput = z.object({
    name:z.string().min(3).optional(),
    email: z.string().email(),
    password: z.string().min(6)

})

export const createBlogInput = z.object({
    title:z.string().min(10),
    content:z.string()
})


export const updateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id:z.number()
}) 

export type SingupInput = z.infer<typeof signupInput>
export type SinginInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput >
export type UpdateBlogInput = z.infer<typeof updateBlogInput>