import express from "express";
import cors from "cors";
import { connection } from "./database.mjs";
import { errorHandler } from "./middlewares/error.middleware.js";
import { PORT, HOST } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import userRoutes from "./routes/user.routes.js";


const baseUrl = `${HOST}:${PORT}`; // Utiliser une variable d'environnement pour l'Url

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Dossier pour les fichiers statiques

// Routes
app.use("/products", productRoutes(connection, baseUrl));
app.use("/users", userRoutes(connection));
app.use("/categories", categoryRoutes(connection));
app.use("/auth", authRoutes(connection));

// Handle 404 as default route
app.use((req, res) => {
    console.log(`❌ 404 - ${req.method} ${req.originalUrl}`);
    res.status(404).json({ msg: "Page Not Found" });
});

// Gestion des erreurs
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server listening on ${baseUrl}`);
});
