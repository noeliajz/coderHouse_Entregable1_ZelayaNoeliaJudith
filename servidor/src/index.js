import app from "./app.js";
import { Server } from "socket.io";
import ProductManager from "./dao/ProductManager.js";

const productManager = new ProductManager("products.json");

const httpServer = app.listen(8080, () => {
    console.log("Bienvenido al Backend, estas conectado en el puerto 8080");
});

const io = new Server(httpServer);
app.set("io", io);

io.on("connection", async (socket) => {

    console.log("Cliente conectado");

    const products = await productManager.getProducts();

    socket.emit("products", products);

});