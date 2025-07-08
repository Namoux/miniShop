import { Sequelize, DataTypes } from "@sequelize/core";

// Connexion à la BDD
export const sequelize = new Sequelize({
    host: "localhost",
    dialect: "mariadb",
    port: 3306,
    user : "root",
    password : "root", 
    database: "shop"
});

// Verifier la connexion 
sequelize.authenticate()
.then(()=>console.log("Connexion à la base de donnée shop"))
.catch(error=>console.log(error));

// Création de la table product
export const product = sequelize.define("product", {
    name : DataTypes.STRING,
    description : DataTypes.STRING,
    price : DataTypes.FLOAT,
    imageURL : DataTypes.STRING,
    categoryID : DataTypes.INTEGER
});

// Application des changements à MySQL
// Le parametre force : true permet d'ecraser les données de la table qd le serveur redémarre. Mettre en false si on  ne veut pas que le redémarrage du serveur ecrase les données
sequelize.sync({force : false})
.then(() => {
    console.log("Les modèles et les tables sont synchronisés.");

});



