import app from "./app.js";
import { Server } from "socket.io";
import ProductManager from "./dao/ProductManager.js";
import mongoose from "mongoose";

const productManager = new ProductManager("products.json");

const httpServer = app.listen(8080, () => {
    console.log("Bienvenido al Backend, estas conectado en el puerto 8080");
    mongoose.connect("mongodb+srv://noeliajudithzelayautnfrt_db_user:67TYuyYs8ELk8nFd@cluster0.49xpgr5.mongodb.net/?appName=Cluster0")
});

const io = new Server(httpServer);
app.set("io", io);

io.on("connection", async (socket) => {

    console.log("Cliente conectado");

    const products = await productManager.getProducts();

    socket.emit("products", products);

});