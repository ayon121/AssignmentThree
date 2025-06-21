// models/borrow.model.ts
import { Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/borrowbook.interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: { type: String, required: true },
        quantity: { type: Number, required: true },
        dueDate: { type: String, required: true },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);


// using pre middleware
borrowSchema.pre("validate", function (next) {
    const due = new Date(this.dueDate);
    const now = new Date();
    if (due <= now) {
        return next(new Error("Due date must be in the future."));
    }
    next();
});

// using post middleware
borrowSchema.post("save", function (doc) {
    console.log(`Book borrowed: ${doc.book}, Quantity: ${doc.quantity}`);
});

export const Borrow = model("Borrow", borrowSchema);
