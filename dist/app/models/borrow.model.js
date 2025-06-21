"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
// models/borrow.model.ts
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: String, required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
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
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
