"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        yield book_model_1.Book.borrowBook(book, quantity);
        const borrowRecord = yield borrow_model_1.Borrow.create({
            book,
            quantity,
            dueDate,
        });
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
}));
// borrow book aggregation 
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
}));
