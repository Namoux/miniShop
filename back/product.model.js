import { product } from "./database.mjs";

export class ProductModel {

    constructor(connection) {
        this.connection = connection;
    }

    /**
 * Renvoi un produit de la BDD en fonction de son id
 * @param {number} id 
 * @returns {{id:number,name:string,price:number}|undefined} 
 */
    async getProductById(id) {
        console.log("Client get product by Id");

        const result = await product.findByPk(id);
        console.log("result : ", result);

        return result;
    }

    /**
     * Retourne un tableau contenant tout les produits.
     * @returns {{id:number,name:string,price:number}[]}
     */
    async getAllProducts(productlimit) {
        console.log("limit :", productlimit);
        console.log("Client get All products");

        const result = await product.findAll({
            limit: productlimit
        });
        console.log("result : ", result);

        return result;
    }
}