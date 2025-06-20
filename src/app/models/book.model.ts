import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true },

},
    {
        timestamps: true,
        versionKey: false,
    }
)

bookSchema.static("borrowBook", async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);
    if (!book) {
        throw {success: false, status: 404, message: "Book not found" };
    }

    if (book.copies < quantity) {
        throw {success: false, status: 400, message: "Not enough copies available" };
    }
    book.copies -= quantity;
    if (book.copies === 0) {
        book.available = false;
    }

    await book.save();
    return book;
})

export const Book = model<IBook, BookStaticMethods>("Book", bookSchema)