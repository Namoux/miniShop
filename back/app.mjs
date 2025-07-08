import express from "express";
import cors from "cors";
import {product, sequelize} from "./database.mjs";
import { ProductModel } from "./product.model.js";

const PORT = 4004;

async function main() {
    
    const Product = new ProductModel(sequelize);
    const app = express();
    app.use(express.json());
    app.use(cors());
    
    app.get("/all-products/:limit", async (req, res) => {

        const productLimit = parseInt(req.params.limit);

        if (isNaN(productLimit)) {
            res.status(400).json({ msg: "Wrong request param" });
            return;
        }
        const products = await Product.getAllProducts(productLimit);

        console.log("products : ", products);

        if (productLimit.length !== 0) {
            res.status(200).json(products);
        } else {
            // Les produits n'existent pas !
            res.status(400).json("Unknow Products");

        }
    });

    app.get("/product/:id", async (req, res) => {

        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            res.status(400).json({ msg: "Wrong request param" });
            return;
        }
        const produit = await Product.getProductById(productId);
        console.log("product : ", produit);


        if (produit != null) {
            res.status(200).json(produit);
        } else {
            // Le produit n'existe pas !
            res.status(400).json("Unknow Product");
        }
    });

    app.post("/new-product", async (req, res) => {

        try{
            const newProduct = req.body;

            // console.log("new produit", newProduct.name);

            // sequelize.models.product;

            if (newProduct.length == undefined) {
                product.create ({
                    name : newProduct.name,
                    description : newProduct.description,
                    price : newProduct.price,
                    imageURL : newProduct.imageURL,
                    categoryID : newProduct.categoryID
                }).catch(error => {
                    res.status(500).json({ msg: "Error creating product", error });
                    return;
                });
   
            } else {
                newProduct.forEach((oneProduct) => {
                    product.create ({
                        name : oneProduct.name,
                        description : oneProduct.description,
                        price : oneProduct.price,
                        imageURL : oneProduct.imageURL,
                        categoryID : oneProduct.categoryID
                    }).catch(error => {
                    res.status(500).json({ msg: "Error creating product", error });
                    return;
                    });               
                });
            }

            res.status(200).json({ msg: "Product created", data: newProduct });
            console.log("Product created : ", newProduct);

        }  catch (error) {
            res.status(400).json({ msg: "Wrong request" });
            console.log("Wrong request of client");
            return;
        };

    });
    
    app.put("/edit-product/:id", async (req, res) => {

        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            res.status(400).json({ msg: "Wrong request param" });
            return;
        }

        const produit = await Product.getProductById(productId);

        try {
            if (produit) {
                // Le produit existe !
                const editProduct = req.body;
                console.log("editProduct :", editProduct);

                // for await (const [key, value] of Object.entries(editProduct)) {
                //     console.log(`${key}: ${value}`);
                //     connection.execute(`UPDATE product 
                //     SET ${key} = '${value}'  
                //     WHERE id = '${productId}'
                //     `);
                // };

                await product.update(editProduct, {
                    where: {
                        id: productId
                    }
                });

                // Je renvoi le produit au format JSON
                res.status(200).json({ msg: "Product edited !", data: produit });
                console.log({ msg: "Product edited !", data: produit });
            } else {
                // Le produit n'existe pas !
                res.statusCode = 404;
                res.json("Unknow Product");
            }
        } catch (error) {
            res.status(400).json({ msg: "Wrong request" });
            console.log("Wrong request of client");
            return;
        };
    });

    app.delete("/product/:id", async (req, res) => {

        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            res.status(400).json({ msg: "Wrong request param" });
            return;
        };

        const produit = await Product.getProductById(productId);

        if (produit) {
            // Le produit existe !
            // Je renvoi le produit au format JSON
            await product.destroy({
                where: {
                    id : productId
                }
            });
            res.json({ msg: "Product deleted", data: produit });
            console.log({ msg: "Product deleted", data: produit });
        } else {
            // Le produit n'existe pas !
            res.statusCode = 404;
            res.json("Unknow Product");
        }
    });

        // Handle 404 as default route
    app.use((req, res) => {
        res.status(404).json({ msg: "Page Not Found" });
        console.log({ msg: "Page Not Found" });
    });

    app.listen(PORT, () => {
        console.log(`Server listen on http://0.0.0.0:${PORT}`);
    });

};

main();