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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// creating book controller
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(200).json({
            "success": true,
            "message": "Book created successfully",
            "data": book,
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
// getting all the book controller
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit = "10" } = req.query;
        const sortField = sortBy || "createdAt";
        const sortOrder = sort === "asc" ? 1 : -1;
        const parsedLimit = parseInt(limit);
        const limitValue = isNaN(parsedLimit) ? 10 : parsedLimit;
        let books = [];
        if (filter) {
            books = yield book_model_1.Book.find({ genre: filter })
                .sort({ [sortField]: sortOrder })
                .limit(limitValue);
        }
        else {
            books = yield book_model_1.Book.find()
                .sort({ [sortField]: sortOrder })
                .limit(limitValue);
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
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
// Get Book by ID Controller
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
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
// Update Book by ID Controller
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const update = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, update, {
            new: true
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
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
// Delete Book by ID Controller
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
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
