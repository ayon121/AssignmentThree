import express, { Application, Request, Response } from 'express'
import { bookRoutes } from './app/controllers/book.controller'



const app: Application = express()

app.use(express.json())


// all routes 
app.use("/api/books" , bookRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send('Welcome To Library Management API with Express, TypeScript & MongoDB')

})


export default app