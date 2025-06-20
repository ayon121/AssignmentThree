import { Model } from "mongoose";

export interface IBook {
    title: string,
    author: string,
    isbn: string,
    description: string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    copies: number,
    available: boolean
}


export interface BookStaticMethods extends Model<IBook> {
    borrowBook(bookId: string, quantity: number): any
}