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

        const sortField = (sortBy as string) || "createdAt";
        const sortOrder = sort === "asc" ? 1 : -1;
        const parsedLimit = parseInt(limit as string);
        const limitValue = isNaN(parsedLimit) ? 10 : parsedLimit;

        let books: any = [];

        if (filter) {
            books = await Book.find({ genre: filter })
                .sort({ [sortField]: sortOrder })
                .limit(limitValue);
        } else {
            books = await Book.find()
                .sort({ [sortField]: sortOrder })
                .limit(limitValue);
        }

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


// Get Book by ID Controller
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params
        const book = await Book.findById(bookId);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });



    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }
})


// Update Book by ID Controller
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params
        const update = req.body
        const book = await Book.findByIdAndUpdate(bookId, update, {
            new: true
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });

    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }
})


// Delete Book by ID Controller
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params
        const book = await Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });

    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }
})


