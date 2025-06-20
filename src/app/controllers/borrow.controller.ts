import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";



export const borrowRoutes = express.Router()

borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;
        await Book.borrowBook(book, quantity)
        const borrowRecord = await Borrow.create({
            book,
            quantity,
            dueDate,
        });
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }

})