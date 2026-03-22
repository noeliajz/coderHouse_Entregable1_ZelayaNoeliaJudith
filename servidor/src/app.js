import express from "express";
import productsRouter from "./routes/ProductsRouter.js";
import __dirname from "./utils.js"
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import cartRouter from "./routes/CartRouter.js";

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use("/api/carts", cartRouter);


app.use(express.static(__dirname+ "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/", viewsRouter)

export default app;
