import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";


let server : Server

const port = 5000

async function main() {
    try {
        await mongoose.connect('mongodb+srv://nextdemo:3230zKozANKA227A@cluster0.6rjuyq3.mongodb.net/AdvanceNote?retryWrites=true&w=majority&appName=Cluster0');
        server = app.listen(port , () => {
            console.log('your server is running' , port);
        })

        
    } catch (error) {
        console.log(error);
    }
    
}

main()