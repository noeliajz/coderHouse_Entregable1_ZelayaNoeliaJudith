import app from "./app.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { productModel } from "./model/productModel.js"; 

const httpServer = app.listen(8080, () => {
    console.log("Bienvenido al Backend, estas conectado en el puerto 8080");
    mongoose.connect("mongodb+srv://noeliajudithzelayautnfrt_db_user:67TYuyYs8ELk8nFd@cluster0.49xpgr5.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log("Error DB:", err));
});

const io = new Server(httpServer);
app.set("io", io);
io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    const products = await productModel.find().lean();
    socket.emit("products", products);
});