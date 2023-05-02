import { FastifyInstance } from "fastify"
import authRoutes from "./routes/auth.routes"
export default async(app: FastifyInstance)=>{
    app.register(authRoutes, {prefix:'/auth'})
}