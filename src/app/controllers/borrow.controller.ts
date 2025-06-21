import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import mongoose from "mongoose";




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
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }

})



// borrow book aggregation 
borrowRoutes.get("/", async (req, res) => {
    try {
        const summary = await Borrow.aggregate([
            // pipeline 1 - converting bookid
            {

                $addFields: {
                    bookObjectId: { $toObjectId: "$book" }
                }

            },
            // pipeline 2  grouping by bookid
            {
                $group: {
                    _id: "$bookObjectId",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            // pipeline 3 - macthing tables
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            // pipeline 4 - unwinding bookinfo from previous pipeline
            {
                $unwind: "$bookInfo"
            },
            // pipeline 5 - projecting required fields
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });


    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error,
        })
    }
})