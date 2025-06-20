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

export const Borrow = model("Borrow", borrowSchema);
