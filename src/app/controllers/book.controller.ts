import express, { Request, Response } from "express"
import { Book } from "../models/book.model"

export const bookRoutes = express.Router()


// creating book controller
bookRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body
        const book = await Book.create(body)
        res.status(200).json({
            "success": true,
            "message": "Book created successfully",
            "data": book,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        })

    }
})


// getting all the book controller
bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const { filter,
            sortBy,
            sort,
            limit = "10"
        } = req.query 

        const sortOrder = sort === "asc" ? 1 : -1;

        const books = await Book.find({genre : filter}).sort({ [sortBy as string]: sortOrder }).limit(parseInt(limit as string))
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });

    } catch (error: any) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }
})

